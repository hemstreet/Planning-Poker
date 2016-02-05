angular.module('planningPoker').directive('createRoom', createRoomDirective);

function createRoomDirective() {
    return {
        restrict: 'E',
        templateUrl: './lib/directives/room/create/createRoomDirective.html',
        controller: CreateRoomController
    }
};

//function JoinRoomController($scope, $rootScope, addressService, modalService) {
function CreateRoomController($scope, $rootScope) {
    $scope.submitCreateRoom = function(name) {
        console.log('user submitted create room', name);
    }

};