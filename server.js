"use strict";

var express = require('express');
var app = express();
var Socket = require('./lib/Socket');
var config = require('./config/config');
var argv = require('yargs').argv;
var port = argv.port || config.port || 3030;

app.set('port', port);
app.use('/', express.static(__dirname + '/app'));

app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

var server = app.listen(port, function () {
    var serverAddress = server.address();
    var host = serverAddress.address;
    var port = serverAddress.port;

    console.log('Example app listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);
new Socket(io, server);