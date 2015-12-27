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