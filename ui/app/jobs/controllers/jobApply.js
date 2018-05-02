var jobApplyModule = angular.module('jobApplyModule',[]);

jobApplyModule.controller('JobApplyController', ['$scope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'Auth', 'JobsService', 'ModalService', 'Notification', function ($scope, $state, $uibModal, $uibModalStack, $timeout, Restangular, Auth, JobsService, ModalService, Notification) {
    $scope.jobAd = JobsService.GetJob();
    $scope.back = function () {
        window.history.back();
    };
    $scope.text = '';
    $scope.coverNote = '';
    $scope.count = 0;
    $scope.countText = function (e, editor) {
        var text0 = $scope.coverNote;
        $scope.text = text0.replace(/<(?:.|\n)*?>/gm, '');
        $scope.count = $scope.text.length;
        if ($scope.coverNote.length == 0) {
            $scope.count = 0;
        }
    };
    $scope.sendApplication = function () {
        if ($scope.text.length >= 2001) {
            ModalService.SetMessage('Cover note must be a maximum of 2000 characters!');
            ModalService.SetTitle('Error');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/messageModal.html',
                controller: 'ModalController'
            });
            return
        };
        var jobApplication = {
            jobAdID: $scope.jobAd._id,
            jobAdREF: $scope.jobAd.jobREF,
            jobTitle: $scope.jobAd.jobTitle,
            recruiterID: $scope.jobAd.company._id,
            recruiterUserID: $scope.jobAd.company.userID,
            jobSeekerUserID: Auth.GetUserID(),
            coverNote: $scope.text
        };
        
        ModalService.SetTitle('Job Application')
        ModalService.SetMessage('Sending job application,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        
        var JobApplications = Restangular.all('api/jobApplications');
        JobApplications.post(jobApplication).then(function (response) {
            if (response.status === 200) {
                $uibModalStack.dismissAll();
                $state.go('jobs.master');           
                Notification.success({ message: response.data.message, title: 'Job Application' });
            }
        })
    };
 }])