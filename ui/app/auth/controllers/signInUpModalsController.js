var signInUpModalsModule = angular.module('signInUpModalsModule', []);

signInUpModalsModule.controller('SignInUpModalsController', ['$scope', '$uibModalInstance', 'Auth', function ($scope, $uibModalInstance, Auth) {
    $scope.message = Auth.GetMessage();
    $scope.title = Auth.GetTitle();
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);