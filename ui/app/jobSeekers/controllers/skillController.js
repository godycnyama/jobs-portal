"use strict";

var skillModule = angular.module('skillModule', []);

skillModule.controller('SkillController', ['$scope', '$stateParams', '$uibModal', '$uibModalStack', 'Restangular', 'JobSeekerService', 'ModalService', 'Auth', '$timeout', 'Notification', function ($scope, $stateParams, $uibModal, $uibModalStack, Restangular, JobSeekerService, ModalService, Auth, $timeout, Notification) {
   
    $scope.back = function () {
        window.history.back();
    };
   
    $scope.skill = iniSkill;
    $scope.skillLevelOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    $scope.experienceOptions = ['1 month', '3 months', '6 months', '1 year', '2 years', '3 years', '5 years', '5-7 years', '8-10 years', 'More than 10 years'];
    $scope.lastMonthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.createSkill = function () {
        ModalService.SetTitle('Add Skill')
        ModalService.SetMessage('Adding skill,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });

        //post  to /jobSeekers/{email}/skills
        var Skills = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).all('skills');
        $scope.skill.email = Auth.GetUserEmail();
        Skills.post($scope.skill).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                Notification.success({ message: response.data.message, title: 'Add Skill' });
                window.history.back();
            }

        })
    };
  
    var iniSkill = {
        email: '',
        description: null,
        skillLevel: 'Beginner',
        experience: '1 month',
        lastDateUsedMonth: null,
        lastDateUsedYear: null,
        isCurrent: false,
    };
}]);

skillModule.controller('SkillEditController', ['$scope', '$stateParams', '$rootScope', '$uibModal', '$uibModalStack', 'Restangular', 'JobSeekerService', 'ModalService', 'Auth', 'Notification', function ($scope, $stateParams, $rootScope, $uibModal, $uibModalStack, Restangular, JobSeekerService, ModalService, Auth, Notification) {
    console.log($stateParams.skillID);
    $scope.back = function () {
        window.history.back;
    };
    $scope.jobSeeker = JobSeekerService.GetJobSeeker();
    console.log($rootScope.skill);
    //console.log($scope.jobSeeker);
    $scope.skill = JobSeekerService.GetSkillForEdit();
    $scope.skill = $rootScope.skill;
    //console.log($rootScope.skill);
    console.log($scope.skill);
    //console.log(JobSeekerService.GetSkillForEdit());
    $scope.skillLevelOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    $scope.experienceOptions = ['1 month', '3 months', '6 months', '1 year', '2 years', '3 years', '5 years', '5-7 years', '8-10 years', 'More than 10 years'];
    $scope.lastMonthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.updateSkill = function () {
        var skill = {
            description: $scope.skill.description,
            skillLevel: $scope.skill.skillLevel,
            experience: $scope.skill.experience,
            lastDateUsedMonth: $scope.skill.lastDateUsedMonth,
            lastDateUsedYear: $scope.skill.lastDateUsedYear,
            isCurrent: $scope.skill.isCurrent
        };
        ModalService.SetTitle('Update Skill')
        ModalService.SetMessage('Updating skill,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //put  to /jobSeekers/{email}/skills/{skillID}
        var Skills = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).one('skills', $scope.skill._id);
        Skills.customPUT(skill).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                Notification.success({ message: response.data.message, title: 'Update Skill' });
                window.history.back();
            }
        })
    };
    $scope.deleteSkill = function () {
        ModalService.SetTitle('Delete Skill')
        ModalService.SetMessage('Deleting skill,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //delete /jobSeekers/{email}/skills/{skillID}
        var Skill = Restangular.one('api/jobSeekers', Auth.GetUserEmail()).all('skills');
        Skill.customDELETE($scope.skill._id).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                Notification.success({ message: response.data.message, title: 'Update Skill' });
                window.history.back();
            }
        })
    };
}])