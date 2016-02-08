"use strict";

(function () {
    angular.module('planningPoker').controller('RoomController', ['$scope', '$routeParams', 'roomService', 'socket', RoomController]);

    function RoomController($scope, $routeParams, roomService, socket) {

        var roomId = $routeParams.roomId;

        $scope.roomId = roomId;

        roomService.getRoomById(roomId).then(function (room) {

            console.log(room);

        });

        socket.on('ROOM:UserJoinRoomById', function (data) {
            $scope.users = data.users;
        });

        socket.on('ROOM:UserDidVoteByRoomId', function (data) {
            $scope.users = data.users;
        })

    }
})();