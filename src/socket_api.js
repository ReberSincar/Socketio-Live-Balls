const socketio = require('socket.io');
const io = socketio();
const socketApi = {};

socketApi.io = io;

const users = {};

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
        // users.push(data);
        users[socket.id] = data;

        socket.broadcast.emit('newUser', data);
        socket.emit('initPlayers', users);
    });

    socket.on('newPosition', user => {
        users[socket.id] = user;
        socket.broadcast.emit('newPosition', user);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('leaveUser', users[socket.id]);
        delete users[socket.id];
    });
});

module.exports = socketApi;