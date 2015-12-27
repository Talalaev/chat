var users = require('./users/index.js');
var chat = require('./chat/index.js');

var app = angular
    .module("appChat", ["restangular", "ui.router", 'btford.socket-io', 'users', 'chat' ]);