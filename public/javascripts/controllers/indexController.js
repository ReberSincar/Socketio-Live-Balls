app.controller('indexController', ['$scope', 'indexFactory', ($scope, indexFactory) => {
    indexFactory.connectSocket('http://localhost:3000', {
        reconnectionAttempts: 3,
        reconnectionDely: 500
    }).then((socket) => {
        console.log('Connection Successfull ' + socket);
    }).catch((err) => {
        console.log('Error occured ' + err);
     });
}]);