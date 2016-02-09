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

        $scope.submitJoinRoom = function (name, roomNumber) {

            $scope.error = null;

            roomService.getRooms().then(function (rooms) {
                if (rooms[roomNumber]) {
                    roomService.addUserToRoomById(name, roomNumber).then(function (user) {
                        $location.path('/room/' + roomNumber).search({username: name});
                    });
                }
                else {
                    $scope.error = true;
                }
            });
        };

    }
})();
