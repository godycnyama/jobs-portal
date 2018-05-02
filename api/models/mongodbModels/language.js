'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Language
  * @description contain the details of Attribute  
*/
var LanguageSchema = new Schema({
    email: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    languageName: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    spokenAbility: { type: String, required: true, enum: ['Excellent', 'Good', 'Average'] },
    writtenAbility: { type: String, required: true, enum: ['Excellent', 'Good', 'Average'] },
    createdOn: { type: Date},
    updatedOn: { type: Date}
});

// on every save, add the date
LanguageSchema.pre('save', function (next) {
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
LanguageSchema.plugin(autoIncrement.plugin,'Language');
var Language = mongoose.model('Language', LanguageSchema);

/** export schema */
module.exports = Language;
