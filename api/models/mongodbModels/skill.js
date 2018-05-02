'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Skill
  * @description contain the details of Attribute  
*/
var SkillSchema = new Schema({
  email: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  description:{ type: String, required: true,trim :true ,minlength:1,maxlength:100},
  skillLevel: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
  experience: { type: String, required: true, enum: ['1 month', '3 months', '6 months', '1 year', '2 years', '3 years', '5 years', '5-7 years', '8-10 years', 'More than 10 years'] },
  lastDateUsedMonth: { type: String, trim: true, minlength: 1, maxlength: 50 },
  lastDateUsedYear: { type: Number},
  isCurrent: { type: Boolean,Default:false },
  createdOn: { type: Date},
  updatedOn: { type: Date}
});

// on every save, add the date
SkillSchema.pre('save', function (next) {
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

SkillSchema.plugin(autoIncrement.plugin,'Skill');
var Skill = mongoose.model('Skill', SkillSchema);

/** export schema */
module.exports = Skill; 
