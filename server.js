var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/app'));

app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

app.get('/socket.io', function (req, res) {

});

var server = app.listen(3002, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

// Setup socket.io
var io = require('socket.io')(server);

io.on('connection', function (socket){
    socket.emit('news', { hello: 'world' });
    console.log('connected!');
});