var adminUsersModule = angular.module('adminUsersModule', []);

adminUsersModule.controller('AdminUsersController', ['$scope', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'AdminService', 'ModalService', 'Notification', function ($scope, $uibModal, $uibModalStack, $timeout, Restangular, AdminService, ModalService, Notification) {
    $scope.date = null,
    $scope.dateFrom = null,
    $scope.dateTo = null,
    $scope.users = []; // AdminService.GetUsers();
    $scope.totalUsers = 0;
    $scope.max_size = 3;
    $scope.searchByOptions = ['All', 'UserID', 'Email', 'Date', 'Date Range'];
    $scope.searchBy = $scope.searchByOptions[0];
    $scope.searchTerm = 'All ';
    $scope.viewPerPageOptions = [4, 8];
    $scope.usersPerPage = $scope.viewPerPageOptions[0];
    $scope.isEmpty = function () {
        for (var prop in $scope.users) {
            if ($scope.users.hasOwnProperty(prop))
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
    /*
    $scope.$watch("searchBy", function (newValue, oldValue) {
        $scope.getPage();
    });
    */
   
    $scope.getPage = function (newPage) {
        var query = {
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: newPage,
            perPage: $scope.usersPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo
        };
        $scope.getUsers(query);
    };
    $scope.viewUser = function (_user) {
        AdminService.SetUser(_user);
        $state.go('admin.viewRecruiter');
    };

    $scope.deleteUser = function (_user) {
        var user = {
            userID: _user._id,
            role: _user.role
        }
        ModalService.SetTitle('Delete User')
        ModalService.SetMessage('Are you sure you want to delete user?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
      modalInstance.result.then(function () {
          $uibModalStack.dismissAll();
          $timeout(function () {
              ModalService.SetTitle('Delete User')
              ModalService.SetMessage('Deleting user,please wait!');
              var modalInstance = $uibModal.open({
                  templateUrl: 'app/modals/modal.html',
                  controller: 'ModalController'
              });
          }, 500);
       
        
        var Users = Restangular.all('/api/users/deleteUser');
        Users.customDELETE("",user).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                $timeout(function () {
                    for (i = 0; i < $scope.users.length; i++) {
                        if ($scope.users[i].email === _user.email) {
                            return $scope.users.splice(i, 1);
                        }
                    }
                }, 500);
                Notification.success({ message: response.data.message, title: 'Delete User' });
                
            }
         })
        });
    };

    $scope.searchUsers = function () {
        ModalService.SetTitle('User(s) Search')
        ModalService.SetMessage('Searching user(s),please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        var query = {
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: 1,
            perPage: $scope.usersPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo
        };
        $scope.getUsers(query);    
    };
    $scope.getUsers = function(query) {
        
        //get from /api/users/getUsersBy
        var Users = Restangular.all('api/users/getUsersBy');
        Users.getList(query).then(function (response) {
            if (response) {
                $uibModalStack.dismissAll();
                $timeout(function () {
                }, 500);
                if (response.data.total == 0) {
                    Notification.error({ message: 'No users found!', title: 'User(s) Search' });
                };     
                $scope.users = response.data;
                $scope.totalUsers = response.data.total;             
            };
        })
    }
}])

