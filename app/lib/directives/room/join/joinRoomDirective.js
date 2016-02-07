"use strict";

(function() {
  angular.module('planningPoker').directive('joinRoom', ['$location', 'socket', joinRoomDirective]);

  function joinRoomDirective() {
    return {
      restrict:'E',
      templateUrl:'./lib/directives/room/join/joinRoomDirective.html',
      controller:JoinRoomController
    };
  }

  function JoinRoomController($scope, $location, socket) {
    $scope.title = "Join Room";


    console.log(socket);
    $scope.submitJoinRoom = function(name, roomNumber) {
      $location.path('/room/' + roomNumber);
    };

  }
})();
