var questionnaire = angular.module('questionnaire', ['formly']);

questionnaire.controller('QuestionaireController', ['$scope', '$state', function ($scope, $state) {
    $scope.question = null;
    $scope.answer = null;
    $scope.isMultipleChoice = null;
    $scope.answerA = null;
    $scope.answerAscoreOptions = [1,2,3,4,5];
    $scope.selectedAnswerAscore = null;
    $scope.answerB = null;
    $scope.answerBscoreOptions = [1, 2, 3, 4, 5];
    $scope.selectedAnswerBscore = null;
    $scope.answerC = null;
    $scope.answerCscoreOptions = [1, 2, 3, 4, 5];
    $scope.selectedAnswerCscore = null;
    $scope.answerD = null;
    $scope.answerDscoreOptions = [1, 2, 3, 4, 5];
    $scope.selectedAnswerDscore = null;
    $scope.answerE = null;
    $scope.answerEscoreOptions = [1, 2, 3, 4, 5];
    $scope.selectedAnswerEscore = null;
    $scope.questionModel = {
        question: $scope.question,
        answer:$scope.answer,
        multipleChoiceAnswers: {
            answerA: $scope.answerA,
            selectedAnswerAscore: $scope.selectedAnswerAscore,
            selectedAnswerBscore: $scope.selectedAnswerBscore,
            selectedAnswerCscore: $scope.selectedAnswerCscore,
            selectedAnswerDscore: $scope.selectedAnswerDscore,
            selectedAnswerEscore: $scope.selectedAnswerEscore,
        },
    };
    $scope.questions = [];
    $scope.addQuestion = function () {
        $scope.questions.push($scope.questions);
    };

}])