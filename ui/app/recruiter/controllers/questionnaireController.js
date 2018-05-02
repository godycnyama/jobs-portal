var questionnaireModule = angular.module('questionnaireModule',[]);

questionnaireModule.controller('QuestionnaireController', ['$scope', '$state', 'Restangular', '$uibModal', '$uibModalStack', 'ModalService', 'QuestionnaireService', 'Auth', function ($scope, $state, Restangular,$uibModal, $uibModalStack, ModalService, QuestionnaireService, Auth) {
    $scope.questions = QuestionnaireService.GetQuestionnaire();
    $scope.question = ''
    $scope.questionAnswerOption = {
        text: '',
        score: null
    };
    $scope.questionCategoryOptions = ['General', 'Education', 'Experience', 'Skills'];
    $scope.question.category = $scope.questionCategoryOptions[0];
    $scope.questionTypeOptions = ['Text', 'Text Area', 'Check Box', 'MultiCheckBox', 'Multiple Choice Radio Buttons', 'Multiple Choice Dropdown List'];
    $scope.question.type = $scope.questionTypeOptions[0];
    $scope.questionType = $scope.questionTypeOptions[0];
    $scope.multiCheckboxOption = '';
    $scope.radioOption = '';
    $scope.dropDownOption = '';
    $scope.answerScoreOptions = ['Not Scored', 'Auto Reject', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.questionAnswerOption.score = $scope.answerScoreOptions[0];
    $scope.addMultiCheckBoxAnswerOption = function () {
        var optionID = $scope.multiCheckbox.templateOptions.options.length;
        $scope.multiCheckbox.templateOptions.options.push({ id: optionID, title: $scope.questionAnswerOption.text, score: $scope.questionAnswerOption.score })
    };
    $scope.addRadioAnswerOption = function () {
        var optionID = $scope.radio.templateOptions.options.length;
        $scope.radio.templateOptions.options.push({ name: $scope.questionAnswerOption.text, value: $scope.questionAnswerOption.text, score: $scope.questionAnswerOption.score })
    };

    $scope.addSelectAnswerOption = function () {
        var optionID = $scope.select.templateOptions.options.length;
        $scope.select.templateOptions.options.push({ name: $scope.questionAnswerOption.text, score: $scope.questionAnswerOption.score })
    };
    $scope.deleteMultiCheckboxAnswerOption = function (index) {
        $scope.multiCheckbox.templateOptions.options.splice(index, 1)
    };
    $scope.deleteRadioAnswerOption = function (index) {
        $scope.radio.templateOptions.options.splice(index, 1)
    };
    $scope.deleteSelectAnswerOption = function (index) {
        $scope.select.templateOptions.options.splice(index, 1)
    };
    $scope.addQuestion = function () {
        var question = {
            text: $scope.question.text,
            category: $scope.question.category,
            type: $scope.question.type,
            required: $scope.question.required,
            answerOptions: $scope.question.answerOptions
        }
        $scope.questions.push(question)
    };
    $scope.deleteQuestion = function (index) {
        $scope.questions.splice(index, 1);

    };
    $scope.addQuestion = function () {
        switch ($scope.questionType) {
            case 'Text':
                $scope.addTextQuestion();
                break;
            case 'Text Area':
                $scope.addTextAreaQuestion();
                break;
            case 'Check Box':
                $scope.addCheckBoxQuestion();
                break;
            case 'MultiCheckBox':
                $scope.addMultiCheckBoxQuestion();
                break;
            case 'Multiple Choice Radio Buttons':
                $scope.addRadioButtonsQuestion();
                break;
            case 'Multiple Choice Dropdown List':
                $scope.addDropdownListQuestion();
                break;
        }
    };
    $scope.addTextQuestion = function () {
        var questionNumber = $scope.questions.length + 1;
        $scope.text.category = $scope.question.category;
        $scope.text.key = $scope.questions.length + 1;
        $scope.text.templateOptions.label = '(' + questionNumber + ')' + ' ' + $scope.question;
        $scope.add(JSON.stringify($scope.text));
    };
    $scope.addTextAreaQuestion = function () {
        var questionNumber = $scope.questions.length + 1;
        $scope.textArea.category = $scope.question.category;
        $scope.textArea.key = $scope.questions.length + 1;
        $scope.textArea.templateOptions.label = '(' + questionNumber + ')' + ' ' + $scope.question;
        $scope.add(JSON.stringify($scope.text));
    };
    $scope.addCheckBoxQuestion = function () {
        var questionNumber = $scope.questions.length + 1;
        $scope.checkbox.category = $scope.question.category;
        $scope.checkbox.key = $scope.questions.length + 1;
        $scope.checkbox.templateOptions.label = '(' + questionNumber + ')' + ' ' + $scope.question;
        $scope.add(JSON.stringify($scope.text));
    };

    $scope.addMultiCheckBoxQuestion = function () {
        var questionNumber = $scope.questions.length + 1;
        $scope.multiCheckbox.category = $scope.question.category;
        $scope.multiCheckbox.key = $scope.questions.length + 1;
        $scope.multiCheckbox.templateOptions.label = '(' + questionNumber + ')' + ' ' + $scope.question;
        $scope.add(JSON.stringify($scope.text));
    };

    $scope.addRadioButtonsQuestion = function () {
        var questionNumber = $scope.questions.length + 1;
        $scope.radio.category = $scope.question.category;
        $scope.radio.key = $scope.questions.length + 1;
        $scope.radio.templateOptions.label = '(' + questionNumber + ')' + ' ' + $scope.question;
        $scope.add(JSON.stringify($scope.text));
    };

    $scope.addDropdownListQuestion = function () {
        var questionNumber = $scope.questions.length + 1;
        $scope.select.category = $scope.question.category;
        $scope.select.key = $scope.questions.length + 1;
        $scope.select.templateOptions.label = '(' + questionNumber + ')' + ' ' + $scope.question;
        $scope.add(JSON.stringify($scope.text));
    };


    $scope.add = function (_question) {
        var questionnaireOR = QuestionnaireService.GetQuestionnaire();
        var questionnaire = {
            questionnaireID: questionnaireOR._id,
            questionnaireREF: questionnaireOR.REF,
            userID: Auth.GetUserID(),
            question: _question
        };
        ModalService.SetTitle('Add Question');
        ModalService.SetMessage('Adding question,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/questionnaires/addQuestion
        var Questionnaire = Restangular.all('api/questionnaires/addQuestion');
        Questionnaire.post(questionnaire).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                QuestionnaireService.SetQuestionnaire(response.data.questionnaire);
                ModalService.SetTitle('Add Question')
                ModalService.SetMessage(response.data.message);
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/messageModal.html',
                    controller: 'ModalController'
                });
            }

        }, function (response) {
            if (response.data.error) {
                $uibModalStack.dismissAll();
                ModalService.SetTitle('Add Question');
                ModalService.SetMessage(response.data.message);
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/messageModal.html',
                    controller: 'ModalController'
                });
            }

        })
    };
    $scope.text = {
        category: '',
        type: 'input',
        key: '',
        templateOptions: {
            type: 'text',
            label: '',
            placeholder: 'Enter your answer here'
        }
    };
    $scope.textArea = {
        category: '',
        type: 'textarea',
        key: '',
        templateOptions: {
            label: '',
            rows: 4,
            cols: 10,
            placeholder: 'Enter your answer here'
        }
    };
    $scope.checkbox = {
        category: '',
        type: 'checkbox',
        key: '',
        templateOptions: {
            label: ''
        }
    };
    $scope.multiCheckbox = {
        category: '',
        type: 'multiCheckbox',
        key: '',
        templateOptions: {
            label: '',
            options: [],
            valueProp: 'id',
            labelProp: 'title'
        }
    };
    $scope.radio = {
        category: '',
        type: 'radio',
        key: '',
        templateOptions: {
            label: '',
            options: []
        }
    };
    $scope.select = {
        category: '',
        type: 'select',
        key: '',
        templateOptions: {
            label: '',
            valueProp: 'name',
            options: []
        }
    };

}]);

questionnaireModule.controller('CreateQuestionnaireController', ['$scope', '$state', '$uibModal', '$uibModalStack', 'ModalService', 'QuestionnaireService', 'Auth', function ($scope, $state, $uibModal, $uibModalStack, ModalService, QuestionnaireService, Auth) {
    $scope.questionnaire = {};
    $scope.questionnaire.questionnaireREF = '';
    $scope.questionnaire.userID = Auth.GetUserID();
    $scope.createQuestionnaire = function () {
        ModalService.SetTitle('Create Questionnaire');
        ModalService.SetMessage('Creating questionnaire,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/questionnaires
        var Questionnaires = Restangular.all('api/questionnaires');
        Questionnaires.post($scope.questionnaire).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                QuestionnaireService.SetQuestionnaire(response.data.questionnaire);
                ModalService.SetTitle('Create Questionnaire')
                ModalService.SetMessage(response.data.message);
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/messageModal.html',
                    controller: 'ModalController'
                });
                modalInstance.result.then(function () {
                    $state.go('recruiter.editQuestionnaire');
                });
            }

        }, function (response) {
            if (response.data.error) {
                $uibModalStack.dismissAll();
                ModalService.SetTitle('Create Questionnaire');
                ModalService.SetMessage(response.data.message);
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/messageModal.html',
                    controller: 'ModalController'
                });
            }

        })
    };

}]);

questionnaireModule.controller('PreviewQuestionnaireController', ['$scope', '$state', 'QuestionnaireService', function ($scope, $state, QuestionnaireService) {
    $scope.questionnaire = QuestionnaireService.GetQuestionnaire();
}])