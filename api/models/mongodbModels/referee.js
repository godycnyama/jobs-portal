'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Referee
  * @description contain the details of Attribute  
*/
var RefereeSchema = new Schema({
    email: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    fullName: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    title: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    organisationName: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    tel: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    cell: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    refereeEmail: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    createdOn: { type: Date},
    updatedOn: { type: Date}
});

// on every save, add the date
RefereeSchema.pre('save', function (next) {
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
RefereeSchema.plugin(autoIncrement.plugin, 'Referee');
var Referee = mongoose.model('Referee', RefereeSchema);

/** export schema */
module.exports = Referee;
