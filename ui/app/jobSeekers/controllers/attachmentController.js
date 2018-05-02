var attachmentModule = angular.module('attachmentModule', ['jobSeekerServiceModule']);

attachmentModule.controller('AttachmentController', ['$scope', 'Restangular', '$uibModal', '$uibModalStack', '$timeout', 'Upload', 'Auth', 'ModalService', 'JobSeekerService', 'Notification', function ($scope, Restangular, $uibModal, $uibModalStack, $timeout, Upload, Auth, ModalService, JobSeekerService, Notification) {
    $scope.back = function () {
        window.history.back();
    };
    $scope.attachmentFile = null;
    $scope.documentTypeOptions = ['ID/Passport','Registration Certificate','Driving Licence','Other'];
    $scope.documentType = $scope.documentTypeOptions[0];
    $scope.uploadAttachment = function () {
        if ($scope.attachDocument.file.$valid && $scope.attachmentFile) {
            $scope.upload();
        }
    };
    $scope.upload = function () {
        ModalService.SetTitle('Upload Attachment')
        ModalService.SetMessage('Uploading attachment,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        Upload.upload({
            url: window.location.origin + '/api/jobSeekers/' + Auth.GetUserEmail() + '/attachments',
            data: {
                file: $scope.attachmentFile,
                documentType: $scope.documentType,
                userEmail: Auth.GetUserEmail()
            }
        }).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Upload Attachment' });
                window.history.back();
              }                
             }
            );
    };
}])