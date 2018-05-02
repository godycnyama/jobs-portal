var startControllerModule = angular.module('startControllerModule', []);

startControllerModule.controller('mController', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
    $scope.toggleSideNav = function () {
        $mdSidenav('left').toggle();
    };
}])

startControllerModule.controller('StartController', ['$scope', '$state', 'Auth', 'loginModalService', function ($scope, $state, Auth, loginModalService) {
    $scope.jobSeekerSignUp = function () {
        Auth.SetRole('job_seeker');
        $state.go('auth.signupJobSeeker')
    };
    $scope.recruiterSignUp = function () {
        Auth.SetRole('recruiter');
        $state.go('auth.signupRecruiter')
    };
    $scope.signIn = function () {
        loginModalService().then(function () {
            return;
        })
        .catch(function () {
            return $state.go('start');
        });

    };
}])