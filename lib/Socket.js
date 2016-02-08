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

        socket.on('ROOM:GetRooms', function (options) {
            socket.emit('ROOM:DidGetRooms', this.rooms);
        }.bind(this));

        socket.on('ROOM:GetRoomId', function (options) {
            socket.emit('ROOM:DidGetRoomId', this.rooms[options.roomId]);
        }.bind(this));

        socket.on('ROOM:CreateRoomById', function (id) {
            this.rooms[id] = [];
            socket.emit('ROOM:DidCreateRoomById', id);
        }.bind(this));

        socket.on('ROOM:AddUserToRoomById', function (options) {
            var user = {
                name: options.name,
                vote: null
            };
            this.rooms[options.id].push(user);
            socket.emit('ROOM:DidAddUserToRoomById', user);
        });
        //AddUserToRoomById
        //


        socket.on('disconnect', function () {
            console.log('User Disconnected');
        })
    }.bind(this));


};

module.exports = Socket;