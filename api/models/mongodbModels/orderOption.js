'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Item
  * @description contain the details of Attribute  
*/
var OrderOptionSchema = new Schema({
    orderCode: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    description: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    minimumJobAds: { type: Number, required: true },
    maximumJobAds: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    createdOn: { type: Date},
    updatedOn: { type: Date}
});

// on every save, add the date
OrderOptionSchema.pre('save', function (next) {
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

OrderOptionSchema.plugin(autoIncrement.plugin, ' OrderOption');
var OrderOption = mongoose.model(' OrderOption', OrderOptionSchema);

/** export schema */
module.exports = OrderOption;
