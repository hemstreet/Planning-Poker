"use strict";

var app = angular.module('planningPoker', ['ngRoute', 'btford.socket-io']).
factory('socket', function (socketFactory) {
    return socketFactory();
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
    }).when('/room/:roomId', {
        templateUrl: 'views/room.html',
        controller: 'RoomController',
        controllerAs: 'vm'
    }).otherwise({
        redirectTo: '/'
    });

}]);