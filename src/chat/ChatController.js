function ChatController($rootScope) {
	
	var ctx = this;
	
	
	this.send = function( options ) {
		/* options ->
			{
				addressee: {
					id: options.id,
					name: options.name
				},
				message: chat.message
			}
		*/
		console.log( options );
		socket.emit('sendMessage', options);
		if (ctx.messages.length > 9) {
			var arr = ctx.messages;
			arr.reverse().length = 9;
			arr.reverse();
			ctx.messages = arr;
		}
		
		options.whose = "my-message";
		options.align = "align-left";
		
		ctx.messages.push(options);
		
		if (options.addressee) {
			ctx.message = options.addressee.name + ",";
		} else {
			ctx.message = "";
		}
	}
	this.messages = [];
	
	socket.on('messageReceived', function(data) {
		//ctx.all = data;
		data.whose = "other-message float-right";
		data.align = "align-right";
		
		ctx.messages.push(data);
		if (ctx.messages.length > 10) {
			ctx.messages.reverse().length = 10;
			ctx.messages.reverse();
		}
		console.log(data);
		$rootScope.$digest();
	});
	
	socket.on('myInfo', function( data ) {
		ctx.mySelfInfo = data;
	})
	
}

module.exports = ChatController;