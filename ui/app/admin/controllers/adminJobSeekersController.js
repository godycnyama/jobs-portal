var adminJobSeekersModule = angular.module('adminJobSeekersModule', []);

adminJobSeekersModule.controller('AdminJobSeekersController', ['$scope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'ModalService', 'AdminJobSeekersService', 'Restangular', 'Notification', function ($scope, $state, $uibModal, $uibModalStack, $timeout, ModalService, AdminJobSeekersService, Restangular, Notification) {
    $scope.jobSeekers = (AdminJobSeekersService.GetItems() != null) ? AdminJobSeekersService.GetItems() : [];
    $scope.date = null,
    $scope.dateFrom = null,
    $scope.dateTo = null,
    $scope.totalJobSeekers = AdminJobSeekersService.GetTotalItems();
    $scope.searchByOptions = ['All','Town', 'Country', 'Skill','Qualification', 'Date', 'Date Range'];
    $scope.searchBy = AdminJobSeekersService.GetSearchBy();
    $scope.searchTerm = AdminJobSeekersService.GetSearchTerm();
    $scope.viewPerPageOptions = [4,8];
    $scope.jobSeekersPerPage = AdminJobSeekersService.GetItemsPerPage();
    $scope.isEmpty = function () {
        for (var prop in $scope.jobSeekers) {
            if ($scope.jobSeekers.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    $scope.init = function () {
        $scope.searchBy = AdminJobSeekersService.GetSearchBy();
        $scope.searchTerm = AdminJobSeekersService.GetSearchTerm();
        $scope.ordersPerPage = AdminJobSeekersService.GetItemsPerPage();
        $scope.totalOrders = AdminJobSeekersService.GetTotalItems();
        if (AdminJobSeekersService.GetBackNav() == 'YES') {
            $scope.getPageBackNav();
        }
    };
    $scope.pagination = {
        current: AdminJobSeekersService.GetCurrentPage(),
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
            perPage: $scope.jobSeekersPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo
        };
        $scope.getJobSeekers(query);
    };
    $scope.getPageBackNav = function () {
        var query = {
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: $scope.pagination.current,
            perPage: $scope.jobSeekersPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo
        };
        $scope.getJobSeekers(query);
    };
    $scope.viewJobSeeker = function (_jobSeeker) {
        AdminJobSeekersService.SetItem(_jobSeeker);
        AdminJobSeekersService.SetCurrentPage($scope.pagination.current);
        AdminJobSeekersService.SetTotalItems($scope.totalJobSeekers);
        $state.go('admin.jobSeeker');
    };
    $scope.deleteJobSeeker = function (_jobSeeker) {
        var jobSeeker = {
            email: _jobSeeker.email
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
            

            var JobSeekers = Restangular.one('/api/jobSeekers/deleteJobSeeker');
            JobSeekers.customDELETE('', jobSeeker).then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    Notification.success({ message: response.data.message, title: 'Delete Job Seeker' });
                    $timeout(function () {
                        AdminJobSeekersService.DeleteItem(_jobSeeker);
                        for (var i = 0; i < $scope.jobSeekers.length; i++) {
                            if ($scope.jobSeekers[i]._id === _jobSeeker._id) {
                                return $scope.jobSeekers.splice(i, 1);
                            }
                        }
                    }, 500);
                    
                }
            })
        });
    };
    $scope.searchJobSeekers = function () {
        ModalService.SetTitle('JobSeeker(s) Search')
        ModalService.SetMessage('Searching job Seekers(s),please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        var query = {
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: 1,
            perPage: $scope.jobSeekersPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo
        };
        $scope.getJobSeekers(query);

    };
    $scope.getJobSeekers = function (query) {

        //get from api/jobSeekers/getJobSeekersBy
        var JobSeekers = Restangular.all('api/jobSeekers/getJobSeekersBy');
        JobSeekers.getList(query).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                if (response.data.total == 0) {
                    Notification.error({ message: 'No job seekers found!', title: 'JobSeeker(s) Search' });
                    return;
                };
                $scope.jobSeekers = response.data;
                AdminJobSeekersService.SetItems(response.data);
                $scope.totalJobSeekers = response.data.total;              
            };
        })
    }
}])