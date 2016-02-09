"use strict";

(function () {
    angular.module('planningPoker').directive('createRoom', ['$location', 'roomService', createRoomDirective]);

    function createRoomDirective() {
        return {
            restrict: 'E',
            templateUrl: './lib/directives/room/create/createRoomDirective.html',
            controller: CreateRoomController
        }
    };

    function CreateRoomController($scope, $location, roomService) {

        $scope.title = "Create Room";

        $scope.submitCreateRoom = function (name) {

            roomService.createRoom(name).then(function (options) {
                $location.path('/room/' + options.id).search({username: name});
            });
        };
    };
})();