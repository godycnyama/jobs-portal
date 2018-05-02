var recruiterOrdersModule = angular.module('recruiterOrdersModule', []);

recruiterOrdersModule.controller('RecruiterOrdersController', ['$scope', '$rootScope', '$state', 'AdminService', 'Restangular', '$uibModal', '$uibModalStack', '$timeout', 'ModalService', 'Auth', 'MasterDetailService', 'Notification','store', function ($scope, $rootScope, $state, AdminService, Restangular, $uibModal, $uibModalStack, $timeout, ModalService, Auth, MasterDetailService, Notification,store) {
    $scope.orders = (MasterDetailService.GetItems() !== null) ? MasterDetailService.GetItems() : [];
    $scope.searchBy = MasterDetailService.GetSearchBy();
    $scope.searchTerm = MasterDetailService.GetSearchTerm();
    $scope.totalOrders = MasterDetailService.GetTotalItems();
    $scope.ordersPerPage = MasterDetailService.GetItemsPerPage();
    $scope.back = function () {
        window.history.back();
    };
    $scope.isEmpty = function () {
        for (var prop in $scope.orders) {
            if ($scope.orders.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    $scope.clearOrders = function () {
        $scope.orders = [];
        MasterDetailService.ClearItems();
        $scope.totalOrders = 0;
    };
    $scope.init = function () {
        $scope.searchBy = MasterDetailService.GetSearchBy();
        $scope.searchTerm = MasterDetailService.GetSearchTerm();
        $scope.ordersPerPage = MasterDetailService.GetItemsPerPage();
        $scope.totalOrders = MasterDetailService.GetTotalItems();
        if (MasterDetailService.GetBackNav() == 'YES') {
            $scope.getPageBackNav();
        }
    }
    $scope.date = null;
    $scope.dateFrom = null;
    $scope.dateTo = null;
    $scope.searchByOptions = ['All','Paid','Not Paid','Date','Date Range']; //add 'Job Ads Order','Search Orders'
    $scope.viewPerPageOptions = [4,8];
    $scope.pagination = {
        current: MasterDetailService.GetCurrentPage(),
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
            perPage: $scope.ordersPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo,
            recruiterUserID: Auth.GetUserID()
        };
        $scope.getOrders(query);
    };
    $scope.viewOrder = function (_order) {
        MasterDetailService.SetCurrentPage($scope.pagination.current);
        MasterDetailService.SetItem(_order);
        MasterDetailService.SetBackNav();
        $state.go('recruiter.order');
    };
    $scope.proceedCheckOut = function (_order) {
        var order = {
            orderID: _order._id
        }

        var Orders = Restangular.all('api/orders/proceedToCheckout');
        Orders.post(order).then(function (response) {
            if (response.data) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                MasterDetailService.SetCurrentPage($scope.pagination.current);
                $state.go('recruiter.checkOutOrder');
            }

        }, function (response) {
            if (response.data.error) {
                $uibModalStack.dismissAll();
                Notification.error({ message: response.data.message, title: 'Proceed to Checkout' });
            }

        })
    };
    $scope.deleteOrder = function (_order) {
        var order = {
            orderID: _order._id,
            recruiterUserID: Auth.GetUserID()
        };
        ModalService.SetTitle('Delete Order')
        ModalService.SetMessage('Are you sure you want to delete order?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
      modalInstance.result.then(function () {
          $uibModalStack.dismissAll();
          ModalService.SetTitle('Delete Order')
          ModalService.SetMessage('Deleting order,please wait!');
          var modalInstance = $uibModal.open({
              templateUrl: 'app/modals/modal.html',
              controller: 'ModalController'
          });
          
        
        
          var Orders = Restangular.all('/api/orders/deleteOrderRecruiter');
        Orders.post(order).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Delete Order' });
                for (i = 0; i < $scope.orders.length; i++) {
                    if ($scope.orders[i]._id === _order._id) {
                        return $scope.orders.splice(i, 1);
                    }
                }     
            }
         })
        });
     };
     $scope.searchOrders = function () {
         ModalService.SetTitle('Order(s) Search')
         ModalService.SetMessage('Searching  for order(s),please wait!');
         var modalInstance = $uibModal.open({
             templateUrl: 'app/modals/modal.html',
             controller: 'ModalController'
         });
         var query = {
             searchBy: $scope.searchBy,
             searchTerm: $scope.searchTerm,
             pageNo: 1,
             perPage: $scope.ordersPerPage,
             date: $scope.date,
             dateFrom: $scope.dateFrom,
             dateTo: $scope.dateTo,
             recruiterUserID: Auth.GetUserID()
         };
         $scope.getOrders(query);

     };
     $scope.getPageBackNav = function () {
         var query = {
             searchBy: $scope.searchBy,
             searchTerm: $scope.searchTerm,
             pageNo: $scope.pagination.current,
             perPage: $scope.ordersPerPage,
             date: $scope.date,
             dateFrom: $scope.dateFrom,
             dateTo: $scope.dateTo,
             recruiterUserID: Auth.GetUserID()
         };
         $scope.getOrders(query);
     };
     $scope.getOrders = function (query) {
         MasterDetailService.SetSearchBy($scope.searchBy);
         MasterDetailService.SetSearchTerm($scope.searchTerm);
         MasterDetailService.SetItemsPerPage($scope.ordersPerPage);
         //get from api/jobAds/getJobAdsBy
         var Orders = Restangular.all('api/orders/getRecruiterOrdersBy');
         Orders.getList(query).then(function (response) {
             if (response) {
                 $uibModalStack.dismissAll();
                 if (response.data.total == 0) {
                     Notification.error({ message: 'No orders matching your search criteria found!', title: 'Order(s) Search' });
                     return
                 };             
                 $scope.orders = response.data;
                 $scope.totalOrders = response.data.total;
             };
         })
     };

     $scope.createOrder = function () {
         var recruiterDetails = {
             recruiterUserID: Auth.GetUserID()
         };
         ModalService.SetTitle('Create job ads order');
         ModalService.SetMessage('Creating order,please wait!');
         var modalInstance = $uibModal.open({
             templateUrl: 'app/modals/modal.html',
             controller: 'ModalController'
         });
         
         var Orders = Restangular.all('api/orders/createJobAdOrder');
         Orders.post(recruiterDetails).then(function (response) {
             if (response.data) {
                 $uibModalStack.dismissAll();
                 Notification.success({ message: response.data.message, title: 'Create JobAd Order' });
                 MasterDetailService.SetItem(response.data.order);
                 MasterDetailService.SetCurrentPage($scope.pagination.current);
                 $state.go('recruiter.order');
             }

         }, function (response) {
             if (response.data.error) {
                 $uibModalStack.dismissAll();
                 Notification.error({ message: response.data.message, title: 'Create JobAd Order' });        
             }

         })
     };

}])

recruiterOrdersModule.controller('RecruiterOrderController', ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', 'MasterDetailService', 'Notification', 'ModalService', 'Restangular','store','Auth', function ($scope, $rootScope, $state, $uibModal, $uibModalStack, MasterDetailService, Notification, ModalService, Restangular,store,Auth) {
    $scope.order = MasterDetailService.GetItem();
    $scope.proceedCheckOut = function () {
        if ($scope.order.orderDetails.length === 0) {
            Notification.error({ message: 'No job ads on this order!', title: 'Proceed to Checkout' });
            return;
        }
        var order = {
            orderID: $scope.order._id,
        }
        
        var Orders = Restangular.all('api/orders/proceedToCheckout');
        Orders.post(order).then(function (response) {
            if (response.data) {
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                $state.go('recruiter.checkOutOrder');
            }

        })
    };
    $scope.back = function () {
        window.history.back();
    };
    $scope.removeJobAd = function (_jobAd) {
        var query = {
            orderID: $scope.order._id,
            jobAdID: _jobAd.jobAdID
        };
        ModalService.SetTitle('Remove Job Ad');
        ModalService.SetMessage('Removing job Ad,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post 
        var Orders = Restangular.all('api/orders');
        Orders.customDELETE('deleteExistingJobAdFromExistingOrder', query).then(function (response) {
            if (response.data) {
                $scope.order = response.data.order;   
                store.set('cart', response.data.order);
                store.set('getString', response.data.getString);
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Delete Order Item' });    
            }

        })
    };

    $scope.deleteOrder = function () {
        var order = {
            orderID: $scope.order._id,
            recruiterUserID: Auth.GetUserID()
        };
        ModalService.SetTitle('Delete Order')
        ModalService.SetMessage('Are you sure you want to delete order?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetTitle('Delete Order')
            ModalService.SetMessage('Deleting order,please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });



            var Orders = Restangular.all('/api/orders/deleteOrderRecruiter');
            Orders.post(order).then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    Notification.success({ message: response.data.message, title: 'Delete Order' });
                    for (i = 0; i < $scope.orders.length; i++) {
                        if ($scope.orders[i]._id === _order._id) {
                            return $scope.orders.splice(i, 1);
                        }
                    }
                }
            })
        });
    };
}])