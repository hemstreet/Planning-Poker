"use strict";

(function () {

    angular.module('planningPoker').service('userService', ['socket', userService]);

    function userService(socket) {

        this.vote = function (user, value) {

            console.log(user, 'voted', value);

        }

    }
})();