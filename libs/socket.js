var Cookies = require('cookies');
var config = require('config');
var mongoose = require('mongoose');
var co = require('co');
var User = require('../models/user');

var socketIO = require('socket.io');
var socketEmitter = require('socket.io-emitter');

var redisClient = require('redis').createClient({ host: '127.0.0.1', port: 6379 });

var socketRedis = require('socket.io-redis');

var sessionStore = require('./sessionStore');

var allUsers = [];

function socket(server) {
  var io = socketIO(server);

  io.adapter(socketRedis(redisClient));

  io.use(function(socket, next) {
    var handshakeData = socket.request;

    var cookies = new Cookies(handshakeData, {}, config.keys);

    var sid = 'koa:sess:' + cookies.get('koa.sid');

    co(function*() {

      var session = yield* sessionStore.get(sid, true);

      if (!session) {
        throw new Error("No session");
      }

      if (!session.passport && !session.passport.user) {
        throw new Error("Anonymous session not allowed");
      }

      // if needed: check if the user is allowed to join
      socket.user = yield User.findById(session.passport.user).exec();

      // if needed later: refresh socket.session on events
      socket.session = session;

      session.socketIds = session.socketIds ? session.socketIds.concat(socket.id) : [socket.id];

      yield* sessionStore.save(sid, session);

      socket.on('disconnect', function() {
        co(function* clearSocketId() {
          var session = yield* sessionStore.get(sid, true);
          if (session) {
            session.socketIds.splice(session.socketIds.indexOf(socket.id), 1);
            yield* sessionStore.save(sid, session);
          }
        }).catch(function(err) {
          console.error("session clear error", err);
        });
      });

    }).then(function() {
      next();
    }).catch(function(err) {
      next(err);
    });

  });

  io.on('connection', function (socket) {
	
	var users = collectUsersId(io, socket);
	var user = {
		socketId: socket.id,
		name: io.sockets.connected[socket.id].user.displayName
	}
	
	socket.emit( 'myInfo', user );
	socket.emit( 'getUsersInfo', users );
	socket.broadcast.emit( 'newUserConnect', users );
	console.log(socket.id);
	
	socket.on('newUserConnect', function (data) {
		console.log("send users id to all");
		socket.broadcast.emit( 'newUserConnect', users );
	});
	
	socket.on('disconnect', function () {
		socket.broadcast.emit( 'newUserConnect', collectUsersId(io, socket) );
	});
	  
	socket.on('sendMessage', function ( data ) {
		var message = {
			from: data.from,
			message: data.message
		};
		if (data.addressee) {
			socket.to(data.addressee.id).emit('messageReceived', message);
		} else {
			socket.broadcast.emit('messageReceived', message);
		}
		//console.log(io.sockets.connected);
		//console.log("message: " + data);
		// socket.to prinimaet id komnati ili polzovatel9 v dannom slu4ae oni sovpadaut
		// esli ot polzovatel9 pridet soobwenie s id adresata to mi pravilno otpravim soobwenie
		//socket.to(socket.id).emit('message', {users: allUsers});
	});
	
  });
  
  
}


socket.emitter = socketEmitter(redisClient);

module.exports = socket;


function collectUsersId(io, socket) {
	var users = [];
	
	for (var key in io.sockets.connected) {
		users.push({
			socketId: key,
			name: io.sockets.connected[key].user.displayName
		});
	}
      
	return users;
	  
	console.log(users);
}