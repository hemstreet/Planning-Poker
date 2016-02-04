angular.module('planningPoker').controller('RoomController', ['$scope', '$routeParams', 'userService', function($scope, $routeParams, userService) {

  var vm = this;

  console.log('room controller', $routeParams.roomId);

}]);