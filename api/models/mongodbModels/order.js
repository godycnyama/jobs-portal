'use strict';

const OrderDetail = require('./orderDetail').schema;

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Order
  * @description contain the details of Attribute  
*/
var OrderSchema = new Schema({
    orderType: { type: String, required: true, enum: ['Job Ad', 'CV Search'] },
    paymentID: { type: String, trim: true, maxlength: 50 },
    recruiterID: { type: Number, required: true },
    userID: { type: Number, required: true },
    numberOfMonths: { type: Number },
    unitPrice: { type: Number },
    subTotal: { type: Number },
    tax: {type: Number},
    total: { type: Number},
    paid: { type: Boolean, required: true, default: false },
    orderDetails: [OrderDetail],
    createdOn: { type: Date},
    updatedOn: { type: Date}
});

// on every save, add the date
OrderSchema.pre('save', function (next) {
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

OrderSchema.plugin(autoIncrement.plugin,'Order');
OrderSchema.plugin(mongoosePaginate);
var Order = mongoose.model('Order', OrderSchema);

/** export schema */
module.exports = Order; 