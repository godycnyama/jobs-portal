'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  OrderDetail
  * @description contain the details of Attribute  
*/
var OrderDetailSchema = new Schema({
    jobAdID: { type: Number, required: true },
    jobREF: { type: String, requred: true, trim: true, minlength: 1, maxlength: 50 },
    jobTitle: { type: String, requred: true, trim: true, minlength: 1, maxlength: 50 },
    createdOn: { type: Date},
    updatedOn: { type: Date}
});

// on every save, add the date
OrderDetailSchema.pre('save', function (next) {
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

OrderDetailSchema.plugin(autoIncrement.plugin,'OrderDetail');
var OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema);

/** export schema */
module.exports = OrderDetail;