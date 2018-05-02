var previewEditJobAdModule = angular.module('previewEditJobAdModule', []);

previewEditJobAdModule.controller('PreviewEditJobAdController', ['$scope', '$rootScope', '$state', '$timeout', 'Restangular', '$uibModal', '$uibModalStack', 'ModalService', 'JobAdsService', 'Auth', 'JobAdOrderService', 'Notification', 'store', 'RecruiterService', function ($scope, $rootScope, $state, $timeout, Restangular, $uibModal, $uibModalStack, ModalService, JobAdsService, Auth, JobAdOrderService, Notification, store, RecruiterService) {
    $scope.recruiter = RecruiterService.GetRecruiter();
    $scope.today_date = Date.now();
    $scope.back = function () {
        window.history.back();
    }
    $scope.addQuestionnaire = false;
    $scope.jobAd = JobAdsService.GetJobAd();
    if (typeof $scope.jobAd.minimumSalary === 'number') {
        $scope.jobAd.minimumSalary = numeral($scope.jobAd.minimumSalary).format('0,0.00');
    };
    if (typeof $scope.jobAd.maximumSalary === 'number') {
        $scope.jobAd.maximumSalary = numeral($scope.jobAd.maximumSalary).format('0,0.00');
    };
    console.log($scope.jobAd);
    $scope.mode = JobAdsService.GetMode();
    $scope.calculateDaysRemaining = function (_date) {
        var oneDay = 24 * 60 * 60 * 1000;	// hours*minutes*seconds*milliseconds
        var todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        var expiryDate = new Date(_date);
        expiryDate.setHours(0, 0, 0, 0);

        var diffDays = Math.abs((expiryDate.getTime() - todayDate.getTime()) / (oneDay));
        return diffDays;
    };
   
    $scope.updateJobAd = function () {
        $scope.jobAd.jobAdID = $rootScope.jobAd._id;
        $scope.jobAd.recruiterUserID = $rootScope.jobAd.userID;
        ModalService.SetTitle('Update JobAd');
        ModalService.SetMessage('Updating job Ad,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/jobAds
        var JobAds = Restangular.all('api/jobAds/updateJobAd');
        JobAds.customPUT($scope.jobAd).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Update JobAd' });
            }

        })
    };
    $scope.updateJobAdAddToExistingOrder = function () {
        $scope.jobAd.jobAdID = $rootScope.jobAd._id;
        $scope.jobAd.recruiterUserID = $rootScope.jobAd.userID;
        JobAdsService.SetJobAd($scope.jobAd);
        JobAdOrderService.SetEdit();
        $state.go('recruiter.ordersAddTo');
    };
    $scope.updateJobAdAddToNewOrder = function () {
        $scope.jobAd.jobAdID = $rootScope.jobAd._id;
        $scope.jobAd.recruiterUserID = $rootScope.jobAd.userID;
        ModalService.SetTitle('Update job Ad & Add to new Order');
        ModalService.SetMessage('Updating job Ad,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        
        var Orders = Restangular.all('api/orders/updateJobAdAddToNewOrder');
        Orders.customPUT($scope.jobAd).then(function (response) {
            if (!response.data.error) {
                $uibModalStack.dismissAll();
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                if (!response.data.error) {
                    $state.go('recruiter.checkOutOrder');
                }
                Notification.success({ message: response.data.message, title: 'Update job Ad & Add to new Order' });
            }

        })
    };
    $scope.updateJobAdAddToCart = function () {
        $scope.jobAd.jobAdID = $rootScope.jobAd._id;
        $scope.jobAd.recruiterUserID = $rootScope.jobAd.userID;
        if (typeof $scope.jobAd.minimumSalary === 'number') {
            $scope.jobAd.minimumSalary = numeral($scope.jobAd.minimumSalary).format('0,0.00');
        };
        if (typeof $scope.jobAd.maximumSalary === 'number') {
            $scope.jobAd.maximumSalary = numeral($scope.jobAd.maximumSalary).format('0,0.00');
        };
        ModalService.SetTitle('Update JobAd');
        ModalService.SetMessage('Updating job Ad,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/jobAds
        var JobAds = Restangular.all('api/jobAds/updateAndAddToCart');
        JobAds.customPUT($scope.jobAd, $scope.jobAd._id).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Update JobAd' });
            }

        })
    };
    
}])