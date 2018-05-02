'use strict';

const SocketIO = require('socket.io');
const EventEmitter = require("events").EventEmitter;

var users = [];
exports.register = function (server, options, next) {
    const io = SocketIO.listen(server.listener);
    io.sockets.on('connection',(socket) => {
        socket.on('checkPayment', (data) => {
            //save socketID and orderID
                users.push({orderID: data.orderID,socketID: socket.id});                       
            });
        EventEmitter.on('paid',(data) => {
                //retreive socketid and orderID
                var socketID = users[data.orderID];
            for(var i = 0;users.length;i++){
                if(users[i].orderID == data.orderID){
                    socketID = users[i].socketID;
                }
            }
            //send paid event to client
            io.to(socketID).emit('paid',data);
        });
        EventEmitter.on('cancelled',(data) => {                
                //retreive socketid and orderID
                var socketID = users[data.orderID];
            for(var i = 0;users.length;i++){
                if(users[i].orderID == data.orderID){
                    socketID = users[i].socketID;
                }
            }
            //send cancelled event to client
            io.to(socketID).emit('cancelled',data);
        });
        socket.on('disconnect',(data) => {
                //remove reference to client on disconnect
                for(var i = 0;users.length;i++){
                if(users[i].orderID == data.orderID){
                    users.splice(i,1);
                }
              }
            })
        });
next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};





