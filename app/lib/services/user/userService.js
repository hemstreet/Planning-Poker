angular.module('planningPoker').service('userService',['socketService', function(socketService) {

    this.vote = function(user, value) {

        console.log(user, 'voted', value)

        socketService.send('EVENT:NAME', {
            user: user,
            value: value
        })
    }

}]);