'use strict';

const Mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/config');
  
//Mongoose.connect(config.database.url);
Mongoose.connect(config.DB_CONNECTION_STRING, { server: { reconnectTries: Number.MAX_VALUE } });
var connection = Mongoose.connection;

connection.on('error', console.error.bind(console, 'Database connection error'));
connection.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

autoIncrement.initialize(connection);
exports.connection = connection;
exports.autoIncrement = autoIncrement;


