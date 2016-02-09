"use strict";

(function () {
    angular.module('planningPoker').directive('planningFooter', headerDirective);

    function headerDirective() {
        return {
            restrict: 'E',
            templateUrl: './lib/directives/common/footer/planningFooterDirective.html',
            controller: HeaderController
        }
    }

    function HeaderController($scope) {

    }

})();