(function() {
  angular.module('planningPoker').service('socketService',['socket', socketService]);

  function socketService(socket) {

    socket.on('EVENT::GetUsersInRoom', function(data) {
      console.log(data);
    });

    this.send = function(name, value) {

      console.log(name, value);

    }

  }
})();