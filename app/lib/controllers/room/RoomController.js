"use strict";

(function () {
    angular.module('planningPoker').controller('RoomController', ['$scope', '$routeParams', 'roomService', 'userService', RoomController]);

    function RoomController($scope, $routeParams, roomService, userService) {

        roomService.joinOrCreateRoom().then(function(data) {
            userService.setUser(data);

            this.roomId = $routeParams.roomId;
            this.user = userService.getUser();

            $scope.roomId = this.roomId;

            $scope.allVoted = false;

            // Fire and forget, we will catch it via sockets to stay consistent
            $scope.resetVotes = function() {
                roomService.resetVotes(this.roomId);
                $scope.allVoted = false;

            }.bind(this);

            // On initial load, get the user list for the room
            roomService.getRoomById(this.roomId).then(function (room) {
                $scope.users = room;
            });

            this.user.socket.on('ROOM:DidResetVotes', function(data) {
                if(this.roomId == data.id) {
                    $scope.users = data.users;
                    $scope.allVoted = false;
                }
            }.bind(this));
            // If a user comes in when a room is already created, update the user list
            this.user.socket.on('ROOM:DidAddUserToRoomById', function (options) {
                if (this.isRoom(options.id)) {
                    $scope.users = options.users;
                }
            }.bind(this));

            this.user.socket.on('USER:DidVoteByRoomId', function (data) {

                if (data.id == this.roomId) {
                    $scope.users = data.users;

                    // Have all of the users voted?
                    $scope.allVoted = (data.allVoted) ? true : false;

                }

            }.bind(this));

            this.user.socket.on('ROOM:UserDidLeave', function (options) {

                if (this.isRoom(options.id)) {

                    $scope.users = options.users;
                }
            }.bind(this));

        }.bind(this));



    }

    RoomController.prototype.isRoom = function (roomId) {
        return (roomId == this.roomId);
    }

})();