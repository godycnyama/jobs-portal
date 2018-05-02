'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  CV
  * @description contain the details of Attribute  
*/
var cvSchema = new Schema({
    email: { type: String, required: true, trim: true, maxlength: 50 },
    fileID: { type: String, required: true, trim: true, maxlength: 50 },
    fileName: { type: String, required: true, trim: true, maxlength: 50 },
    isDefault: { type: Boolean, required: true },
    content_type:{ type: String, required: true ,trim: true, maxlength: 50},
    uploadDate: {type:Date,default:Date.now()}
});

cvSchema.plugin(autoIncrement.plugin,'CV');
var CV = mongoose.model('CV', cvSchema);

/** export schema */
module.exports = CV;
