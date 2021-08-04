app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {

    $scope.messages = [];

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
                $scope.$apply();
            });

            socket.on('leaveUser', user => { 
                const messageData = { type: 1, username: user.username };
                $scope.messages.push(messageData);
                $scope.$apply();
            });
        }).catch((err) => {
            console.log('Error occured ' + err);
        });
    }
}]);