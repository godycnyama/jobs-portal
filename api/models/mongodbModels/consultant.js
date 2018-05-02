'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Employment
  * @description contain the details of Attribute  
*/
var ConsultantSchema = new Schema({
    firstName: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    middleName: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    jobTitle: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    tel: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    mobile: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    email: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 }
})

ConsultantSchema.plugin(autoIncrement.plugin, 'Consultant');
var Consultant = mongoose.model('Consultant', ConsultantSchema);

/** export schema */
module.exports = Consultant;