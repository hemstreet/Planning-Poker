(function() {
  angular.module('planningPoker').directive('createRoom', ['$location', 'roomService', createRoomDirective]);

  function createRoomDirective() {
    return {
      restrict:'E',
      templateUrl:'./lib/directives/room/create/createRoomDirective.html',
      controller:CreateRoomController
    }
  }

  //function JoinRoomController($scope, $rootScope, addressService, modalService) {
  function CreateRoomController($scope, $location, roomService) {

    $scope.title = "Create Room";

    $scope.submitCreateRoom = function(name) {

      var roomId = roomService.createRoom(name);
      console.log('user submitted create room', name);

      $location.path('/room/' + roomId);
    }

  }
})();