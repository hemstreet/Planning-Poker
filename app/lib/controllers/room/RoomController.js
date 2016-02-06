(function() {
  angular.module('planningPoker').controller('RoomController', ['$scope', '$routeParams', 'socket', RoomController]);

  function RoomController($scope, $routeParams, socket) {

    var roomId = $routeParams.roomId;

    console.log('socket', socket);

    console.log('room', roomId);
    socket.emit('ROOM:GetUsersByRoomId', {
      roomId: roomId,
      callback: function(users) {
        console.log('Room Contains', users);
      }
    });
  }
})();