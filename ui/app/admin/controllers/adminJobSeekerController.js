var adminJobSeekerModule = angular.module('adminJobSeekerModule', []);

adminJobSeekerModule.controller('AdminJobSeekerController', ['$scope', '$http', '$uibModal', '$uibModalStack', '$timeout', 'ModalService', 'AdminJobSeekersService', 'Restangular', 'FileSaver', 'Blob', 'Notification', function ($scope, $http, $uibModal, $uibModalStack, $timeout, ModalService, AdminJobSeekersService, Restangular, FileSaver, Blob, Notification) {
     $scope.jobSeeker = AdminJobSeekersService.GetItem();
     $scope.back = function () {
        window.history.back();
     };
     $scope.deleteJobSeeker = function (_jobSeeker) {
         var jobSeeker = {
             email: $scope.jobSeeker.email
         };
        ModalService.SetTitle('Delete Job Seeker')
        ModalService.SetMessage('Are you sure you want to delete job seeker?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
      modalInstance.result.then(function () {
          $uibModalStack.dismissAll();
          $timeout(function () {
              ModalService.SetTitle('Delete Job Seeker')
              ModalService.SetMessage('Deleting job seeker,please wait!');
              var modalInstance = $uibModal.open({
                  templateUrl: 'app/modals/modal.html',
                  controller: 'ModalController'
              });
          }, 500);
        
        
        var JobSeekers = Restangular.all('/api/jobSeekers');
        JobSeekers.customDELETE("", jobSeeker).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                $timeout(function () {
                    AdminJobSeekersService.DeleteItem(_jobSeeker);
                    Notification.success({ message: response.data.message, title: 'Delete Job Seeker' });
                    window.history.back();
                }, 500);
                
                
            }
          })
        });
     };
     $scope.downloadCV = function () {
         var url = window.location.origin + '/api/cvs/getCV/' + $scope.jobSeeker.cv.fileID;
         $http.get(url, { cache: false, responseType: 'arraybuffer' }).then(function (response) {
             var blob = new Blob([response.data], { type: $scope.jobSeeker.cv.content_type });
             FileSaver.saveAs(blob, $scope.jobSeeker.cv.fileName);
         });
     };
     $scope.deleteCV = function () {
         ModalService.SetTitle('Delete CV')
         ModalService.SetMessage('Are you sure you want to delete CV ' + $scope.jobSeeker.cv.fileName + '?');
         var modalInstance = $uibModal.open({
             templateUrl: 'app/modals/messageModal.html',
             controller: 'ModalController'
         });
         modalInstance.result.then(function () {
             $uibModalStack.dismissAll();
             ModalService.SetTitle('Delete CV')
             ModalService.SetMessage('Deleting CV ' + $scope.jobSeeker.cv.fileName + ',please wait!');
             var modalInstance = $uibModal.open({
                 templateUrl: 'app/modals/modal.html',
                 controller: 'ModalController'
             });


             var cvs = Restangular.one('api/jobSeekers/deleteCV');
             var query = {
                 fileID: $scope.jobSeeker.cv.fileID,
                 email: $scope.jobSeeker.email
             }
             cvs.customDELETE('', query).then(function (response) {
                 if (response.data) {
                     $uibModalStack.dismissAll();
                     $scope.jobSeeker = response.data.jobSeeker;
                     Notification.success({ message: response.data.message, title: 'Delete CV' });
                 }
             })
         });
     };
}])