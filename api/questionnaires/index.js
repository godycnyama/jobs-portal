'use strict';
 var QuestionnairesMongoController = require('./questionnairesMongoController');
exports.register = function (server, options, next) {

    server.route([{
        method: 'GET',
        path: '/api/questionnaires',
        config: QuestionnairesMongoController.getAllQuestionnaires
    },
    {
        method: 'GET',
        path: '/api/questionnaires/getQuestionnairesByRecruiterID',
        config: QuestionnairesMongoController.getQuestionnairesByRecruiterID
    },
    {
        method: 'GET',
        path: '/api/questionnaires/getQuestionnaireByID',
        config: QuestionnairesMongoController.getQuestionnaireByID
    },
    {
        method: 'GET',
        path: '/api/questionnaires/getQuestionnaireByREF',
        config: QuestionnairesMongoController.getQuestionnaireByREF
    },
    {
        method: 'GET',
        path: '/api/questionnaires/getQuestionnaireByTitle',
        config: QuestionnairesMongoController.getQuestionnaireByTitle
    },
    {
        method: 'GET',
        path: '/api/questionnaires/getQuestionsCount',
        config: QuestionnairesMongoController.getQuestionsCount
    },
    {
        method: 'POST',
        path: '/api/questionnaires/createQuestionnaire',
        config: QuestionnairesMongoController.createQuestionnaire
    },
    {
        method: 'POST',
        path: '/api/questionnaires/addQuestion',
        config: QuestionnairesMongoController.addQuestion
    },
    {
        method: 'PUT',
        path: '/api/questionnaires/updateQuestionnaire',
        config: QuestionnairesMongoController.updateQuestionnaire
    },
    {
        method: 'PUT',
        path: '/api/questionnaires/updateQuestion',
        config: QuestionnairesMongoController.updateQuestion
    },
    {
        method: 'DELETE',
        path: '/api/questionnaires/deleteQuestionnaire',
        config: QuestionnairesMongoController.deleteQuestionnaire
    },
    {
        method: 'DELETE',
        path: '/api/questionnaires/deleteQuestion',
        config: QuestionnairesMongoController.deleteQuestion
    },
    {
        method: 'DELETE',
        path: '/api/questionnaires/deleteAllQuestionnaires',
        config: QuestionnairesMongoController.deleteAllQuestionnaires
    }]);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};