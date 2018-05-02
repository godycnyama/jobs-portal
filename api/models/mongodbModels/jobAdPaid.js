'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  User
  * @description contain the details of Attribute  
*/
var JobAdPaidSchema = new Schema({
  jobAd: { type: Number, ref: 'JobAd', autopopulate: true },
  createdOn: { type: Date},
  updatedOn: { type: Date}
});

// on every save, add the date
JobAdPaidSchema.pre('save', function (next) {
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

JobAdPaidSchema.plugin(autoIncrement.plugin, 'JobAdPaid');
var JobAdPaid = mongoose.model('JobAdPaid', JobAdPaidSchema);

/** export schema */
module.exports = JobAdPaid;

// email regex "/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/"
