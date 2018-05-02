var adminOrdersModule = angular.module('adminOrdersModule', []);

adminOrdersModule.controller('AdminOrdersController', ['$scope', '$state', 'AdminOrdersService', 'Restangular', '$uibModal', '$uibModalStack', '$timeout', 'Notification', 'ModalService','Auth', function ($scope, $state, AdminOrdersService, Restangular, $uibModal, $uibModalStack, $timeout, Notification, ModalService,Auth) {
    $scope.date = null;
    $scope.dateFrom = null;
    $scope.dateTo = null;
    $scope.orders = AdminOrdersService.GetItems();
    $scope.totalOrders = AdminOrdersService.GetTotalItems();
    $scope.searchByOptions = ['All','OrderID','Paid','Not Paid','Recruiter Company Name','Date','Date Range'];
    $scope.searchBy = AdminOrdersService.GetSearchBy();
    $scope.searchTerm = AdminOrdersService.GetSearchTerm();
    $scope.viewPerPageOptions = [4, 8];
    $scope.ordersPerPage = AdminOrdersService.GetItemsPerPage();
    $scope.clearJobAds = function () {
        $scope.orders = [];
        AdminOrdersService.ClearJobAds();
        $scope.totalOrders = 0;
    };
    $scope.isEmpty = function () {
        for (var prop in $scope.orders) {
            if ($scope.orders.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    $scope.init = function () {
        $scope.searchBy = AdminOrdersService.GetSearchBy();
        $scope.searchTerm = AdminOrdersService.GetSearchTerm();
        $scope.ordersPerPage = AdminOrdersService.GetItemsPerPage();
        $scope.totalOrders = AdminOrdersService.GetTotalItems();
        if (AdminOrdersService.GetBackNav() == 'YES') {
            $scope.getPageBackNav();
        }
    };
    $scope.back = function () {
        window.history.back();
    };
    $scope.pagination = {
        current: AdminOrdersService.GetCurrentPage(),
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
            dateTo: $scope.dateTo
        };
        $scope.getOrders(query);
    };
    $scope.viewOrder = function (_order) {
        AdminOrdersService.SetItem(_order);
        AdminOrdersService.SetCurrentPage($scope.pagination.current);
        AdminOrdersService.SetTotalItems($scope.totalOrders);
        AdminOrdersService.SetBackNav();
        $state.go('admin.order');
    };

    $scope.deleteOrder = function (_order) {
        var order = {
            orderID: _order._id
        };
        ModalService.SetTitle('Delete Order')
        ModalService.SetMessage('Are you sure you want to delete order?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
      modalInstance.result.then(function () {
          $uibModalStack.dismissAll();
          $timeout(function () {
              ModalService.SetTitle('Delete Order')
              ModalService.SetMessage('Deleting order,please wait!');
              var modalInstance = $uibModal.open({
                  templateUrl: 'app/modals/modal.html',
                  controller: 'ModalController'
              });
          }, 500);
        
        
          var Orders = Restangular.all('/api/orders/deleteOrder');
          Orders.customDELETE("", order).then(function (response) {
            if (!response.data.error) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Delete Order' });
                for (var i = 0; i < $scope.orders.length; i++) {
                    if ($scope.orders[i]._id === _order._id) {
                        $scope.orders.splice(i, 1);
                    }
                }
                AdminOrdersService.SetItems($scope.orders);
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
             dateTo: $scope.dateTo
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
             dateTo: $scope.dateTo
         };
         $scope.getOrders(query);
     };
     $scope.getOrders = function (query) {
         //get from api/jobAds/getJobAdsBy
         var Orders = Restangular.all('api/orders/getOrdersBy');
         Orders.getList(query).then(function (response) {
             if (response.data) {
                 $uibModalStack.dismissAll();
                 if (response.data.total == 0) {
                     Notification.error({ message: 'No orders found!', title: 'Order(s) Search' });
                     return
                 };
                 $scope.orders = response.data;
                 AdminOrdersService.SetItems(response.data);
                 $scope.totalOrders = response.data.total;
             };
         })
     };
     $scope.markOrderPaid = function (_order) {
         var order = {
            orderID: _order._id
         };
         var Orders = Restangular.all('api/orders/markOrderPaid');
         Orders.post(order).then(function (response) {
             if (response.data) {
                 $uibModalStack.dismissAll();
                 Notification.success({ message: response.data.message, title: 'Mark Order as Paid' });
                 for (var i = 0; i < $scope.$scope.orders.length; i++) {
                     if ($scope.orders[i]._id === _order._id) {
                         $scope.orders[i].paid = true;
                     }
                 }
                 AdminOrdersService.SetItems($scope.orders);
             };
         })
     }

}])

adminOrdersModule.controller('AdminOrderController', ['$scope', '$timeout', '$uibModal', '$uibModalStack', 'AdminOrdersService', 'ModalService', 'Notification', 'Restangular', function ($scope, $timeout, $uibModal, $uibModalStack, AdminOrdersService, ModalService, Notification, Restangular) {
    $scope.order = AdminOrdersService.GetItem();
    $scope.back = function () {
        window.history.back();
    };
    $scope.markOrderPaid = function () {
        var order = {
            orderID: $scope.order._id
        };
        var Orders = Restangular.all('api/orders/markOrderPaid');
        Orders.post(order).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Mark Order as Paid' });
                $scope.order.paid = true;
                var orders = AdminOrdersService.GetItems();
                for (var i = 0; i < orders.length; i++) {
                    if (orders[i]._id === $scope.order._id) {
                        orders[i].paid = true;
                        AdminOrdersService.SetItems(orders);
                        return
                    }
                }
            };
        })
    }
    $scope.deleteOrder = function () {
        var order = {
            orderID: $scope.order._id
        };
        ModalService.SetTitle('Delete Order')
        ModalService.SetMessage('Are you sure you want to delete order?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            $timeout(function () {
                ModalService.SetTitle('Delete Order')
                ModalService.SetMessage('Deleting order,please wait!');
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/modal.html',
                    controller: 'ModalController'
                });
            }, 500);


            var Orders = Restangular.all('/api/orders/deleteOrder');
            Orders.customDELETE("",order).then(function (response) {
                if (!response.data.error) {
                    $uibModalStack.dismissAll();
                    Notification.success({ message: response.data.message, title: 'Delete Order' });
                    AdminOrdersService.DeleteItem($scope.order);
                    window.history.back();
                }
            })
        });
    };
}])