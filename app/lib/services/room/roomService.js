(function() {
  angular.module('planningPoker').service('roomService', ['socket', roomService]);

  function roomService(socket) {

    this.getRooms = function() {

      return this.rooms;
    };

    this.createRoom = function(user) {

      // Make this room Id generation more reliable
      var roomId = Math.floor(Math.random() * 10000) + 1;

      this.rooms[roomId] = [];

      this.addUser(user, roomId);

      return roomId;

    };

    this.addUser = function(user, roomId) {

      this.rooms[roomId].push(user);

      return roomId;

    };
    this.removeUser = function(user, roomId) {

      delete this.rooms[roomId][user];

      if(this.rooms[roomId].length = 0) {
        delete this.rooms[roomId];
      }

    };

    this.getUsersByRoomId = function(roomId) {

    };
  }
})();