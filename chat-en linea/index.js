var express = require('express');
var socket = require('socket.io');
var PORT =process.env.PORT || 5000;
//App setup
var app = express();
var server = app.listen(PORT,function(){
    console.log('listening to request on port 5000');
});

//Satic files

app.use(express.static('public'))

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    })

});