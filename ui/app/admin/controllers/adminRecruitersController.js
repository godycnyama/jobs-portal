var adminRecruitersModule = angular.module('adminRecruitersModule', []);

adminRecruitersModule.controller('AdminRecruitersController', ['$scope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'ModalService', 'Notification', 'AdminRecruitersService', function ($scope, $state, $uibModal, $uibModalStack, $timeout, Restangular, ModalService, Notification, AdminRecruitersService) {
    $scope.date = null,
    $scope.dateFrom = null,
    $scope.dateTo = null,
    $scope.recruiters = [];//AdminRecruitersService.GetItems();
    $scope.totalRecruiters = 0;
    $scope.searchByOptions = ['All', 'RecruiterID', 'Company Name', 'Date', 'Date Range'];
    $scope.searchBy = $scope.searchByOptions[0];
    $scope.searchTerm = 'All';
    $scope.viewPerPageOptions = [4, 8];
    $scope.recruitersPerPage = $scope.viewPerPageOptions[0];
    $scope.isEmpty = function () {
        for (var prop in $scope.recruiters) {
            if ($scope.recruiters.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    $scope.pagination = {
        current: 1,
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
            perPage: $scope.recruitersPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo
        };
        $scope.getRecruiters(query);
    };
    $scope.viewRecruiter = function (_recruiter) {
        AdminRecruitersService.SetItem(_recruiter);
        $state.go('admin.viewRecruiter');
    };
    $scope.deleteRecruiter = function (_recruiter) {
        var recruiter = {
            recruiterID: _recruiter._id
        };
        ModalService.SetTitle('Delete Recruiter')
        ModalService.SetMessage('Are you sure you want to delete recruiter?');
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
           

            var Recruiters = Restangular.all('/api/recruiters/deleteRecruiter');
            Recruiters.customDELETE("", recruiter).then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    $timeout(function () {
                        for (var i = 0; i < $scope.recruiters.length; i++) {
                            if ($scope.recruiters[i].email === _recruiter.email) {
                                $scope.recruiters.splice(i, 1);
                            }
                        }
                    }, 500);
                    AdminRecruitersService.SetItems($scope.recruiters);
                    Notification.success({ message: response.data.message, title: 'Delete Recruiter' });
                    
                }
            })
        });
    };

    $scope.searchRecruiters = function () {
        ModalService.SetTitle('Recruiter(s) Search')
        ModalService.SetMessage('Searching for recruiter(s),please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        var query = {
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: 1,
            perPage: $scope.recruitersPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo
        };
        $scope.getRecruiters(query);

    };
    $scope.getRecruiters = function (query) {

        //get from /api/recruiters/getRecruitersBy
        var Recruiters = Restangular.all('/api/recruiters/getRecruitersBy');
        Recruiters.getList(query).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                $timeout(function () {
                }, 500);
                if (response.data.total == 0) {
                    Notification.error({ message: 'No recruiters found!', title: 'Recruiter(s) Search' });
                    return
                };
                $scope.recruiters = response.data;
                $scope.totalJobAds = response.data.total;
                AdminRecruitersService.SetItems(response.data);          
            }
        })
    }
}])