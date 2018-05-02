var adminJobAdModule = angular.module('adminJobAdModule', []);

adminJobAdModule.controller('AdminJobAdController', ['$scope', '$uibModal', '$uibModalStack', '$timeout', 'AdminJobAdsService', 'ModalService', 'Restangular', 'Notification', function ($scope, $uibModal, $uibModalStack, $timeout, AdminJobAdsService, ModalService, Restangular, Notification) {
     $scope.jobAd = AdminJobAdsService.GetItem();
     $scope.back = function () {
         window.history.back();
     };
     $scope.calculateDaysRemaining = function (_date) {
         var oneDay = 24 * 60 * 60 * 1000;	// hours*minutes*seconds*milliseconds
         var todayDate = new Date();
         todayDate.setHours(0, 0, 0, 0);
         var expiryDate = new Date(_date);
         expiryDate.setHours(0, 0, 0, 0);

         var diffDays = Math.abs((expiryDate.getTime() - todayDate.getTime()) / (oneDay));
         return diffDays;
     };
     $scope.aboutRecruiter = function () {
         var modalInstance = $uibModal.open({
             templateUrl: 'app/modals/aboutRecruiter.html',
             controller: 'AboutRecruiterModalController'
         });
     };
     $scope.deleteJobAd = function () {
         var jobAd = {
             jobAdID: $scope.jobAd._id
         };
        ModalService.SetTitle('Delete Job Ad')
        ModalService.SetMessage('Are you sure you want to delete job ad?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
      modalInstance.result.then(function () {
          $uibModalStack.dismissAll();
          $timeout(function () {
              ModalService.SetTitle('Delete Job Ad')
              ModalService.SetMessage('Deleting job ad,please wait!');
              var modalInstance = $uibModal.open({
                  templateUrl: 'app/modals/modal.html',
                  controller: 'ModalController'
              });
          }, 500);
     
          var JobAds = Restangular.all('/api/jobAds/deleteJobAdByID');
        JobAds.customDELETE("",jobAd).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                $timeout(function () {
                    AdminJobAdsService.DeleteItem($scope.jobAd);
                    Notification.success({ message: response.data.message, title: 'Delete Job Ad' });
                    window.history.back();
                }, 500);  
            }
          })
        });
     };
     $scope.markPaidJobAd = function () {
         ModalService.SetTitle('Mark Job Ad as paid')
         ModalService.SetMessage('Marking job ad as paid,please wait!');
         var modalInstance = $uibModal.open({
             templateUrl: 'app/modals/modal.html',
             controller: 'ModalController'
         });
         var jobAd = {
             jobAdID: $scope.jobAd._id
         };
         //get from /api/jobAds/closeJobAd
         var JobAds = Restangular.all('api/jobAds/markPaidJobAd');
         JobAds.post(jobAd).then(function (response) {
             if (response) {
                 $uibModalStack.dismissAll();
                 Notification.success({ message: response.data.message, title: 'Mark Job Ad as paid' });
                 var jobAds = AdminJobAdsService.GetItems();
                 for (var i = 0; i < jobAds.length; i++) {
                     if (jobAds[i]._id === _jobAd._id) {
                         jobAds[i].paid = true;
                         AdminJobAdsService.SetItems(jobAds);
                         return
                     }
                 }
             };
         })
     }
}])