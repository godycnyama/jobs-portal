var viewJobAdModule = angular.module('viewJobAdModule', []);

viewJobAdModule.controller('ViewJobAdController', ['$scope', '$stateParams', 'JobAdsService', function ($scope, $stateParams, JobAdsService) {
    JobAdsService.ViewJobAd($stateParams.jobAdIndex);
    $scope.jobAd = JobAdsService.GetJobAd();

    $scope.back = function () {
        JobAdsService.JobAdBackNavigation($scope.jobAd.jobRef);
        JobAdsService.SetBackNav();
        console.log(JobAdsService.GetBackNav());
        window.history.back();
    }
}])