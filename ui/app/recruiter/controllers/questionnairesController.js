var questionnairesModule = angular.module('questionnairesModule', []);

questionnairesModule.controller('QuestionnairesController', ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
    $scope.searchTerm = null;
    $scope.searchByOptions = ['QuestionnaireID', 'QuestionnaireREF','Title'];
    $scope.selectedSearchBy = $scope.searchByOptions[0];
    /*
    $scope.createJobAd = function () {
        JobAdsService.SetCreate();
        JobAdsService.CreateJobAd();
        $state.go('recruiters.jobAds.createJobAd');
    };
    $scope.viewJobAd = function (index) {
        JobAdsService.ViewJobAd(index);
        $state.go('recruiters.jobAds.previewJobAd');
    };
    $scope.questionnaires = JobAdsService.GetJobAds();
    
    $scope.search = function () {
        switch ($scope.selectedSearchBy) {
            case 'All':
                jobAds = JobAdsRESTService.get();
                JobAdsService.SetJobAds(jobAds);
                break;
            case 'JobID':
                jobAds = JobAdsRESTService.getJobAdByID({ jobAdID: $scope.searchTerm });
                JobAdsService.SetJobAds(jobAds);
                break;
            case 'JobREF':
                jobAds = JobAdsRESTService.getJobAdByREF({ jobAdID: $scope.searchTerm });
                JobAdsService.SetJobAds(jobAds);
                break;
            case 'Payment Complete':
                jobAds = JobAdsRESTService.getJobAdsByPaymentStatus({ paymentStatus: 'COMPLETE' });
                JobAdsService.SetJobAds(jobAds);
                break;
            case 'Payment Pending':
                jobAds = JobAdsRESTService.getJobAdsByPaymentStatus({ paymentStatus: 'PENDING' });
                JobAdsService.SetJobAds(jobAds);
                break;
        }
    };*/

}])