var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {origins:'http://localhost:8080'});
var connections = [];
var userId = 0;

app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    }
);

io.on('connection', function(socket){
    connections.push(socket);
    userId += 1;

    socket.emit('start', {userId});

    socket.on('message', function (data) {
        connections.forEach(function(connectedSocket) {
            if (connectedSocket !== socket) {
                connectedSocket.emit('message', data);
            }
        });
    });

    socket.on('disconnect', function () {
        const index = connections.indexOf(socket);
        connections.splice(index, 1);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});