function UsersService(Restangular) {
    
    this.auth = function( data ) {
        return Restangular
            .all("login").post(data);
    }
    
    this.regist = function( data ) {
        return Restangular
            .all("regist").post(data);
    }
    
    this.logout = function( url ) {
        if ( !url ) url = "logout";
        return Restangular
            .oneUrl('logout', url).get();
    }
    
    this.getById = function(id) {
        return Restangular
            .one('getUser', id).get();
    }
    
    this.get = function() {
        return Restangular
            .one('getUser').get();
    }
    
    this.getAll = function() {
        return Restangular
            .one('getUsers').get();
    }
    
    this.add = function() {
        
    }
    
    this.update = function( data ) {
        return Restangular
            .all("updateUser").post(data);
    }
    
    this.delete = function() {
        return Restangular
            .all("deleteUser").remove();
    }
    
    return this;
    
}


module.exports = UsersService;