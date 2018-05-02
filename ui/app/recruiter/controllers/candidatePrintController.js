var candidatePrintModule = angular.module('candidatePrintModule', []);

candidatePrintModule.controller('CandidatePrintController', ['$scope', '$state', '$stateParams', 'CandidatesService', function ($scope, $state, $stateParams, CandidatesService) {
    $scope.candidate = CandidatesService.GetCandidate();
    $scope.back = function () {
        window.history.back();
    };
}])