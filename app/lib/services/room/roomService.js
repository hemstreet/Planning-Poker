"use strict";

(function () {
    angular.module('planningPoker').service('roomService', ['$q', 'socket', 'userService', roomService]);

    function roomService($q, socket, userService) {

        this.currentRoom = null;

        this.setCurrentRoom = function(id) {
            this.currentRoom = id;
            return this.currentRoom;
        };

        this.getCurrentRoom = function() {
            return this.currentRoom;
        };

        this.joinOrCreateRoom = function(data) {
            var deferred = $q.defer();

            this.getRooms().then(function (rooms) {
                if (rooms[data.roomNumber]) {
                    this.addUserToRoomById(name, data.roomNumber).then(function (user) {
                        deferred.resolve(user);
                    });
                }
                else {
                    this.createRoom(data).then(function(data) {
                        deferred.resolve(data);
                    });

                    //$location.path('/').search({error: true});
                }
            }.bind(this));

            return deferred.promise;
        };

        this.getRooms = function () {
            var deferred = $q.defer();

            socket.emit('ROOM:GetRooms', {});

            socket.on('ROOM:DidGetRooms', function (rooms) {
                deferred.resolve(rooms);
            });

            return deferred.promise;
        };

        this.getRoomById = function (id) {

            var deferred = $q.defer();

            socket.emit('ROOM:GetRoomId', id);

            socket.on('ROOM:DidGetRoomId', function (room) {
                deferred.resolve(room);
            });

            return deferred.promise;
        };

        this.createRoom = function (user) {

            var deferred = $q.defer();

            this.generateRoomId().then(function(roomId) {
                socket.emit('ROOM:CreateRoomById', roomId);

                socket.on('ROOM:DidCreateRoomById', function (id) {

                    var isAdmin = true;
                    this.addUserToRoomById(user, id, isAdmin).then(function (data) {

                        userService.setUser(data);

                        deferred.resolve({
                            id: id,
                            user: data
                        });
                    }.bind(this));
                }.bind(this));
            }.bind(this));

            return deferred.promise;

        };

        this.addUserToRoomById = function (name, id, isAdmin) {

            var deferred = $q.defer();

            socket.emit('ROOM:AddUserToRoomById', {
                name: name,
                id: id,
                role: (isAdmin) ? "admin" : "voter"
            });

            socket.on('ROOM:DidAddUserToRoomById', function (user) {

                this.setCurrentRoom(id);

                deferred.resolve(user);
            }.bind(this));

            return deferred.promise;
        };

        this.resetVotes = function(id) {

            // Handle call in controller
            socket.emit('ROOM:ResetVotes', id);

        };

        this.generateRoomId = function () {

            var deferred = $q.defer();
            var roomId = 1;

            this.getRooms().then(function (rooms) {
                while (rooms[roomId]) {
                    roomId = Math.floor(Math.random() * 100000) + 1;
                }

                deferred.resolve(roomId);
            });


            return deferred.promise;
        }

    }
})();