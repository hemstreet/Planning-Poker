(function() {

  angular.module('planningPoker').service('userService', ['socketService', userService]);

  function userService(socketService) {

    this.vote = function(user, value) {

      console.log(user, 'voted', value);

      socketService.send('EVENT:NAME', {
        user:user,
        value:value
      })
    }

  }
})();