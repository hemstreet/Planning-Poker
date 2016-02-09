"use strict";

(function () {
    angular.module('planningPoker').directive('vote', ['userService', voteDirective]);

    function voteDirective() {
        return {
            restrict: 'E',
            templateUrl: './lib/directives/vote/voteDirective.html',
            controller: VoteController
        }
    }

    function VoteController($scope, userService) {
        $scope.activeVote = null;
        $scope.values = [
            "1",
            "2",
            "3",
            "5",
            "8",
            "13",
            "21",
            "40",
            "80",
            "∞",
            "N/A"
        ];

        $scope.vote = function(value) {
            userService.vote(value).then(function(data) {
                $scope.activeVote = data.vote;

                // Pass back the list of users and who has voted already
                $scope.users = data.users;
            });
        };
    }

})();