var candidatesModule = angular.module('candidatesModule', []);

candidatesModule.controller('CandidatesController', ['$scope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'Auth', 'CandidatesService', 'ModalService', 'Restangular', 'Notification', function ($scope, $state, $uibModal, $uibModalStack, $timeout, Auth, CandidatesService, ModalService, Restangular, Notification) {
    $scope.candidates = CandidatesService.GetCandidates();
    $scope.searchBy = CandidatesService.GetSearchBy();
    $scope.searchTerm = CandidatesService.GetSearchTerm();
    $scope.searchTerms = CandidatesService.GetAdvancedSearchQuery();
    $scope.totalCandidates = CandidatesService.GetTotalCandidates();
    $scope.candidatesPerPage = CandidatesService.GetCandidatesPerPage();
    $scope.searchByOptions = ['All', 'Qualification', 'Skill', 'Profession', 'Prefered Job Titles'];
    $scope.viewPerPageOptions = [4, 8];
    $scope.isEmpty = function () {
        for (var prop in $scope.candidates) {
            if ($scope.candidates.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    $scope.clearCandidates = function () {
        $scope.candidates = [];
        CandidatesService.ClearCandidates();
        $scope.totalCandidates = 0;
    };
    $scope.pagination = {
        current: CandidatesService.GetCurrentPage(),
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
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: 1,
            perPage: $scope.candidatesPerPage
        };
        var advancedQuery = {
            searchBy: $scope.searchBy,
            pageNo: 1,
            perPage: $scope.candidatesPerPage,
            qualification: $scope.searchTerms.qualification,
            skill: $scope.searchTerms.skill,
            profession: $scope.searchTerms.profession,
            preferredJobTitles: $scope.searchTerms.preferredJobTitles,
            preferredJobTypes: $scope.searchTerms.preferredJobTypes,
            preferredJobLocations: $scope.searchTerms.preferredJobLocations,
            locationTown: $scope.searchTerms.locationTown,
            locationCountry: $scope.searchTerms.locationCountry
        };
        if($scope.searchBy === 'Advanced Search'){
            $scope.getCandidatesAdvancedSearch(advancedQuery);
        }
        if ($scope.searchBy !== 'Advanced Search') {
            $scope.getCandidates(query);
        }
    };
    $scope.getPage = function (newPage) {
        var query = {
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: newPage,
            perPage: $scope.candidatesPerPage,
        };
        var advancedQuery = {
            searchBy: $scope.searchBy,
            pageNo: newPage,
            perPage: $scope.candidatesPerPage,
            qualification: $scope.searchTerms.qualification,
            skill: $scope.searchTerms.skill,
            profession: $scope.searchTerms.profession,
            preferredJobTitles: $scope.searchTerms.preferedJobTitles,
            preferredJobTypes: $scope.searchTerms.preferedJobTypes,
            preferredJobLocations: $scope.searchTerms.preferedJobLocations,
            locationTown: $scope.searchTerms.locationTown,
            locationCountry: $scope.searchTerms.locationCountry
        };
        if ($scope.searchBy === 'Advanced Search') {
            $scope.getCandidatesAdvancedSearch(advancedQuery);
        }
        if ($scope.searchBy !== 'Advanced Search') {
            $scope.getCandidates(query);
        }
    };
    $scope.getCandidates = function (query) {
        CandidatesService.SetSearchBy($scope.searchBy);
        CandidatesService.SetSearchTerm($scope.searchTerm);
        CandidatesService.SetCandidatesPerPage($scope.candidatesPerPage);
        CandidatesService.SetAdvancedSearchQuery($scope.searchTerms);
        var JobSeekers = Restangular.all('api/jobSeekers/getJobSeekersBy');
        JobSeekers.getList(query).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();  
                if (response.data.total == 0) {
                    Notification.error({ message: 'No candidate(s) matching your search criteria found!', title: 'Candidates(s) Search' });
                    return
                };
                $scope.candidates = response.data;
                CandidatesService.SetCandidates(response.data);
                $scope.totalCandidates = response.data.total;
            };
        })

    };
    $scope.getCandidatesAdvancedSearch = function (query) {
        var JobSeekers = Restangular.all('api/jobSeekers/getJobSeekersBy');
        JobSeekers.getList(query).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                if (response.data.total == 0) {
                    Notification.error({ message: 'No candidates matching search criteria found!', title: 'Candidates(s) Search' });
                    return
                };
                $scope.candidates = response.data;
               CandidatesService.SetCandidates(response.data);
                $scope.totalCandidates = response.data.total;
            };
        })

    }
    $scope.viewProfile = function (candidate) {
        CandidatesService.SetCurrentPage($scope.pagination.current);
        CandidatesService.SetCandidate(candidate);
        $state.go('recruiter.candidateProfile');
    };
    $scope.addCV = function (_cv) {
        ModalService.SetTitle('Add CV')
        ModalService.SetMessage('Adding CV,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
       var recruiterUserID = Auth.GetUserID();
        //post to '/api/recruiters/{recruiterID}/cvs'
       var Resumes = Restangular.all('/api/resumes');
       var resume = {
           recruiterUserID: recruiterUserID,
           candidateID: _cv._id,
           mainQualification: _cv.mainQualification,
           profession: _cv.profession,
           preferredJobTitles: _cv.preferredJobTitles
       }
        Resumes.post(resume).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Add CV' });       
            };
        })
    };

}])