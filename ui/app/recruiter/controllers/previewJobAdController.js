var previewJobAdModule = angular.module('previewJobAdModule', []);

previewJobAdModule.controller('PreviewJobAdController', ['$scope', '$rootScope', '$state', '$timeout', 'Restangular', '$uibModal', '$uibModalStack', 'ModalService', 'JobAdsService', 'Auth', 'JobAdOrderService', 'Notification', 'store', 'RecruiterService', function ($scope, $rootScope, $state, $timeout, Restangular, $uibModal, $uibModalStack, ModalService, JobAdsService, Auth, JobAdOrderService, Notification, store, RecruiterService) {
    $scope.recruiter = RecruiterService.GetRecruiter();
    $scope.today_date = Date.now();
    $scope.message = '';
    $scope.addQuestionnaire = false;
    $scope.jobAd = JobAdsService.GetJobAd();
    if (typeof $scope.jobAd.minimumSalary === 'number') {
        $scope.jobAd.minimumSalary = numeral($scope.jobAd.minimumSalary).format('0,0.00');
    };
    if (typeof $scope.jobAd.maximumSalary === 'number') {
        $scope.jobAd.maximumSalary = numeral($scope.jobAd.maximumSalary).format('0,0.00');
    };
    $scope.mode = JobAdsService.GetMode();
    $scope.editJobAd = function () {
        //JobAdsService.SetEdit();
        $state.go('recruiter.editJobAd');
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
    $scope.createJobAd = function () {
        ModalService.SetTitle('Create JobAd');
        ModalService.SetMessage('Creating job Ad,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/jobAds
        var JobAds = Restangular.all('api/jobAds');
        JobAds.post($scope.jobAd).then(function (response) {
            if (response.data) {
                //$state.go('recruiter.details');
                $uibModalStack.dismissAll();
                if (JobAdsService.GetCopy()) {
                    JobAdsService.ReSetCopy();
                };
                Notification.success({ message: response.data.message, title: 'Create JobAd' });
            }

        })
    };
    $scope.createJobAdAddToExistingOrder = function () {
        JobAdOrderService.SetCreate();
        $state.go('recruiter.ordersAddTo');
    };
    $scope.createJobAdAddToNewOrder = function () {
        ModalService.SetTitle('Create JobAd');
        ModalService.SetMessage('Creating job Ad,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/jobAds
        var JobAds = Restangular.all('api/orders/createJobAdAddToNewOrder');
        JobAds.post($scope.jobAd).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                $state.go('recruiter.checkOutOrder');
                Notification.success({ message: response.data.message, title: 'Create JobAd' });
            }

        })
    };
    $scope.updateJobAd = function () {
        ModalService.SetTitle('Update JobAd');
        ModalService.SetMessage('Updating job Ad,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/jobAds
        var JobAds = Restangular.all('api/jobAds');
        JobAds.customPUT($scope.jobAd, $scope.jobAd._id).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Update JobAd' });
            }

        })
    };
    $scope.updateJobAdAddToCart = function () {
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
    $scope.back = function () {
        window.history.back();
    }
}])