const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
let users = {};
app.get('/', (req, res)=>{
    // res.send('<h1>Hello World!</h1>');
    res.status(200);
    res.sendFile(__dirname + '/index.html');
});
app.get('/client.js/', (req, res)=>{
    res.status(200);
    res.sendFile(__dirname+ '/client.js');
})

io.on('connection', (socket)=> {
    socket.on('new-user', (name)=> {
        socket.broadcast.emit('new-user', name);
        users[socket.id]=name;
    });
    console.log('a user connected');

    socket.on('disconnect', function (){
        io.emit('left', users[socket.id]);
        delete users[socket.id];
    });
    socket.on('chat-message', (msg)=>{
        socket.broadcast.emit('message', {"message": msg, "name" : users[socket.id]});
    });
});
const PORT = process.env.PORT || 8080;
server.listen(PORT, ()=>{
    console.log('listening on *:'+PORT);
});