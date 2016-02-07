"use strict";

(function() {
  angular.module('planningPoker').service('roomService', ['$q', 'socket', roomService]);

  function roomService($q, socket) {

    this.getRooms = function() {
      var deferred = $q.defer();

      socket.emit('ROOM:GetRooms', {});

      socket.on('ROOM:DidGetRooms', function(rooms) {
        deferred.resolve(rooms);
      });

      return deferred.promise;
    };

    this.getRoomById = function(id) {

      var deferred = $q.defer();

      socket.emit('ROOM:GetRoomId', id);

      socket.on('ROOM:DidGetRoomId', function(users) {
        deferred.resolve(users);
      });

      return deferred.promise;
    };

    this.createRoom = function(user) {

      var deferred = $q.defer();

      this.getRooms().then(function(rooms) {

        var roomId = this.generateRoomId();

        while(rooms[roomId]) {
          roomId = this.generateRoomId();
        }

        socket.emit('ROOM:CreateRoomById', roomId).then(function() {
          this.addUserToRoomById(user, roomId);
        }.bind(this));

      }.bind(this));

      //socket.emit('ROOM:GetRooms', {});
      //
      //socket.on('ROOM:DidGetRooms', function(rooms) {
      //  deferred.resolve(rooms);
      //});

      // Make this room Id generation more reliable

      return deferred.promise;

    };

    this.addUserToRoomById = function(user, id) {

      var deferred = $q.defer();

      socket.emit('ROOM:AddUserToRoomById', {
        user: user,
        id: id
      });

      socket.on('ROOM:DidAddUserToRoomById', function(users) {
        deferred.resolve(users);
      }.bind(this));

      return deferred.promise;
    };

    this.generateRoomId = function() {
      return Math.floor(Math.random() * 10000) + 1;
    }

  }
})();