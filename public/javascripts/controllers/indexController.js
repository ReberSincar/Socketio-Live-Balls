app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {
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
        }).catch((err) => {
            console.log('Error occured ' + err);
        });
    }
}]);