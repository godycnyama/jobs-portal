'use strict';

const Consultant = require('./consultant');
const Resume = require('./resume');
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const autoPopulate = require('mongoose-autopopulate');
const autoIncrement = require('../../config/db').autoIncrement;

/**
  * @module  Recruiter
  * @description contain the details of Attribute  
*/
var RecruiterSchema = new Schema({
  userID: { type: Number, unique: true,required: true },
  companyName:{ type: String, required: true ,trim :true ,minlength:1,maxlength:50},
  recruiterType: { type: String, required: true, enum: ['Employer', 'Agency'] },  //Employer,Agency
  companySector:{ type: String, required: true ,trim :true ,minlength:1,maxlength:50},
  yearFounded:{ type: String, required: true ,trim :true ,minlength:1,maxlength:4},
  numberOfemployees:{ type: String, required: true ,trim :true ,minlength:1,maxlength:50},
  introduction: { type: String, required: true, trim: true, minlength: 1, maxlength: 500 },
  physicalAddress: { type: String, trim: true, minlength: 1, maxlength: 50 },
  postalAddress: { type: String, trim: true, minlength: 1, maxlength: 50 },
  tel: { type: String, trim: true, minlength: 1, maxlength: 50 },
  mobile: { type: String, trim: true, minlength: 1, maxlength: 50 },
  email: { type: String, trim: true, minlength: 1, maxlength: 50 },
  fax: { type: String,trim :true ,minlength:1,maxlength:50},
  website: { type: String,trim :true ,minlength:1,maxlength:50 },   
  companyLogo:{ type: String,trim :true },
  cvs: [{ type: Number, ref: 'JobSeeker', autopopulate: true }],
  createdOn: { type: Date},
  updatedOn: { type: Date}
});

// on every save, add the date
RecruiterSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    // change the updated_at field to current date
    this.updatedOn = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.createdOn)
        this.createdOn = currentDate;
    next();
});

RecruiterSchema.plugin(autoIncrement.plugin,'Recruiter');
RecruiterSchema.plugin(autoPopulate);
RecruiterSchema.plugin(mongoosePaginate);
var Recruiter = mongoose.model('Recruiter', RecruiterSchema);

/** export schema */
module.exports = Recruiter;
