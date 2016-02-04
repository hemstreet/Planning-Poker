angular.module('planningPoker').service('roomService',['socket', function(socket) {

  this.getUsersInRoom = function(roomId) {

    socket.emit('EVENT::GetUsersInRoom', {
      roomId: roomId
    })

    console.log(roomId);
  };

}]);