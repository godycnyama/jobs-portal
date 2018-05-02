var jobsModalsModule = angular.module('jobsModalsModule', []);

jobsModalsModule.controller('JobsModalsController', ['$scope', '$uibModalInstance', 'JobsService', function ($scope, $uibModalInstance, JobsService) {
    $scope.message = JobsService.GetMessage();
    $scope.title = JobsService.GetTitle();
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);