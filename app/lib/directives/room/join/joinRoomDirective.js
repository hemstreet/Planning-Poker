"use strict";

(function () {
    angular.module('planningPoker').directive('joinRoom', ['$location', 'roomService', joinRoomDirective]);

    function joinRoomDirective() {
        return {
            restrict: 'E',
            templateUrl: './lib/directives/room/join/joinRoomDirective.html',
            controller: JoinRoomController
        };
    }

    function JoinRoomController($scope, $location, roomService) {

        $scope.title = "Join Room";

        $scope.submitJoinRoom = function (name, roomNumber) {
            $scope.error = "";

            roomService.getRooms().then(function (rooms) {
                if (rooms[roomNumber]) {
                    roomService.addUserToRoomById(name, roomNumber).then(function (user) {
                        $location.path('/room/' + roomNumber);
                    });
                }
                else {
                    $scope.error = "Error: Not a valid room";
                }
            });
        };

    }
})();
