var adminRecruiterCandidatesModule = angular.module('adminRecruiterCandidatesModule', []);

adminRecruiterCandidatesModule.controller('RecruiterCandidatesController', ['$scope', '$state', '$uibModal', '$uibModalStack', 'Auth', 'CandidatesService', 'RecruiterService', 'ModalService', 'Restangular', 'Notification', function ($scope, $state, $uibModal, $uibModalStack, Auth, CandidatesService, RecruiterService, ModalService, Restangular, Notification) {
    $scope.candidates = (CandidatesService.GetCandidates() !== null) ? CandidatesService.GetCandidates() : [];
    $scope.searchBy = CandidatesService.GetSearchBy();
    $scope.searchTerm = CandidatesService.GetSearchTerm();
    $scope.totalCandidates = CandidatesService.GetTotalCandidates();
    $scope.candidatesPerPage = CandidatesService.GetCandidatesPerPage();
    $scope.searchByOptions = ['All', 'Qualification Name', 'Skill', 'Profession', 'Prefered Job Titles'];   
    $scope.viewPerPageOptions = [4, 8];
    $scope.candidatesPerPage = $scope.viewPerPageOptions[0];
    $scope.pagination = {
        current: CandidatesService.GetCurrentPage(),
        last: 0
    };
    $scope.range = {
        lower: 0,
        upper: 0,
        total: 0
    };
    $scope.isEmpty = function () {
        for (var prop in $scope.candidates) {
            if ($scope.candidates.hasOwnProperty(prop))
                return false;
        }
        return true;
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
        CandidatesService.SetSearchBy($scope.searchBy);
        CandidatesService.SetSearchTerm($scope.searchTerm);
        CandidatesService.SetCandidatesPerPage($scope.candidatesPerPage);
        //get from api/resumes/getRecruiterResumesBy
        var Resumes = Restangular.all('api/resumes/getResumesBy');
        Resumes.getList(query).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                if(response.data.total == 0){
                    Notification.error({ message: 'No candidates found!', title: 'Error' });
                    return
                }
                $scope.candidates = response.data;
                CandidatesService.SetCandidates(response.data);
                $scope.totalCandidates = response.data.total;
            };
        })
    }
    
    $scope.viewProfile = function (candidate) {
        CandidatesService.SetCandidate(candidate);
        CandidatesService.SetCurrentPage($scope.pagination.current);
        CandidatesService.SetTotalCandidates($scope.totalCandidates);
        $state.go('recruiter.candidateProfile');
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
            
            var query = {
                resumeID: _cv._id
            }
            var Resumes = Restangular.all('api/resumes/adminDelete')
            Resumes.customDELETE('',query).then(function (response) {
                if (response.status == 200) {
                    console.log(response);
                    modalInstance0.close();
                    for (var i = 0; i < $scope.candidates.length; i++) {
                        if ($scope.candidates[i]._id === _cv._id) {
                            $scope.candidates.splice(i, 1);
                        }
                    }
                    CandidatesService.SetCandidates($scope.candidates);
                    Notification.success({ message: response.data.message, title: 'Delete Recruiter Candidate' });
                }
            })
        });
    };
}])