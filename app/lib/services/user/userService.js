"use strict";

(function () {

    angular.module('planningPoker').service('userService', ['$q', 'socket', userService]);

    function userService($q, socket) {

        this.currentUser = null;

        this.setCurrentUser = function(user) {
            this.currentUser = user;
            return this.currentUser;
        };

        this.getCurrentUser = function() {
            return this.currentUser;
        }
        this.vote = function (vote) {

            var deferred = $q.defer();

            socket.emit("USER:VoteByRoomId", {
                user: this.currentUser,
                vote: vote,
            });

            socket.on("USER:DidVoteByRoomId", function(options) {

                deferred.resolve(options);

            });

            return deferred.promise;

        }

    }
})();