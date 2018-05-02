'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Attachment
  * @description contain the details of Attribute  
*/
var AttachmentSchema = new Schema({
    email: { type: String, required: true, trim: true, maxlength: 50 },
    fileID: {type: String,required:true, trim: true, maxlength: 50},
    fileName: { type: String, required: true, trim: true, maxlength: 50 },
    documentType: { type: String, required: true, enum: ['Certificate', 'ID/Passport', 'Other'] },
    content_type: { type: String, required: true, trim: true, maxlength: 50 },
    uploadDate: {type:Date,default:Date.now()}
});

AttachmentSchema.plugin(autoIncrement.plugin,'Attachment');
var Attachment = mongoose.model('Attachment', AttachmentSchema);

/** export schema */
module.exports = Attachment;
