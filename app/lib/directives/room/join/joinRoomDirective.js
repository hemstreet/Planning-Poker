(function() {
  angular.module('planningPoker').directive('joinRoom', joinRoomDirective);

  function joinRoomDirective() {
    return {
      restrict:'E',
      templateUrl:'./lib/directives/room/join/joinRoomDirective.html',
      controller:JoinRoomController
    };
  }

  function JoinRoomController($scope, $location, $rootScope) {
    $scope.title = "Join Room";

    $scope.submitJoinRoom = function(name, roomNumber) {
      $location.path('/room/' + roomNumber);
    }

  }
})();
