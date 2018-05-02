'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Session
  * @description contain the details of Attribute  
*/
var SessionSchema = new Schema({
  session: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 }
});

SessionSchema.plugin(autoIncrement.plugin,'Session');
var Session = mongoose.model('Session', SessionSchema);

/** export schema */
module.exports = Session