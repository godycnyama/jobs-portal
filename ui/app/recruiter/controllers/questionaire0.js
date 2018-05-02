var questionaire = angular.module('questionaire', ['formly']);

questionaire.controller('QuestionaireController', ['$scope', '$state', function ($scope, $state) {
    $scope.formData = {};
    $scope.field = {
        key: "",
        type: "",
        label: "",
        placeholder: "",
        required: false,
        disabled: false,
        description: "",
        options:[]
    };
    $scope.addField = function () {
        $scope.formFields.push(field);
    };
    $scope.formFields = [];

}])