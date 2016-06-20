"use strict";

var _ = require('underscore');

// Setup socket.io
var Socket = function (io) {
    this.io = io;
    this.rooms = {};
    this.socketUsers = {};

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
            console.log("Created room #", id);
            socket.emit('ROOM:DidCreateRoomById', id);
        }.bind(this));

        socket.on('ROOM:AddUserToRoomById', function (options) {
            var user = {
                id: options.id,
                name: options.name,
                role: options.role,
                vote: null
            };

            // Set a reference to the user for later
            socketUser = user;

            this.rooms[user.id].push(user);

            if (options.id) {

              console.log("Added user", options.name, "in room #", options.id);

                var users = this.rooms[options.id];
                this.io.emit('ROOM:DidAddUserToRoomById', {
                    id: options.id,
                    user: user,
                    users: users
                });
            }
            else {
                console.log('Room Id not supplied');
            }

        }.bind(this));

        socket.on('USER:VoteByRoomId', function (options) {

            var allVoted = true;
            var roomUsers = this.rooms[options.id];
            _.each(this.rooms[options.id], function (user, key) {

                if (options.userName == user.name) {
                    roomUsers[key].vote = options.vote;
                }

                if(!roomUsers[key].vote) {
                    allVoted = false;
                }

            }.bind(this));

            console.log(options.userName + " voted " + options.vote + " in room #" + options.id);

            this.io.emit('USER:DidVoteByRoomId', {
                id: options.id,
                user: options.user,
                users: roomUsers,
                vote: options.vote,
                allVoted: allVoted
            });
        }.bind(this));

        socket.on('ROOM:ResetVotes', function(id) {
            var users = this.rooms[id];
            _.each(users, function(user, key) {
                users[key].vote = null;
            }.bind(this));

            console.log("Reset votes for room #", id);

            this.io.emit('ROOM:DidResetVotes', {
                id: id,
                users: users
            });

        }.bind(this));

        socket.on('USER:SocketUser', function(data) {

          console.log('Created socket user', data.user.name);
          this.socketUsers[data.user.id][data.user.name] = data.socket;

        }.bind(this));

        socket.on('ROOM:UserLeave', function (user) {
            this.userDidLeave(socketUser);
            socket.emit('ROOM:UserDidLeft', user);
            console.log("User left", user);
        }.bind(this));

        socket.on('disconnect', function () {
            this.userDidLeave(socketUser);
            console.log('User Disconnected', socketUser);
            console.log(this.rooms);
        }.bind(this));

    }.bind(this));
};

Socket.prototype.userDidLeave = function (socketUser) {
    try {
        var users = this.rooms[socketUser.id];

        if (users) {
            _.each(users, function (user, key) {

                if (this.rooms[user.id][key].name == socketUser.name) {

                    var updatedUserList = this.rooms[user.id].filter(function (obj) {
                        return obj.name !== socketUser.name;
                    });

                    this.rooms[socketUser.id] = updatedUserList;

                    delete this.socketUsers[socketUser.id][user.name];

                    this.io.emit('ROOM:UserDidLeave', {
                        id: user.id,
                        name: user.name,
                        users: updatedUserList
                    });
                }

            }.bind(this));
        }
        else {
            delete this.rooms[socketUser.id];

        }
    }
    catch (err) {
        console.log("Error: something went wrong when a user left");
    }
};

module.exports = Socket;