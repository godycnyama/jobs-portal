var editPriceModule = angular.module('editPriceModule', []);

editPriceModule.controller('EditPriceController', ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'AdminService', 'ModalService', function ($scope, $rootScope, $state, $uibModal, $uibModalStack, $timeout, Restangular, AdminService, ModalService) {
    $scope.categories = ['Job Ad', 'CV Search']; 
    $scope.item = AdminService.GetItem();
    $scope.unitPrice = $scope.item.unitPrice;
    $scope.update = function () {
        var item = {
            itemID: $scope.item._id,
            itemCode: $scope.item.itemCode,
            description: $scope.item.description,
            category: $scope.item.category,
            minimumJobAds: $scope.item.minimumJobAds,
            maximumJobAds: $scope.item.maximumJobAds,
            unitPrice: numeral().unformat($scope.unitPrice)
        }
        ModalService.SetTitle('Update Item Price')
        ModalService.SetMessage('Updating item price,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        ///put  to /items
        var Items = Restangular.all('api/items');
        Items.customPUT(item).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                $timeout(function () {
                    ModalService.SetMessage(response.data.message);
                    ModalService.SetTitle('Update Item Price');
                    var modalInstance = $uibModal.open({
                        templateUrl: 'app/modals/messageModal.html',
                        controller: 'ModalController'
                    });
                }, 500);
                
                modalInstance.result.then(function () {
                    $state.go('admin.prices');
                });
            }

        }, function (response) {
            if (response.data.error) {
                $uibModalStack.dismissAll();
                $timeout(function () {
                    ModalService.SetMessage(response.data.message);
                    ModalService.SetTitle('Update Item Price');
                    var modalInstance = $uibModal.open({
                        templateUrl: 'app/modals/messageModal.html',
                        controller: 'ModalController'
                    });
                }, 500);
                
            }

        })
    };

}])