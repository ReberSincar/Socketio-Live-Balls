const socketio = require('socket.io');
const io = socketio();
const socketApi = {};

socketApi.io = io;

const users = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('newUser', (user) => {
        const data = {
            id: socket.id,
            position: {
                x: 0,
                y: 0
            },
            username: user.username
        };
        users.push(data);
    });
});

module.exports = socketApi;