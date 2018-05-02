'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const autoIncrement = require('../../config/db').autoIncrement;

/**
  * @module JobApplication
  * @description contain the details of Attribute  
*/
var JobApplicationSchema = new Schema({                    
  jobAdID: { type: Number, required: true },
  jobAdREF:{type:String,required:true,trim :true ,minlength:1,maxlength:50},
  jobTitle:{ type: String, required: true,trim :true ,minlength:1,maxlength:50},
  recruiterID: { type: Number, required: true },
  recruiterUserID: { type: Number, required: true },
  jobSeekerID: { type: Number, required: true },
  jobSeekerUserID: { type: Number, required: true },
  jobSeekerEmail: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  firstName: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  middleName: { type: String, required: false, trim: true, minlength: 1, maxlength: 50 },
  lastName: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  coverNote:{ type: String, required: true ,trim :true ,minlength:1,maxlength:2000} ,            
  createdOn: { type: Date},
  updatedOn: { type: Date},
});

// on every save, add the date
JobApplicationSchema.pre('save', function (next) {
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

JobApplicationSchema.plugin(autoIncrement.plugin,'JobApplication');
JobApplicationSchema.plugin(mongoosePaginate);
var JobApplication = mongoose.model('JobApplication', JobApplicationSchema);

/** export schema */
module.exports = JobApplication;
