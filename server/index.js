const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors())
const PORT = process.env.PORT || 45630;

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


const router = require('./router');




const server = http.createServer(app);
const io = socketio(server);




io.on('connection', (socket) => {
    console.log('we have a new successfull connecion.');

    socket.on('join', ({ name, room }, callback) => {

        const { user, error } = addUser({ id: socket.id, name, room });

        if(error) {
            return callback(error);
        }

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room` });

        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });

        
        socket.join(user.room);

        callback();

    });


    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();

    })

    socket.on('disconnect', () => {
        console.log('user has left');
    });

});



app.use(router);



server.listen(PORT, () => console.log(`Server started on port ${PORT}`));