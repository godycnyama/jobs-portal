'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
const mongoosePaginate = require('mongoose-paginate');
/**
  * @module  Item
  * @description contain the details of Attribute  
*/
var ItemSchema = new Schema({
    itemCode: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    category: { type: String, required: true, enum: ['Job Ad', 'CV Search'] },
    description: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    minimumJobAds: { type: Number},
    maximumJobAds: { type: Number},
    unitPrice: { type: Number, required: true },
    createdOn: { type: Date},
    updatedOn: { type: Date}
});

// on every save, add the date
ItemSchema.pre('save', function (next) {
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

ItemSchema.plugin(autoIncrement.plugin, 'Item');
ItemSchema.plugin(mongoosePaginate);
var Item = mongoose.model('Item', ItemSchema);

/** export schema */
module.exports = Item;
