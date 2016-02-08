"use strict";

(function () {
    angular.module('planningPoker').directive('vote', voteDirective);

    function voteDirective() {
        return {
            restrict: 'E',
            templateUrl: './lib/directives/user/voteDirective.html'
        }
    }
})();