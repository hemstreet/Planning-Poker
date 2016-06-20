"use strict";

(function () {
    angular.module('planningPoker').directive('vote', ['userService', 'roomService', voteDirective]);

    function voteDirective() {
        return {
            restrict: 'E',
            templateUrl: './lib/directives/vote/voteDirective.html',
            controller: VoteController
        }
    }

    function VoteController($scope, userService, roomService) {

        var roomId = roomService.getCurrentRoom();
        $scope.roomId = roomId;

        $scope.user = userService.getUser();

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

            // Callback is handled in roomController
            userService.vote(value, this.roomId);

            $scope.activeVote = value;

        };

        $scope.user.socket.on('ROOM:DidResetVotes', function(data) {
            if(roomId == data.id) {
                $scope.activeVote = '';
            }
        }.bind(this));
    }

})();