// in the top-level module of the app
var socketIOservice = angular.module('socketIOservice', ['btford.socket-io']);
socketIOservice.factory('SocketIO', function (socketFactory) {
    var mySocket = socketFactory();
    mySocket.forward('paid');
    mySocket.forward('cancelled');
    return mySocket;
});