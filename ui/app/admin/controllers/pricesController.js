var pricesModule = angular.module('pricesModule', []);

pricesModule.controller('PricesController', ['$scope','$rootScope','$state' ,'$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'AdminService', 'ModalService','Notification', function ($scope,$rootScope,$state, $uibModal, $uibModalStack, $timeout, Restangular, AdminService, ModalService,Notification) {
    $scope.items = typeof $rootScope.items !== 'undefined' ? $rootScope.items : [];
    $scope.isEmpty = function () {
        for (var prop in $scope.items) {
            if ($scope.items.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    $scope.init = function () {
        $scope.getPrices();
    };
    $scope.getPrices = function () {
        ModalService.SetTitle('Get Prices')
        ModalService.SetMessage('Searching for prices,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        
        var Items = Restangular.all('api/items');
        Items.getList().then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                if (response.data.total == 0) {
                    Notification.error({ message: 'No prices found!', title: 'Get Prices' });
                    return
                };
                $scope.items = response.data;
                $rootScope.items = response.data;
            };
        })
    }
    $scope.editItem = function (_item) {
        AdminService.SetItem(_item);
        $state.go('admin.editPrice');
    };
    $scope.deleteItem = function (_item) {
        var item = {
            itemID: _item._id
        };
        ModalService.SetTitle('Delete Item')
        ModalService.SetMessage('Are you sure you want to delete item?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            $timeout(function () {
                ModalService.SetTitle('Delete Item')
                ModalService.SetMessage('Deleting item,please wait!');
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/modal.html',
                    controller: 'ModalController'
                });
            }, 500);


            var Items = Restangular.all('api/items');
            Items.customDELETE("",item).then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    Notification.success({ message: response.data.message, title: 'Delete Price' });
                    for (i = 0; i < $scope.items.length; i++) {
                        if ($scope.items[i]._id === _item._id) {
                            return $scope.items.splice(i, 1);
                        }
                    }
                }
            })
        });
    };
}])