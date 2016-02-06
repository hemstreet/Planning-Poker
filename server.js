var express = require('express');
var app = express();
var Room = require('./lib/_Room');

app.use('/', express.static(__dirname + '/app'));

app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

var server = app.listen(3002, function () {
    var serverAddress = server.address();
    var host = serverAddress.address;
    var port = serverAddress.port;

    console.log('Example app listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);
new Room(io, server);