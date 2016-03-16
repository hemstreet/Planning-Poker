"use strict";

(function () {

    angular.module('planningPoker').service('userService', ['$location', 'socket', userService]);

    function userService($location, socket) {

        this.user = null;

        this.getUser = function() {
            return this.user;
        };

        this.setUser = function(data) {

            this.user = data.user;

            return this.user;
        };

        this.vote = function (vote, id) {
            // Callback will be handled by controller on USER:DidVoteByRoomId
            socket.emit("USER:VoteByRoomId", {
                userName: $location.search().username,
                id: id,
                vote: vote
            });
        }
    }
})();