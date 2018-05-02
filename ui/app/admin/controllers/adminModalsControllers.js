var adminModalsModule = angular.module('adminModalsModule', []);

adminModalsModule.controller('JobAdDeleteController', ['$scope', '$uibModalInstance', 'AdminService', function ($scope, $uibModalInstance, AdminService) {
    $scope.message = '';
    $scope.delete = false;
    $scope.ok = function () {
        $scope.delete = true;
        $uibModalInstance.close($scope.delete);
        /*
        var _jobAd = AdminService.GetJobAd();
        var jobAd = Restangular.one('jobAds', _jobAd._id);
        jobAd.remove().then(function (jobAd) {
            $scope.message = 'JobAd removed successfully!';
            $scope.delete = true;
            $uibModalInstance.close($scope.delete);
        }, function () {
            $scope.message = 'An error occured while deleting jobAd,please try again!';
            $uibModalInstance.close($scope.delete);
        })
        */
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

adminModalsModule.controller('JobSeekerDeleteController', ['$scope', '$uibModalInstance', 'AdminService', function ($scope, $uibModalInstance, AdminService) {
    $scope.message = '';
    $scope.delete = false;
    $scope.ok = function () {
        $scope.delete = true;
        $uibModalInstance.close($scope.delete);
        /*
        var _jobAd = AdminService.GetJobAd();
        var jobAd = Restangular.one('jobAds', _jobAd._id);
        jobAd.remove().then(function (jobAd) {
            $scope.message = 'JobAd removed successfully!';
            $scope.delete = true;
            $uibModalInstance.close($scope.delete);
        }, function () {
            $scope.message = 'An error occured while deleting jobAd,please try again!';
            $uibModalInstance.close($scope.delete);
        })
        */
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

adminModalsModule.controller('RecruiterDeleteController', ['$scope', '$uibModalInstance', 'AdminService', function ($scope, $uibModalInstance, AdminService) {
    $scope.message = '';
    $scope.delete = false;
    $scope.ok = function () {
        $scope.delete = true;
        $uibModalInstance.close($scope.delete);
        /*
        var _jobAd = AdminService.GetJobAd();
        var jobAd = Restangular.one('jobAds', _jobAd._id);
        jobAd.remove().then(function (jobAd) {
            $scope.message = 'JobAd removed successfully!';
            $scope.delete = true;
            $uibModalInstance.close($scope.delete);
        }, function () {
            $scope.message = 'An error occured while deleting jobAd,please try again!';
            $uibModalInstance.close($scope.delete);
        })
        */
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

adminModalsModule.controller('PriceDeleteController', ['$scope', '$uibModalInstance', 'AdminService', function ($scope, $uibModalInstance, AdminService) {
    $scope.message = '';
    $scope.delete = false;
    $scope.ok = function () {
        $scope.delete = true;
        $uibModalInstance.close($scope.delete);
        /*
        var _jobAd = AdminService.GetJobAd();
        var jobAd = Restangular.one('jobAds', _jobAd._id);
        jobAd.remove().then(function (jobAd) {
            $scope.message = 'JobAd removed successfully!';
            $scope.delete = true;
            $uibModalInstance.close($scope.delete);
        }, function () {
            $scope.message = 'An error occured while deleting jobAd,please try again!';
            $uibModalInstance.close($scope.delete);
        })
        */
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}])