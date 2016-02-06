// Setup socket.io
var Room = function(io, server) {
    this.io = io;
    this.rooms = {};

    this.setupListeners();
};

Room.prototype.setupListeners = function() {


    this.io.on('connection', function (socket){
        socket.on('ROOM:GetUsersByRoomId', function(options) {
            console.log('getUserbyroomId', options.roomId);

            options.callback(this.rooms[options.roomId]);
        }.bind(this));
    });



    this.io.on('ROOM:GetRooms', function() {
        this.io.emit('ROOM:Rooms', this.rooms);
    }.bind(this));

    this.io.on('ROOM:GetUsersByRoomId', function(options) {
        console.log('got on room.js');
        options.callback();
    }.bind(this));

};

module.exports = Room;