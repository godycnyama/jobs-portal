'use strict';
const Answer = require('./answer');
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Question
  * @description contain the details of Attribute  
*/
var QuestionSchema = new Schema({
    description: { type: String, required: true},     // General,Education,Experience,Skills
});

QuestionSchema.plugin(autoIncrement.plugin,'Question');
var Question = mongoose.model('Question', QuestionSchema);

/** export schema */
module.exports = Question;