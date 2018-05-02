var jobsModule = angular.module('jobsModule', []);


jobsModule.controller('JobsController', ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'Auth', 'JobsService', 'Restangular', 'store', 'ModalService', 'Notification', function ($scope, $rootScope, $state, $uibModal, $uibModalStack, $timeout, Auth, JobsService, Restangular, store, ModalService, Notification) {
    $scope.jobAds = JobsService.GetJobs();
    console.log(JobsService.GetJobs());
    $scope.isEmpty = function () {
        for (var prop in $scope.jobAds) {
            if ($scope.jobAds.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    $scope.jobTitles = JobsService.GetJobTitles();
    $scope.jobTitle = JobsService.GetJobTitle();
    $scope.jobLocation = JobsService.GetJobLocation();
    $scope.viewPerPageOptions = [4,8];
    $scope.jobsPerPage = JobsService.GetJobsPerPage();
    $scope.totalJobs = JobsService.GetTotalJobs();
    $scope.pagination = {
        current: JobsService.GetCurrentPage(),
        last: 0
    };
    $scope.range = {
        lower: 0,
        upper: 0,
        total: 0
    };
    var query = {
        jobTitle: $scope.jobTitle,
        jobLocation: $scope.jobLocation
    };
    $scope.getPage = function (newPage) {
        var query = {
            jobTitle: $scope.jobTitle,
            jobLocation: $scope.jobLocation,
            pageNo: newPage,
            perPage: $scope.jobsPerPage
        };
        $scope.getJobs(query);
    };
    $scope.searchForJobs = function () {
        ModalService.SetTitle('Jobs Search')
        ModalService.SetMessage('Searching for jobs,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        var query = {
            jobTitle: $scope.jobTitle,
            jobLocation: $scope.jobLocation,
            pageNo: 1,
            perPage: $scope.jobsPerPage
        };
        $scope.getJobs(query);

    };
    $scope.getJobs = function (query) {
        JobsService.SetJobTitle($scope.jobTitle);
        JobsService.SetJobLocation($scope.jobLocation);
        JobsService.SetJobsPerPage($scope.jobsPerPage);
        //get from /api/jobAds/jobSeekerGetJobAds
        var JobAds = Restangular.all('api/jobAds/jobSeekerGetJobAds');
        JobAds.getList(query).then(function (response) {
            if (response) {
                $uibModalStack.dismissAll();
                if (response.data.total == 0) {
                    Notification.error({ message: 'No jobs matching your search criteria found!', title: 'Job(s) Search' });
                    return
                };
                // AdminService.SetUsers(response.data);
                $scope.jobAds = response.data;
                JobsService.SetJobs(response.data);
                $scope.totalJobs = response.data.total;
                JobsService.SetTotalJobs(response.data.total);
            };
        })
    };

    $scope.viewJobAd = function (_jobAd) {
        JobsService.SetCurrentPage($scope.pagination.current);
        JobsService.SetJob(_jobAd);
        $rootScope.jobAd = _jobAd;
        $state.go('jobs.job');
    };
    $scope.aboutRecruiter = function (jobAd) {
        $rootScope.jobAd = jobAd;
        console.log($rootScope.jobAd);
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/aboutRecruiter.html',
            controller: 'AboutRecruiterModalController'
        });
    };
    $scope.calculateDaysRemaining = function (_date) {
        var oneDay = 24 * 60 * 60 * 1000;	// hours*minutes*seconds*milliseconds
        var todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        var expiryDate = new Date(_date);
        expiryDate.setHours(0, 0, 0, 0);

        var diffDays = Math.abs((expiryDate.getTime() - todayDate.getTime()) / (oneDay));
        return diffDays;
    };
}]);









