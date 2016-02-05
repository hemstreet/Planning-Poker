angular.module('planningPoker').directive('joinRoom', joinRoomDirective);

function joinRoomDirective(){
    return {
        restrict: 'E',
        templateUrl: './lib/directives/room/join/joinRoomDirective.html',
        controller: JoinRoomController,
        controllerAs: 'vm'
    };
}

//function JoinRoomController($scope, $rootScope, addressService, modalService) {
function JoinRoomController($scope, $rootScope) {
    var vm = this;

    vm.submitForm = function(name, roomNumber) {
        console.log('user submitted join room', name, roomNumber);
    }

};