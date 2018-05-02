'use strict';

const Question = require('./question');

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const autoIncrement = require('../../config/db').autoIncrement;
/**
  * @module  Questionnaire
  * @description contain the details of Attribute  
*/
var QuestionnaireSchema = new Schema({
    questionnaireREF: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    title: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    recruiterID: { type: Number, required: true },
    questionsTotal: { type: Number, required: true },
    lastQuestionNumber: { type: Number, required: true },
    questions: [{question: String}]
});

QuestionnaireSchema.plugin(autoIncrement.plugin,'Questionnaire');
QuestionnaireSchema.plugin(mongoosePaginate);
var Questionnaire = mongoose.model('Questionnaire', QuestionnaireSchema);

/** export schema */
module.exports = Questionnaire;

