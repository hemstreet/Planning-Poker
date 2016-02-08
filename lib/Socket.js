"use strict";

// Setup socket.io
var Socket = function (io) {
    this.io = io;
    this.rooms = {};

    this.setupListeners();
};

Socket.prototype.setupListeners = function () {

    this.io.on('connection', function (socket) {

        console.log('User Connected');

        // Create a socket user for reference
        var socketUser = null;

        socket.on('ROOM:GetRooms', function (options) {
            socket.emit('ROOM:DidGetRooms', this.rooms);
        }.bind(this));

        socket.on('ROOM:GetRoomId', function (roomId) {
            socket.emit('ROOM:DidGetRoomId', this.rooms[roomId]);
        }.bind(this));

        socket.on('ROOM:CreateRoomById', function (id) {
            this.rooms[id] = [];
            socket.emit('ROOM:DidCreateRoomById', id);
        }.bind(this));

        socket.on('ROOM:AddUserToRoomById', function (options) {
            var user = {
                id: options.id,
                name: options.name,
                vote: null
            };

            // Set a reference to the user for later
            socketUser = user;

            this.rooms[user.id].push(user);

            if(options.id) {
                var users = this.rooms[options.id];
                this.io.emit('ROOM:DidAddUserToRoomById', {
                    id: options.id,
                    user: user,
                    users: users
                });
            }
            else
            {
                console.log('Room Id not supplied');
            }

        }.bind(this));

        socket.on('ROOM:UserLeave', function(user) {
            this.userDidLeave(socketUser);
            socket.emit('ROOM:UserDidLeft', user);
        });

        socket.on('disconnect', function () {
            this.userDidLeave(socketUser);
            console.log('User Disconnected', socketUser);
            console.log(this.rooms);
        }.bind(this));

    }.bind(this));
};

Socket.prototype.userDidLeave = function (socketUser) {
    try {
        var room = this.rooms[socketUser.id];

        if( room && room[socketUser.name]) {
            delete this.rooms[socketUser.id][socketUser.name];
        }
    }
    catch(err) {
        console.log("Error: something went wrong when a user left");
    }
};

module.exports = Socket;