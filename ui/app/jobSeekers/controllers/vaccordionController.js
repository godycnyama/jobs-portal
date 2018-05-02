var vaccordionModule = angular.module('vaccordionModule', ['jobSeekerServiceModule']);

vaccordionModule.controller('vAccordionController', ['$scope', function ($scope) {

    $scope.expandCallback = function (index, id) {
        console.log('expand:', index, id);
    };

    $scope.collapseCallback = function (index, id) {
        console.log('collapse:', index, id);
    };

    $scope.$on('accordionA:onReady', function () {
        console.log('accordionA is ready!');
    });
}])