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