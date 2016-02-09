"use strict";

var app = angular.module('planningPoker', ['ngRoute', 'btford.socket-io', 'ngMaterial'])
  .factory('socket', function(socketFactory) {
    return socketFactory();
  })
  .config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('blue-grey');
  });

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl:'views/home.html',
    controller:'HomeController',
    controllerAs:'vm'
  }).when('/room/:roomId', {
    templateUrl:'views/room.html',
    controller:'RoomController',
    controllerAs:'vm'
  }).otherwise({
    redirectTo:'/'
  });

}]);