var jobAdsModule = angular.module('jobAdsModule', []);

jobAdsModule.controller('JobAdsController', ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'JobAdsService', 'Restangular', 'ModalService', 'CartService', 'Auth', 'JobAdOrderService', 'Notification','store', function ($scope, $rootScope, $state, $uibModal, $uibModalStack, $timeout, JobAdsService, Restangular, ModalService, CartService, Auth, JobAdOrderService, Notification,store) {
    $scope.jobAds = [];
    console.log(JobAdsService.GetBackNav());
    console.log(JobAdsService.GetJobAds());
    //$scope.mode = true;
    $scope.orderBy = '-createdOn';
    $scope.cart = store.get('cart');
    $scope.back = function () {
        window.history.back();
    };
    $scope.clearJobAds = function () {
        $scope.jobAds = [];
        JobAdsService.ClearJobAds();
        $scope.totalJobAds = 0;
    };
    $scope.searchByOptions = ['All','JobREF', 'Job Title', 'Date', 'Date Range', 'Paid', 'Not Paid', 'Closed', 'Open']; 
    $scope.viewPerPageOptions = [4, 8];
    $scope.init = function () {
        $scope.searchBy = JobAdsService.GetSearchBy();
        $scope.searchTerm = JobAdsService.GetSearchTerm();
        $scope.jobAdsPerPage = JobAdsService.GetItemsPerPage();
        $scope.totalJobAds = JobAdsService.GetTotalItems();
        if (JobAdsService.GetBackNav() == 'YES') {
            $scope.getPageBackNav();
        }
    }
    $scope.pagination = {
        current: JobAdsService.GetCurrentPage(),
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
        $scope.jobAd.closingDate = new Date();
    };
    $scope.clear = function () {
        $scope.jobAd.closingDate = null;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.openFromDatePicker = function ($event) {
        $scope.fromDatePickerOpened = true;
    };

    $scope.setDate_from = function (year, month, day) {
        $scope.dateFrom = new Date(year, month, day);
    };
    $scope.todayDate_from = function () {
        $scope.dateFrom = new Date();
    };
    $scope.clearDate_from = function () {
        $scope.dateFrom = null;
    };
    $scope.openToDatePicker = function ($event) {
        $scope.toDatePickerOpened = true;
    };
    $scope.setDateTo = function (year, month, day) {
        $scope.dateTo = new Date(year, month, day);
    };
    $scope.todayDate_to = function () {
        $scope.dateTo = new Date();
    };
    $scope.clearDate_to = function () {
        $scope.dateTo = null;
    };
    $scope.createJobAd = function () {
        JobAdsService.SetCreate();
        JobAdsService.ReSetCopy();
        JobAdsService.SetCurrentPage($scope.pagination.current);
        JobAdsService.SetBackNav();
        $state.go('recruiter.createJobAd');
    };
    $scope.copyCreateNewJobAd = function (_jobAd) {
        JobAdsService.SetCopy();
        JobAdsService.SetJobAd(_jobAd);
        JobAdsService.SetCurrentPage($scope.pagination.current);
        JobAdsService.SetBackNav();
        $state.go('recruiter.createJobAd')
    };
    $scope.viewJobAd = function (_jobAd) {
        JobAdsService.SetJobAd(_jobAd);
        JobAdsService.SetCurrentPage($scope.pagination.current);
        $rootScope.jobAd = _jobAd;
        JobAdsService.SetBackNav();
        $state.go('recruiter.viewJobAd');
    };
    $scope.editJobAd = function (_jobAd) {
        JobAdsService.SetJobAd(_jobAd);
        JobAdsService.SetCurrentPage($scope.pagination.current);
        $rootScope.jobAd = _jobAd;
        JobAdsService.SetBackNav();
        $state.go('recruiter.editJobAd');
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
    $scope.addToCart = function (_jobAd) {
        var cart = store.get('cart');
        if (cart === null) {
            Notification.error({ message: 'No current cart/order!', title: 'Add job ad to cart/current order' });
            return;
        };

        var jobAd = {
            orderID: cart._id,
            jobAdID: _jobAd._id,
            jobTitle: _jobAd.jobTitle,
            jobREF: _jobAd.jobREF,
        };
        ModalService.SetTitle('Add job ad to cart/current order');
        ModalService.SetMessage('Adding job Ad,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        
        var Orders = Restangular.all('api/orders/addExistingJobAdToExistingOrder');
        Orders.post(jobAd).then(function (response) {
            if (response.data) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                if (!response.data.error) {
                    JobAdsService.SetCurrentPage($scope.pagination.current);
                    JobAdsService.SetBackNav();
                    $state.go('recruiter.checkOutOrder');
                };   
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Add job ad to cart/current order' });
            }

        })
    };
    $scope.addToNewOrder = function (_jobAd) {
        var jobAd = {
            jobAdID: _jobAd._id,
            jobREF: _jobAd.jobREF,
            jobTitle: _jobAd.jobTitle,
            recruiterUserID: Auth.GetUserID()
        };

        ModalService.SetTitle('Add to new Order');
        ModalService.SetMessage('Adding job Ad to new order,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to api/jobAds
        var Orders = Restangular.all('api/orders/addExistingJobAdAddToNewOrder');
        Orders.post(jobAd).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                if (!response.data.error) {
                    JobAdsService.SetCurrentPage($scope.pagination.current);
                    JobAdsService.SetBackNav();
                    $state.go('recruiter.checkOutOrder');
                };
                Notification.success({ message: response.data.message, title: 'Add to new Order' });
            }

        })
    };
    $scope.addToExistingOrder = function (_jobAd) {
        JobAdsService.SetJobAd(_jobAd);
        JobAdOrderService.ResetCreate();
        JobAdsService.SetCurrentPage($scope.pagination.current);
        JobAdsService.SetBackNav();
        $state.go('recruiter.ordersAddTo');
    };
    $scope.getJobs = function () {
        $scope.jobAds = JobAdsService.GetJobAds();
    };   
    $scope.deleteJobAd = function (_jobAd) {
        ModalService.SetTitle('Delete Job Ad')
        ModalService.SetMessage('Are you sure you want to delete job ad?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetTitle('Delete Job Ad')
            ModalService.SetMessage('Deleting jobAd,please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            var jobAd = {
                jobAdID: _jobAd._id,
                recruiterUserID: Auth.GetUserID()
            };
            var JobAds = Restangular.all('api/jobAds/deleteJobAdByIDRecruiter');
            JobAds.post(jobAd).then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    JobAdsService.DeleteJobAd(_jobAd);
                    Notification.success({ message: response.data.message, title: 'Delete Job Ad' });
                }
            })
        });
    };
    $scope.getPage = function (newPage) {
        var query = {
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: newPage,
            perPage: $scope.jobAdsPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo,
            recruiterUserID: Auth.GetUserID()
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
            dateTo: $scope.dateTo,
            recruiterUserID: Auth.GetUserID()
        };
        $scope.getJobAds(query);
    };
    $scope.searchJobAds = function () {
        ModalService.SetTitle('Job Ad(s) Search')
        ModalService.SetMessage('Searching for job ad(s),please wait!');
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
            dateTo: $scope.dateTo,
            recruiterUserID: Auth.GetUserID()
        };
        $scope.getJobAds(query);

    };
    $scope.getJobAds = function (query) {
        JobAdsService.SetSearchTerm($scope.searchTerm);
        JobAdsService.SetSearchBy($scope.searchBy);
        //get from /api/jobAds/getJobAdsBy
        var JobAds = Restangular.all('api/jobAds/getRecruiterJobAdsBy');
        JobAds.getList(query).then(function (response) {
            if (response) {
                $uibModalStack.dismissAll();
                if (response.data.total == 0) {
                    Notification.error({ message: 'No job Ads matching your search criteria found!', title: 'Job Ad(s) Search' });
                };              
                $scope.jobAds = response.data;
                JobAdsService.SetJobAds(response.data);
                $scope.totalJobAds = response.data.total;
                JobAdsService.SetTotalItems(response.data.total);
                JobAdsService.ReSetBackNav();
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
            jobAdID: _jobAd._id,
            recruiterUserID: Auth.GetUserID()
        };
        //get from /api/jobAds/closeJobAd
        var JobAds = Restangular.all('api/jobAds/closeJobAdRecruiter');
        JobAds.post(jobAd).then(function (response) {
            if (response) {
                JobAdsService.CloseJobAd(_jobAd);
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Close Job Ad' });          
            };
        })
    }
}])