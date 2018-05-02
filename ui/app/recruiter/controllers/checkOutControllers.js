var checkOutModule = angular.module('checkOutModule', []);

checkOutModule.controller('CheckOutOrderController', ['$scope', '$rootScope', '$state', '$window', '$timeout', '$uibModal', '$uibModalStack', 'store', 'CartService', 'Restangular', 'SocketIO', 'ModalService', 'Auth', 'Notification', function ($scope, $rootScope, $state, $window, $timeout, $uibModal, $uibModalStack, store, CartService, Restangular, SocketIO, ModalService, Auth, Notification) {
    //store.set('cart', $rootScope.cart);
    //store.set('getString', $rootScope.getString);
    //console.log($rootScope.getString);
    $scope.back = function () {
        window.history.back();
    };
    $scope.message = '';
    $scope.cartItemsTotal = CartService.GetCartItemsTotal();
    $scope.cartTotalAmount = CartService.GetCartTotalAmount();

    $scope.order = {};
    $scope.addJobAd = function () {
        $state.go('recruiter.jobAdsMaster');
    };
    $scope.cart = store.get('cart');
    $scope.getString = store.get('getString');
    $scope.removeItem = function (index) {
        CartService.RemoveFromCart(index);
    };
    $scope.deleteItem = function (_jobAd) {
        var query = {
            orderID: $scope.cart._id,
            jobAdID: _jobAd.jobAdID
        };
        ModalService.SetTitle('Delete Order Item');
        ModalService.SetMessage('Deleting order item,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post 
        var Orders = Restangular.all('api/orders');
        Orders.customDELETE('deleteExistingJobAdFromExistingOrder',query).then(function (response) {
            if (response.data) {
                store.set('cart', response.data.order);
                $scope.cart = response.data.order;
                store.set('getString', response.data.getString);
                $uibModalStack.dismissAll();             
                Notification.success({ message: response.data.message, title: 'Delete Order Item' });
            }

        })
    };

    $scope.clearOrder = function () {
        var order = {
            orderID: $scope.cart._id,
            recruiterUserID: Auth.GetUserID()
        }
        ModalService.SetTitle('Clear Cart');
        ModalService.SetMessage('Clearing cart,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });

        var Orders = Restangular.all('api/orders/clearOrder');
        Orders.post(order).then(function (response) {
            if (response.data) {
                store.set('cart', response.data.order);
                $scope.cart = response.data.order;
                store.set('getString', response.data.getString);
                $uibModalStack.dismissAll();
            }

        })
    };
    
    $scope.clearCart = function () {
        $rootScope.cart = null;
        $scope.cart = null;
        $rootScope.getString = null;
        $scope.getString = null;
       // CartService.ClearCart();
    };
    $scope.pay = function () {    
        var site = "https://www.payfast.co.za/eng/process?";
        $window.location.href = site + store.get('getString');    
    };
}]);

checkOutModule.controller('CheckOutSearchOrderController', ['$scope', '$state', 'CartService', 'Restangular', 'SocketIO','store', function ($scope, $state, CartService, Restangular, SocketIO,store) {
   // $scope.order = CartService.GetSearchOrder();
    //$scope.edit = function () {
    //    CartService.SetSearchOrderEdit();
    //    $state.go('recruiters.searchOrderEdit');
    //};
    //$scope.order = {};
    $scope.pay = function () {
        //var order = CartService.GetOrder();
        //var getString = CartService.GetGetString();
        //var site = "https://www.payfast.co.za/eng/process?"
        //+ getString
        var site = "https://www.payfast.co.za/eng/process?";
        $window.location.href = site + $rootScope.getString;
        /*
        SocketIO.emit('pay', { orderID: 1}, function (data) {
            if (data.code === 200) {
                console.log(data.code);
                $window.open(site,'_blank');
            }
        });
        */
    };
    $scope.paymentNotify = function () {
        var Orders = Restangular.all('api/orders/paymentNotify');
        Orders.post({orderID: 1}).then(function (response) {

        })
    }
}]);

checkOutModule.controller('OrderSuccessController', ['$scope', '$rootScope', '$state', '$timeout', 'CartService', 'Restangular', 'SocketIO','store', function ($scope, $rootScope, $state, $timeout, CartService, Restangular, SocketIO,store) {
    $scope.cart = store.get('cart');  
}])