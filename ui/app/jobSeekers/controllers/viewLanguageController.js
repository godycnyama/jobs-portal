var viewLanguageModule = angular.module('viewLanguageModule', []);

viewLanguageModule.controller('ViewLanguageController', ['$scope', '$stateParams', 'JobAdsService', function ($scope, $stateParams, JobAdsService) {
    JobAdsService.ViewJobAd($stateParams.jobAdIndex);
    $scope.jobAd = JobAdsService.GetJobAd();

    $scope.back = function () {
        JobAdsService.JobAdBackNavigation($scope.jobAd.jobRef);
        window.history.back();
    }
}])