app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {

    $scope.messages = [];
    $scope.players = {};

    $scope.init = () => {
        const username = prompt('Enter your username');
        if (username) {
            initConnection(username);
        } else {
            return false;
        }
    };

    function initConnection(username) {
        indexFactory.connectSocket('http://localhost:3000', {
            reconnectionAttempts: 3,
            reconnectionDely: 500
        }).then((socket) => {
            console.log('Connection Successfull ' + socket);
            socket.emit('newUser', { username });

            socket.on('newUser', data => {
                const messageData = { type: 0, username: data.username };
                $scope.messages.push(messageData);
                $scope.players[data.id] = data;
                $scope.$apply();
            });

            socket.on('initPlayers', players => {
                $scope.players = players;
                $scope.$apply();
            });

            socket.on('leaveUser', user => {
                if (user) {
                    const messageData = { type: 1, username: user.username };
                    $scope.messages.push(messageData);
                    delete $scope.players[user.id];
                    $scope.$apply();
                }
            });

            socket.on('newPosition', user => {
                $('#' + user.id).animate({ 'left': user.position.x, 'top': user.position.y });
                $scope.players[user.id] = user;
                $scope.$apply();
            });

            socket.on('newMessage', messageData => {
                $scope.messages.push(messageData);
                $scope.$apply();
                const element = document.getElementById('chat-area');
                element.scrollTop = element.scrollHeight;
            });

            $scope.onClickPlayer = ($event) => {
                try {
                    $('#' + socket.id).animate({ 'left': $event.offsetX, 'top': $event.offsetY });
                    $scope.players[socket.id].position.x = $event.offsetX;
                    $scope.players[socket.id].position.y = $event.offsetY;
                    socket.emit('newPosition', $scope.players[socket.id]);
                } catch (error) {
                    console.log(error);
                }

            };

            $scope.newMessage = () => {
                let message = $scope.message;
                const messageData = { type: 2, username: username, message: message };
                socket.emit('newMessage', messageData);
                $scope.message = '';
            };
        }).catch((err) => {
            console.log('Error occured ' + err);
        });
    }
}]);