'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Answer
  * @description contain the details of Attribute  
*/
var AnswerSchema = new Schema({
    answerNumber: { type: Number, required: true },
    text: { type: String, required: true ,trim: true, minlength: 1, maxlength: 100},
    score: { type: Number ,enum:[0,1,2,3,4,5,6,7,8,9,10] },
});

AnswerSchema.plugin(autoIncrement.plugin,'Answer');
var Answer = mongoose.model('Answer', AnswerSchema);

/** export schema */
module.exports = Answer;