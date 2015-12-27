var chat = angular.module("chat", []);
// accountOfExpensesApp

chat
    .directive("chat", require('./chatDirective'))
    .controller("ChatController", require('./ChatController'));
    //.factory("usersService", require('./usersService.js'));

module.exports = chat;