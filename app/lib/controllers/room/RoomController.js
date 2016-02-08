"use strict";

(function () {
    angular.module('planningPoker').controller('RoomController', ['$scope', '$routeParams', 'roomService', 'socket', RoomController]);

    function RoomController($scope, $routeParams, roomService, socket) {

        this.roomId = $routeParams.roomId;

        $scope.roomId = this.roomId;

        // On initial load, get the user list for the room
        roomService.getRoomById(this.roomId).then(function (room) {
            $scope.users = room;

        });

        // If a user comes in when a room is already created, update the user list
        socket.on('ROOM:DidAddUserToRoomById', function (options) {
            if(this.isRoom(options.id)) {
                $scope.users = options.users;
            }
        }.bind(this));

        socket.on('ROOM:UserDidVoteByRoomId', function (data) {
            $scope.users = data.users;
        });

        socket.on('ROOM:UserDidLeft', function(user) {
            if(this.isRoom(user.id)) {
                console.log('user', user, 'left the room');
            }
        });
    }

    RoomController.prototype.isRoom = function(roomId) {
        return (roomId == this.roomId) ? true : false;
    }

})();