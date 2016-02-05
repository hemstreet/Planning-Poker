angular.module('planningPoker').directive('joinRoom', joinRoomDirective);

function joinRoomDirective(){
    return {
        restrict: 'E',
        templateUrl: './lib/directives/room/join/joinRoomDirective.html',
        controller: JoinRoomController
    };
}

//function JoinRoomController($scope, $rootScope, addressService, modalService) {
function JoinRoomController($scope, $rootScope) {
    $scope.submitJoinRoom = function(name, roomNumber) {
        console.log('user submitted join room', name, roomNumber);
    }

};