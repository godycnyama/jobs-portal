var adminRecruiterModule = angular.module('adminRecruiterModule', []);

adminRecruiterModule.controller('AdminRecruiterController', ['$scope', '$uibModal', '$uibModalStack', '$timeout', 'AdminRecruitersService', 'Restangular', 'Notification', function ($scope, $uibModal, $uibModalStack, $timeout, AdminRecruitersService, Restangular, Notification) {
     $scope.recruiter = AdminRecruitersService.GetItem();
     $scope.back = function () {
        window.history.back();
     };
     $scope.deleteRecruiter = function (_recruiter) {
         var recruiter = {
             recruiterID: $scope.recruiter._id
         };
        ModalService.SetTitle('Delete Recruiter')
        ModalService.SetMessage('Are you sure you want to delete job seeker?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
      modalInstance.result.then(function () {
          $uibModalStack.dismissAll();
          $timeout(function () {
              ModalService.SetTitle('Delete Recruiter')
              ModalService.SetMessage('Deleting recruiter,please wait!');
              var modalInstance = $uibModal.open({
                  templateUrl: 'app/modals/modal.html',
                  controller: 'ModalController'
              });
          }, 500);
        
        
          var Users = Restangular.all('/api/recruiters/deleteRecruiter');
        Users.customDELETE("", recruiter).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                $timeout(function () {
                    AdminRecruitersService.DeleteItem(_recruiter);
                    Notification.success({ message: response.data.message, title: 'Delete Recruiter' });
                }, 500);
                window.history.back();         
            }
          })
        });
    };
}])