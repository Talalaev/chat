/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var users = __webpack_require__(1);
	var chat = __webpack_require__(4);

	var app = angular
	    .module("appChat", ["restangular", "ui.router", 'btford.socket-io', 'users', 'chat' ]);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var users = angular.module("users", []);
	// accountOfExpensesApp

	users
	    .directive("users", __webpack_require__(2))
	    .controller("UsersController", __webpack_require__(3));
	    //.factory("usersService", require('./usersService.js'));

	module.exports = users;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function usersDirective() {
	    return {
	        restrict: "E",
	        replace: true,
	        templateUrl: "users.html",
	        controllerAs: "users",
	        controller: 'UsersController'
	    }
	}

	module.exports = usersDirective;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function UsersController($rootScope, $scope) {
		
		var ctx = this;
		
		ctx.all = [{}];
		ctx.addressee = "";
		ctx.setAddressee = function( options ) {
			$scope.chat.addressee = {
				id: options.id,
				name: options.name
			};
			if (options.name) {
				$scope.chat.message = options.name + ",";
			} else {
				$scope.chat.message = "";
			}
				
			console.log($scope.chat.addressee);
		}
		
		socket.on('newUserConnect', function(data) {
			console.log("newUserConnect");
			ctx.all = data;
			console.log(data);
			$rootScope.$digest();
		});
		
		socket.on('getUsersInfo', function(data) {
			console.log("getUsersInfo");
			ctx.all = data;
			console.log(data);
			$rootScope.$digest();
		});
		
	}

	module.exports = UsersController;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var chat = angular.module("chat", []);
	// accountOfExpensesApp

	chat
	    .directive("chat", __webpack_require__(5))
	    .controller("ChatController", __webpack_require__(6));
	    //.factory("usersService", require('./usersService.js'));

	module.exports = chat;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function chatDirective() {
	    return {
	        restrict: "E",
	        replace: true,
	        templateUrl: "chat.html",
	        controllerAs: "chat",
	        controller: 'ChatController'
	    }
	}

	module.exports = chatDirective;

/***/ },
/* 6 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);