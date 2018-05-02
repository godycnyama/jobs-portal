var recruiterModalsModule = angular.module('recruiterModalsModule', []);

recruiterModalsModule.controller('RecruiterModalsController', ['$scope', '$uibModalInstance', 'RecruiterService', function ($scope, $uibModalInstance, RecruiterService) {
    $scope.message = RecruiterService.GetMessage();
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);