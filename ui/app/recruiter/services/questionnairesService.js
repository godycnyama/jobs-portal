var questionnaireServiceModule = angular.module('questionnaireServiceModule', []);
questionnaireServiceModule.factory('QuestionnaireService', ['$http', function ($http) {

    var questionnaire = {};
    var questionnaires = [];
    return {
        SetQuestionnaires: function (_questions) {
            return questionnaires = _questions;
        },
        GetQuestionnaires: function () {
            return questionnaires;
        },
        SetQuestionnaire: function (_questionnaire) {
            return questionnaire = _questionnaire;
        },
        GetQuestionnaire: function(){
            return questionnaire;
        }
        
    }
}]);