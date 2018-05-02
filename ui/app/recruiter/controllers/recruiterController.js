var recruiterModule = angular.module('recruiterModule', ['jobSeekerServiceModule']);

recruiterModule.controller('RecruiterController', ['$scope', '$state', 'RecruiterService', function ($scope, $state,RecruiterService) {
    $scope.recruiterDetails = RecruiterService.GetRecruiter();
}])