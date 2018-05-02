var jobModule = angular.module('jobModule',[]);

jobModule.controller('JobController', ['$scope', '$state', '$uibModal', '$uibModalStack', 'JobsService', 'Restangular', 'Auth', 'ModalService', 'Notification', function ($scope, $state, $uibModal, $uibModalStack, JobsService, Restangular, Auth, ModalService, Notification) {
    $scope.back = function () {
        window.history.back();
    };
    $scope.jobAd = JobsService.GetJob();
    $scope.calculateDaysRemaining = function (_date) {
        var oneDay = 24 * 60 * 60 * 1000;	// hours*minutes*seconds*milliseconds
        var todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        var expiryDate = new Date(_date);
        expiryDate.setHours(0, 0, 0, 0);

        var diffDays = Math.abs((expiryDate.getTime() - todayDate.getTime()) / (oneDay));
        return diffDays;
    };
    $scope.aboutRecruiter = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/aboutRecruiter.html',
            controller: 'AboutRecruiterModalController'
        });
    };
    $scope.sendApplication = function () {
        var jobAd = {
            jobSeekerUserID: Auth.GetUserID(),
            jobAdID: $scope.jobAd._id
        };
        
        //get from /api/jobApplications/checkApplicationExists
            var JobApplications = Restangular.all('api/jobApplications/checkApplicationExists');
        JobApplications.post(jobAd).then(function (response) {
            if (response.status === 200) {
                $uibModalStack.dismissAll();
                $state.go('jobs.jobApply');
            };
        })
    
    }
}])