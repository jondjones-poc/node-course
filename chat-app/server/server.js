const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage, getUser } = require('../server/utils/message');
const { isRealString } = require('../server/utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

console.log(publicPath);

const port = process.env.PORT|| 3000;
const app = express();

const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

const adminName = 'Chatbot';

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('join', (params, callback) => {

        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage(adminName, `Welcome to ${params.room}`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(adminName, `${params.name} has joined ${params.room}`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        const user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(getUser(user.name), message.text));
        }
        callback('Message received OK');
    });

    socket.on('createLocationMessage', (coords, callback) => {
        const user = users.getUser(socket.id);

        if (user) {
            console.log('Send location data', coords);
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));  
        }

        callback('Message received OK');
    });

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage(adminName, `${user.name} has left.`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up and port ${port}`);
});