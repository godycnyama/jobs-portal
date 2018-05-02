var adminJobAdsModule = angular.module('adminJobAdsModule', []);

adminJobAdsModule.controller('AdminJobAdsController', ['$scope', '$rootScope', '$state', 'AdminJobAdsService', 'Restangular', '$uibModal', '$uibModalStack', '$timeout', 'ModalService', 'Notification', function ($scope, $rootScope, $state, AdminJobAdsService, Restangular, $uibModal, $uibModalStack, $timeout, ModalService, Notification) {
    $scope.jobAds = (AdminJobAdsService.GetItems() != null) ? AdminJobAdsService.GetItems() : [];
    $scope.searchBy = AdminJobAdsService.GetSearchBy();
    $scope.searchTerm = AdminJobAdsService.GetSearchTerm();
    $scope.totalJobAds = AdminJobAdsService.GetTotalItems();
    $scope.searchByOptions = ['All','Recruiter Company Name', 'RecruiterID', 'Paid', 'Not Paid', 'Date', 'Date Range', 'Closed', 'Open'];
    $scope.viewPerPageOptions = [4, 8];
    $scope.jobAdsPerPage = AdminJobAdsService.GetItemsPerPage();
    $scope.date = null;
    $scope.dateFrom = null;
    $scope.dateTo = null;
    $scope.clearJobAds = function () {
        $scope.jobAds = [];
        AdminJobAdsService.ClearItems();
        $scope.totalJobAds = 0;
    };
    $scope.isEmpty = function () {
        for (var prop in $scope.jobAds) {
            if ($scope.jobAds.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    $scope.init = function () {
        $scope.searchBy = AdminJobAdsService.GetSearchBy();
        $scope.searchTerm = AdminJobAdsService.GetSearchTerm();
        $scope.ordersPerPage = AdminJobAdsService.GetItemsPerPage();
        $scope.totalOrders = AdminJobAdsService.GetTotalItems();
        if (AdminJobAdsService.GetBackNav() == 'YES') {
            $scope.getPageBackNav();
        }
    };
    $scope.pagination = {
        current: AdminJobAdsService.GetCurrentPage(),
        last: 0
    };
    $scope.range = {
        lower: 0,
        upper: 0,
        total: 0
    };

    $scope.openDatePicker = function ($event) {
        $scope.datePickerOpened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.date = new Date(year, month, day);
    };
    $scope.todayDate = function () {
        $scope.date = new Date();
    };
    $scope.clear = function () {
        $scope.date = '';
    };
    $scope.openFromDatePicker = function ($event) {
        $scope.fromDatePickerOpened = true;
    };

    $scope.setFromDate = function (year, month, day) {
        $scope.dateFrom = new Date(year, month, day);
    };
    $scope.todayToDate = function () {
        $scope.dateFrom = new Date();
    };
    $scope.clearFromDate = function () {
        $scope.dateFrom = '';
    };
    $scope.openToDatePicker = function ($event) {
        $scope.toDatePickerOpened = true;
    };

    $scope.setFromDate = function (year, month, day) {
        $scope.dateTo = new Date(year, month, day);
    };
    $scope.todayToDate = function () {
        $scope.dateTo = new Date();
    };
    $scope.clearToDate = function () {
        $scope.dateTo = '';
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.getPage = function (newPage) {
        var query = {
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: newPage,
            perPage: $scope.jobAdsPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo
        };
        $scope.getJobAds(query);
    };
    $scope.viewJobAd = function (_jobAd) {
        AdminJobAdsService.SetItem(_jobAd);
        AdminJobAdsService.SetCurrentPage($scope.pagination.current);
        AdminJobAdsService.SetTotalItems($scope.totalJobAds);
        $rootScope.jobAd = _jobAd;
        $state.go('admin.jobAd');
    };
    $scope.aboutRecruiter = function (jobAd) {
        $rootScope.jobAd = jobAd;
        console.log($rootScope.jobAd);
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/aboutRecruiter.html',
            controller: 'AboutRecruiterModalController'
        });
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
    $scope.deleteJobAd = function (_jobAd) {
        var jobAd = {
            jobAdID: _jobAd._id
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
        JobAds.customDELETE("", jobAd).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Delete Job Ad' });
                $timeout(function () {
                    AdminJobAdsService.DeleteItem(_jobAd);
                    for (var i = 0; i < $scope.jobAds.length; i++) {
                        if ($scope.jobAds[i]._id === _jobAd._id) {
                            return $scope.jobAds.splice(i, 1);
                        }
                    }
                }, 500);
                
            }
          })
        });
     };
     $scope.searchJobAds = function () {
         ModalService.SetTitle('JobAd(s) Search')
         ModalService.SetMessage('Searching job Ad(s),please wait!');
         var modalInstance = $uibModal.open({
             templateUrl: 'app/modals/modal.html',
             controller: 'ModalController'
         });
         var query = {
             searchBy: $scope.searchBy,
             searchTerm: $scope.searchTerm,
             pageNo: 1,
             perPage: $scope.jobAdsPerPage,
             date: $scope.date,
             dateFrom: $scope.dateFrom,
             dateTo: $scope.dateTo
         };
         $scope.getJobAds(query);

     };
     $scope.getPageBackNav = function () {
         var query = {
             searchBy: $scope.searchBy,
             searchTerm: $scope.searchTerm,
             pageNo: $scope.pagination.current,
             perPage: $scope.jobAdsPerPage,
             date: $scope.date,
             dateFrom: $scope.dateFrom,
             dateTo: $scope.dateTo
         };
         $scope.getJobAds(query);
     };
     $scope.getJobAds = function (query) {
         AdminJobAdsService.SetSearchBy($scope.searchBy);
         AdminJobAdsService.SetSearchTerm($scope.searchTerm);
         AdminJobAdsService.SetItemsPerPage($scope.jobAdsPerPage);
         //get from api/jobAds/getJobAdsBy
         var JobAds = Restangular.all('api/jobAds/getJobAdsBy');
         JobAds.getList(query).then(function (response) {
             if (response.data) {
                 $uibModalStack.dismissAll();
                 if (response.data.total == 0) {
                     Notification.error({ message: 'No job ads matching your search criteria found!', title: 'Job Ads(s) Search Error' });
                     return
                 };
                 $scope.jobAds = response.data;
                 AdminJobAdsService.SetItems(response.data);
                 $scope.totalJobAds = response.data.total;
                 AdminJobAdsService.SetTotalItems(response.data.total);
             };
         })
     };

     $scope.closeJobAd = function (_jobAd) {
         ModalService.SetTitle('Close Job Ad')
         ModalService.SetMessage('Closing job ad,please wait!');
         var modalInstance = $uibModal.open({
             templateUrl: 'app/modals/modal.html',
             controller: 'ModalController'
         });
         var jobAd = {
             jobAdID: _jobAd._id
         };
         //get from /api/jobAds/closeJobAd
         var JobAds = Restangular.all('api/jobAds/closeJobAd');
         JobAds.post(jobAd).then(function (response) {
             if (response) {
                 $uibModalStack.dismissAll();
                 Notification.success({ message: response.data.message, title: 'Close Job Ad' });
                 $scope.jobAds = response.data;
                 AdminJobAdsService.SetItems(response.data);
                 $scope.totalJobAds = response.data.total;
             };
         })
     };
     $scope.markPaidJobAd = function (_jobAd) {
         ModalService.SetTitle('Mark Job Ad as paid')
         ModalService.SetMessage('Marking job ad as paid,please wait!');
         var modalInstance = $uibModal.open({
             templateUrl: 'app/modals/modal.html',
             controller: 'ModalController'
         });
         var jobAd = {
             jobAdID: _jobAd._id
         };
         //get from /api/jobAds/closeJobAd
         var JobAds = Restangular.all('api/jobAds/markPaidJobAd');
         JobAds.post(jobAd).then(function (response) {
             if (response) {
                 $uibModalStack.dismissAll();
                 Notification.success({ message: response.data.message, title: 'Mark Job Ad as paid' });
                 for (var i = 0; i < $scope.jobAds.length; i++) {
                     if ($scope.jobAds[i]._id === _jobAd._id) {
                         $scope.jobAds[i].paid = true;
                         AdminJobAdsService.SetItems($scope.jobAds);
                         return 
                     }
                 }
             };
         })
     }

}])

