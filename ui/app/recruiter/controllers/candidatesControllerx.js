var candidatesModule = angular.module('candidatesModule', []);

candidatesModule.controller('CandidatesController', ['$scope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'ModalService', 'AdminService', 'Restangular', 'MasterDetailService', function ($scope, $state, $uibModal, $uibModalStack, $timeout, ModalService, AdminService, Restangular, MasterDetailService) {
    $scope.candidates = (CandidatesService.GetCandidates() !== null) ? CandidatesService.GetCandidates() : [];
    $scope.searchBy = CandidatesService.GetSearchBy();
    $scope.searchTerm = CandidatesService.GetSearchTerm();
    $scope.totalCandidates = CandidatesService.GetTotalCandidates();
    $scope.candidatesPerPage = CandidatesService.GetCandidatesPerPage();
    $scope.date = null,
    $scope.dateFrom = null,
    $scope.dateTo = null,
    $scope.searchByOptions = ['All', 'Profession', 'Qualification', 'Skill', 'Town', 'Country'];
    $scope.viewPerPageOptions = [5, 10, 20];
    $scope.pagination = {
        current: 1,
        last: 0
    };
    $scope.range = {
        lower: 0,
        upper: 0,
        total: 0
    };

    $scope.openDatePicker = function ($event) {
        $scope.datePickerOpened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.date = new Date(year, month, day);
    };
    $scope.todayDate = function () {
        $scope.date = new Date();
    };
    $scope.clear = function () {
        $scope.date = '';
    };
    $scope.openFromDatePicker = function ($event) {
        $scope.fromDatePickerOpened = true;
    };

    $scope.setFromDate = function (year, month, day) {
        $scope.dateFrom = new Date(year, month, day);
    };
    $scope.todayToDate = function () {
        $scope.dateFrom = new Date();
    };
    $scope.clearFromDate = function () {
        $scope.dateFrom = '';
    };
    $scope.openToDatePicker = function ($event) {
        $scope.toDatePickerOpened = true;
    };

    $scope.setFromDate = function (year, month, day) {
        $scope.dateTo = new Date(year, month, day);
    };
    $scope.todayToDate = function () {
        $scope.dateTo = new Date();
    };
    $scope.clearToDate = function () {
        $scope.dateTo = '';
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
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
        $scope.getJobSeekers(query);
    };
    $scope.viewCandidate = function (_candidate) {
        CandidatesService.SetCandidate(_candidate);
        $state.go('admin.candidate');
    };
    $scope.deleteCandidate = function (_candidate) {
        ModalService.SetTitle('Delete Job Seeker')
        ModalService.SetMessage('Are you sure you want to delete job seeker?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetTitle('Delete Job Seeker')
            ModalService.SetMessage('Deleting job seeker,please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
           
            var JobSeekers = Restangular.all('/api/jobSeekers');
            JobSeekers.customDELETE(_candidate._id).then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    for (var i = 0; i < $scope.candidates.length; i++) {
                        if ($scope.candidates[i]._id === _candidate._id) {
                            return $scope.candidates.splice(i, 1);
                        }
                    };
                    CandidatesService.DeleteCandidate(_candidate);
                    
                }
            })
        });
    };
    $scope.searchJobSeekers = function () {
        ModalService.SetTitle('JobSeeker(s) Search')
        ModalService.SetMessage('Searching job Seekers(s),please wait!');
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
        $scope.getJobSeekers(query);

    };
    $scope.getJobSeekers = function (query) {
        CandidatesService.SetSearchBy(query.searchBy);
        CandidatesService.SetSearchTerm(query.searchTerm);
        CandidatesService.SetCandidatesPerPage(query.perPage);

        //get from api/jobSeekers/getJobSeekersBy
        var JobSeekers = Restangular.all('api/jobSeekers/getJobSeekersBy');
        JobSeekers.getList(query).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                if (response.data.total == 0) {
                    ModalService.SetMessage('No job seekers found!');
                    ModalService.SetTitle('JobSeeker(s) Search');
                    var modalInstance = $uibModal.open({
                        templateUrl: 'app/modals/messageModal.html',
                        controller: 'ModalController'
                    });
                };
                $scope.jobSeekers = response.data;
                $scope.totalJobSeekers = response.data.total;               
            };
        })
    }
}])