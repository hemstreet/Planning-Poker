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

            roomService.createRoom(name).then(function (users) {
                console.log('POST create room', users);
            });

            //roomService.getRooms().then(function(data) {
            //
            //  console.log('rooms', data);
            //});
            //
            ////var roomId = roomService.createRoom(name);
            //console.log('user submitted create room', name);

            //$location.path('/room/' + roomId);
        };
    };
})();