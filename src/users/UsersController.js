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