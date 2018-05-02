'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const autoPopulate = require('mongoose-autopopulate');
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Resume
  * @description contain the details of Attribute  
*/
var ResumeSchema = new Schema({
    candidateID: { type: Number, required: true, ref: 'JobSeeker', autopopulate: true },
    recruiterID: { type: Number, required: true },
    recruiterUserID: { type: Number, required: true },
    mainQualification: { type: String, required: true, trim: true, maxlength: 50 },
    profession: { type: String, required: true, trim: true, maxlength: 50 },
    preferredJobTitles: { type: String, trim: true, maxlength: 50 },
    createdOn: { type: Date},
    updatedOn: { type: Date}
});

// on every save, add the date
ResumeSchema.pre('save', function (next) {
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

ResumeSchema.plugin(autoIncrement.plugin, 'Resume');
ResumeSchema.plugin(autoPopulate);
ResumeSchema.plugin(mongoosePaginate);
var Resume = mongoose.model('Resume', ResumeSchema);

/** export schema */
module.exports = Resume;