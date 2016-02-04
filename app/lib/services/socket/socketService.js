angular.module('planningPoker').service('socketService',['socket', function(socket) {

  socket.on('EVENT::GetUsersInRoom', function(data) {
    console.log(data);
  });

  this.send = function(name, value) {

    console.log(name, value);

  }

}]);