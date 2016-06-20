"use strict";

(function () {

    angular.module('planningPoker').service('userService', ['$location', 'socket', userService]);

    function userService($location, socket) {

        this.user = null;

        this.getUser = function() {
            return {
                user: this.user,
                socket: this.socket
            };
        };

        this.setUser = function(data) {

            socket.emit('USER:SocketUser', {
                data: data,
                socket: socket

            });

            this.user = data.user;

            return this.user;
        };

        this.vote = function (vote, id) {
            // Callback will be handled by controller on USER:DidVoteByRoomId
            this.socket.emit("USER:VoteByRoomId", {
                userName: $location.search().username,
                id: id,
                vote: vote
            });
        }.bind(this)
    }
})();