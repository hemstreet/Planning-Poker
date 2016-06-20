"use strict";

(function () {
    angular.module('planningPoker').directive('joinRoom', ['$location', joinRoomDirective]);

    function joinRoomDirective() {
        return {
            restrict: 'E',
            templateUrl: './lib/directives/room/join/joinRoomDirective.html',
            controller: JoinRoomController
        };
    }

    function JoinRoomController($scope, $location) {

        $scope.submitJoinRoom = function (name, roomNumber) {

            $location.path('/room/' + roomNumber).search({username: name});

        };

    }
})();
