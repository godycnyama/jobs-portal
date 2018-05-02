var modalModule = angular.module('modalModule', []);

modalModule.controller('ModalController', ['$scope', '$uibModalInstance', 'ModalService', function ($scope, $uibModalInstance, ModalService) {
    $scope.message = ModalService.GetMessage();
    $scope.title = ModalService.GetTitle();
    if (ModalService.GetCloseModal())
        $uibModalInstance.close();
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

modalModule.controller('AboutRecruiterModalController', ['$scope','$rootScope', '$uibModalInstance', function ($scope,$rootScope, $uibModalInstance) {
    $scope.jobAd = $rootScope.jobAd;
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);