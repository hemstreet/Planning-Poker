"use strict";

(function() {
  angular.module('planningPoker').controller('RoomController', ['$scope', '$routeParams', 'socket', RoomController]);

  function RoomController($scope, $routeParams, socket) {

    var roomId = $routeParams.roomId;

    socket.emit('ROOM:GetUsersByRoomId', {
      roomId: roomId,
      callback: function(users) {
        console.log('Users in room', users);
      }
    });
  }
})();