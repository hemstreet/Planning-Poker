"use strict";

(function () {
    angular.module('planningPoker').directive('createRoom', ['$location', 'roomService', createRoomDirective]);

    function createRoomDirective() {
        return {
            restrict: 'E',
            templateUrl: './lib/directives/room/create/createRoomDirective.html',
            controller: CreateRoomController
        }
    }

    function CreateRoomController($scope, $location, roomService) {

        $scope.submitCreateRoom = function (name) {

            var roomId = roomService.generateRoomId();
            $location.path('/room/' + roomId).search({username: name});

        };
    }
})();