var users = angular.module("users", []);
// accountOfExpensesApp

users
    .directive("users", require('./usersDirective'))
    .controller("UsersController", require('./UsersController'));
    //.factory("usersService", require('./usersService.js'));

module.exports = users;