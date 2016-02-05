(function() {
  angular.module('planningPoker').service('roomService', ['socket', roomService]);

  function roomService(socket) {
    this.getUsersInRoom = function(roomId) {

      socket.emit('EVENT::GetUsersInRoom', {
        roomId:roomId
      })

      console.log(roomId);
    };
  }
})();