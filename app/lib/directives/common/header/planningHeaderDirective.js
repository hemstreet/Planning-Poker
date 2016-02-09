"use strict";

(function () {
    angular.module('planningPoker').directive('planningHeader', ['$window', headerDirective]);

    function headerDirective() {
        return {
            restrict: 'E',
            templateUrl: './lib/directives/common/header/planningHeaderDirective.html',
            controller: HeaderController
        }
    }

    function HeaderController($scope, $window) {

        $scope.goHome = function() {
            $window.location.href = '/';
        }

    }

})();