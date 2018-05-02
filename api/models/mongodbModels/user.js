'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  User
  * @description contain the details of Attribute  
*/
var UserSchema = new Schema({
  email:{ type: String, unique:true, required: true,trim :true ,minlength:1,maxlength:50},
  password: { type: String, required: true, trim: true},
  passwordTemporary: { type: Boolean, default: false },
  passwordTemporaryTTL: { type: Number },    // if password is temporary,set 24 hours validity
  securityQuestion: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  securityQuestionAnswer: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
  passwordRecoveryEmail: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 }, 
  role: { type: String, required: true, enum: ['jobseeker', 'recruiter', 'admin', 'advertiser'] },
  createdOn: { type: Date},
  updatedOn: { type: Date}
});

// on every save, add the date
UserSchema.pre('save', function (next) {
    this.passwordTemporaryTTL = new Date().getTime() + 24 * 60 * 60 * 1000; // if password is temporary,set 24 hours validity
    if (!this.passwordRecoveryEmail)
        this.passwordRecoveryEmail = this.email; // if password Recovery email address not set, set it to the registered email address
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

UserSchema.plugin(autoIncrement.plugin,'User');
UserSchema.plugin(mongoosePaginate);
var User = mongoose.model('User',UserSchema);

/** export schema */
module.exports = User;

// email regex "/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/"
