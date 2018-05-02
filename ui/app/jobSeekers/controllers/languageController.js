var languageModule = angular.module('languageModule',[]);

languageModule.controller('LanguageController', ['$scope', '$stateParams', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'JobSeekerService', 'ModalService', 'Auth', 'Notification', function ($scope, $stateParams, $uibModal, $uibModalStack, $timeout, Restangular, JobSeekerService, ModalService, Auth, Notification) {
    
    $scope.language = $scope.iniLanguage;
    $scope.back = function () {
        window.history.back();
    };
    $scope.spokenAbilityOptions = ['Excellent', 'Good', 'Average'];
    $scope.writtenAbilityOptions = ['Excellent', 'Good', 'Average'];
    $scope.createLanguage = function () {
        ModalService.SetTitle('Add Language')
        ModalService.SetMessage('Adding language,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to /jobSeekers/{email}/languages
        var Languages = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).all('languages');
        Languages.post($scope.language).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                Notification.success({ message: response.data.message, title: 'Add Language' });
                window.history.back();
            }

        })
    };
    
    $scope.iniLanguage = {
        email: Auth.GetUserEmail(),
        languageName: null,
        spokenAbility: 'Excellent',
        writtenAbility: 'Excellent'
    };
}]);

languageModule.controller('LanguageEditController', ['$scope', '$stateParams', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'JobSeekerService', 'ModalService', 'Auth', 'Notification', function ($scope, $stateParams, $uibModal, $uibModalStack, $timeout, Restangular, JobSeekerService, ModalService, Auth, Notification) {
   
    $scope.language = JobSeekerService.GetLanguageForEdit();
    $scope.back = function () {
        window.history.back();
    };
    $scope.spokenAbilityOptions = ['Excellent', 'Good', 'Average'];
    $scope.writtenAbilityOptions = ['Excellent', 'Good', 'Average'];
    $scope.updateLanguage = function () {
        var language = {
            languageName: $scope.language.languageName,
            spokenAbility: $scope.language.spokenAbility,
            writtenAbility: $scope.language.writtenAbility,
        };
        ModalService.SetTitle('Update Language')
        ModalService.SetMessage('Updating language,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });

        var Language = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).one('languages', $scope.language._id);
        Language.customPUT(language).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                Notification.success({ message: response.data.message, title: 'Update Language' });
                window.history.back();
            }

        })
    };

    $scope.deleteLanguage = function () {
        ModalService.SetTitle('Delete Language')
        ModalService.SetMessage('Deleting language,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //Delete  /jobSeekers/{email}/qualifications/{languageID}
        var Language = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).all('languages');
        Language.customDELETE($scope.language._id).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                Notification.success({ message: response.data.message, title: 'Delete Language' });
                window.history.back();
            }
        })
    };
}])