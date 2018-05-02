var cvModule = angular.module('cvModule', ['jobSeekerServiceModule']);

cvModule.controller('CVController', ['$scope', '$uibModal', '$uibModalStack', '$timeout', 'Upload', 'Restangular', 'Auth', 'ModalService', 'JobSeekerService', 'Notification', function ($scope, $uibModal, $uibModalStack, $timeout, Upload, Restangular, Auth, ModalService, JobSeekerService, Notification) {
    $scope.back = function () {
        window.history.back();
    };
    $scope.cvFile = null;
    $scope.isDefault = false;
    $scope.uploadCV = function () {
        if ($scope.attachCV.file.$valid && $scope.cvFile) {
            $scope.upload();
        }
    };
    $scope.upload = function () {
        ModalService.SetTitle('Upload CV')
        ModalService.SetMessage('Uploading CV,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        Upload.upload({
            url: window.location.origin + '/api/jobSeekers/uploadCV',
            data: {
                file: $scope.cvFile,
                userEmail: Auth.GetUserEmail()
            }
        }).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                JobSeekerService.SetJobSeeker(response.data.jobSeeker);
                Notification.success({ message: response.data.message, title: 'Upload CV' });
                window.history.back();
            };
        }
      );
    };
}])