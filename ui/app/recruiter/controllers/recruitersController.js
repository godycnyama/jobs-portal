var recruitersModule = angular.module('recruitersModule', ['jobSeekerServiceModule']);

recruitersModule.controller('RecruitersController', ['$scope', '$state', function ($scope, $state) {
    $scope.taskOptions = ['Post Job Ad', 'Search Candidates'];
    $scope.selectedTask = $scope.taskOptions[0];
    $scope.watchedVariable = "";
    $scope.$watch("selectedTask", function (newValue, oldValue) {
       // $scope.watchedVariable = $scope.selectedTask;
        switch ($scope.selectedTask) {
            case 'Post Job Ad':
                $state.go('recruiters.jobAdsMaster')
                break;
            case 'Search Candidates':
                $state.go('recruiters.candidates')
                break;
        }
        
    });

}])