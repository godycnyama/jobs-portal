var mycandidatesModule = angular.module('mycandidatesModule', []);

mycandidatesModule.controller('MyCandidatesController', ['$scope', '$state', '$uibModal', '$uibModalStack', 'Auth', 'MyCandidatesService', 'RecruiterService', 'ModalService', 'Restangular', 'Notification', function ($scope, $state, $uibModal, $uibModalStack, Auth, MyCandidatesService, RecruiterService, ModalService, Restangular, Notification) {
    $scope.candidates = (MyCandidatesService.GetCandidates() !== null) ? MyCandidatesService.GetCandidates() : [];
    $scope.searchBy = MyCandidatesService.GetSearchBy();
    $scope.searchTerm = MyCandidatesService.GetSearchTerm();
    $scope.totalCandidates = MyCandidatesService.GetTotalCandidates();
    $scope.candidatesPerPage = MyCandidatesService.GetCandidatesPerPage();
    $scope.searchByOptions = ['All', 'Qualification', 'Profession', 'Preferred Job Titles'];   
    $scope.viewPerPageOptions = [4, 8];
    $scope.isEmpty = function () {
        for (var prop in $scope.candidates) {
            if ($scope.candidates.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    $scope.pagination = {
        current: MyCandidatesService.GetCurrentPage(),
        last: 0
    };
    $scope.range = {
        lower: 0,
        upper: 0,
        total: 0
    };
    $scope.back = function () {
        window.history.back();
    }
    $scope.searchCandidates = function () {
        ModalService.SetTitle('Candidate(s) Search')
        ModalService.SetMessage('Searching for candidates(s),please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        var query = {
            recruiterUserID: Auth.GetUserID(),
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: 1,
            perPage: $scope.candidatesPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo
        };
        $scope.getCandidates(query);

    };
    $scope.getPage = function (newPage) {
        var query = {
            recruiterUserID: Auth.GetUserID(),
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: newPage,
            perPage: $scope.candidatesPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo
        };
        $scope.getCandidates(query);
    };
    $scope.getCandidates = function (query) {
        MyCandidatesService.SetSearchBy($scope.searchBy);
        MyCandidatesService.SetSearchTerm($scope.searchTerm);
        MyCandidatesService.SetCandidatesPerPage($scope.candidatesPerPage);
        //get from api/resumes/getRecruiterResumesBy
        var Resumes = Restangular.all('api/resumes/getRecruiterResumesBy');
        Resumes.getList(query).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                if (response.data.total == 0) {
                    Notification.error({ message: 'No candidate(s) matching your search criteria found!', title: 'Candidates(s) Search' });
                    return
                };
                $scope.candidates = response.data;
                MyCandidatesService.SetCandidates(response.data);
                $scope.totalCandidates = response.data.total;
            };
        })
    }
    
    $scope.viewProfile = function (candidate) {
        MyCandidatesService.SetCurrentPage($scope.pagination.current);
        MyCandidatesService.SetCandidate(candidate);
        $state.go('recruiter.myCandidateProfile');
    };
    $scope.deleteCV = function (_cv) {
        ModalService.SetTitle('Delete CV')
        ModalService.SetMessage('Are you sure you want to delete CV from your bucket?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetTitle('Delete CV')
            ModalService.SetMessage('Deleting CV,please wait!');
            var modalInstance0 = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            
            var recruiterUserID = Auth.GetUserID();
            var query = {
                recruiterUserID: Auth.GetUserID(),
                resumeID: _cv._id
            }
            var Resumes = Restangular.all('api/resumes/recruiterDelete')
            Resumes.customDELETE('',query).then(function (response) {
                if (response) {
                    $uibModalStack.dismissAll();
                    for (var i = 0; i < $scope.candidates.length; i++) {
                        if ($scope.candidates[i].candidateID._id === _cv._id) {
                            $scope.candidates.splice(i, 1);
                        }
                    }
                    MyCandidatesService.SetCandidates($scope.candidates);
                    Notification.success({ message: response.data.message, title: 'Delete CV' });
                }
            })
        });
    };
}])