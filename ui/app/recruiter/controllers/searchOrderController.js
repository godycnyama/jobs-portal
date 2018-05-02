var searchOrderModule = angular.module('searchOrderModule', []);

searchOrderModule.controller('SearchOrderController', ['$scope', '$state', 'Restangular', 'ModalService', 'CartService', 'Notification', function ($scope, $state, Restangular, ModalService, CartService, Notification) {
    $scope.searchOrder = CartService.GetSearchOrderMode() === true ? { months: 1 } : CartService.GetSearchOrder;
    $scope.monthsOptions = [1,2,3,4,5,6,7,8,9,10]
    $scope.createSearchOrder = function () {
        $scope.createQualification = function () {
            ModalService.SetTitle('Create Search Order')
            ModalService.SetMessage('Creating search order,please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            //post  to /orders/createSearchOrder
            var SearchOrder = Restangular.all('/orders/createSearchOrder');
            SearchOrder.post($scope.searchOrder).then(function (response) {
                if (response.data) {
                    CartService.SaveSearchOrder(response.data.order)
                    $state.go('recruiters.checkOutSearchOrder');
                }

            })
        };
    };
}])