'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Project
  * @description contain the details of Attribute  
*/
var ProjectSchema = new Schema({
    projectName: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    companyName: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    projectDescription: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    technologies: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    myContribution: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    projectURL: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    createdOn: { type: Date},
    updatedOn: { type: Date}
});

// on every save, add the date
ProjectSchema.pre('save', function (next) {
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
ProjectSchema.plugin(autoIncrement.plugin, 'Project');
var Project = mongoose.model('Project', ProjectSchema);

/** export schema */
module.exports = Project;
