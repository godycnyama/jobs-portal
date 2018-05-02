'use strict';
//var RecruiterMongoController = require('./serverApi/recruiters/recruiterMongoController');
var Handlers = require('./handlers');
exports.register = function (server, options, next) {
    var io = require('socket.io')(server.select('chat').listener);

    io.on('connection', function (socket) {

        console.log('New connection!');

        socket.on('hello', Handlers.hello);
        socket.on('newMessage', Handlers.newMessage);
        socket.on('goodbye', Handlers.goodbye);
    });
    
    next();

};

exports.register.attributes = {
    pkg: require('./serverApi/payments/package.json')
};