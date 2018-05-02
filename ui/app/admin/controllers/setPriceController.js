'use strict'

var setPriceModule = angular.module('setPriceModule', []);

setPriceModule.controller('SetPriceController', ['$scope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'ModalService', function ($scope, $state, $uibModal, $uibModalStack, $timeout, Restangular, ModalService) {
    $scope.categories = ['Job Ad','CV Search']
    $scope.item = {};
    $scope.item.itemCode = "";
    $scope.item.description = "";
    $scope.item.category = "";
    $scope.item.minimumJobAds = "";
    $scope.item.maximumJobAds = "";
    $scope.item.unitPrice = "";
    $scope.save = function () {
        ModalService.SetTitle('Add Item Price')
        ModalService.SetMessage('Adding item price,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //post  to /items
        var Items = Restangular.all('api/items');
        Items.post($scope.item).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                $timeout(function () {
                    ModalService.SetMessage(response.data.message);
                    ModalService.SetTitle('Add Item Price');
                    var modalInstance = $uibModal.open({
                        templateUrl: 'app/modals/messageModal.html',
                        controller: 'ModalController'
                    });
                    modalInstance.result.then(function () {
                        $state.go('admin.prices');
                    });
                }, 500);             
            }

        }, function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                $timeout(function () {
                    ModalService.SetMessage(response.data.message);
                    ModalService.SetTitle('Add Item Price');
                    var modalInstance = $uibModal.open({
                        templateUrl: 'app/modals/messageModal.html',
                        controller: 'ModalController'
                    });
                }, 500);
                
            }

        })
    };

}])