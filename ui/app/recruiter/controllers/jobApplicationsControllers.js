var jobApplicationsModule = angular.module('jobApplicationsModule', []);

jobApplicationsModule.controller('JobApplicationsController', ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'JobAdsService', 'Restangular', 'ModalService', 'CartService', 'Auth', 'JobApplicationsService', 'Notification', function ($scope, $rootScope, $state, $uibModal, $uibModalStack, $timeout, JobAdsService, Restangular, ModalService, CartService, Auth, JobApplicationsService, Notification) {
    $scope.jobApplications = (JobApplicationsService.GetApplications() != null) ? JobApplicationsService.GetApplications() : [];
    $scope.back = function () {
        window.history.back();
    };
    $scope.clearApplications = function () {
        $scope.jobApplications = [];
        JobApplicationsService.ClearApplications();
        $scope.totalJobApplications = 0;
    }
    $scope.searchByOptions = ['All', 'JobREF', 'Job Title', 'Date', 'Date Range'];
    $scope.searchBy = JobApplicationsService.GetSearchBy();
    $scope.searchTerm = JobApplicationsService.GetSearchTerm();
    $scope.viewPerPageOptions = [4, 8];
    $scope.jobApplicationsPerPage = JobApplicationsService.GetItemsPerPage();
    $scope.totalJobApplications = JobApplicationsService.GetTotalItems();
    $scope.pagination = {
        current: JobApplicationsService.GetCurrentPage(),
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
        $scope.jobAd.closingDate = new Date();
    };
    $scope.clear = function () {
        $scope.jobAd.closingDate = null;
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.openFromDatePicker = function ($event) {
        $scope.fromDatePickerOpened = true;
    };

    $scope.setDate_from = function (year, month, day) {
        $scope.dateFrom = new Date(year, month, day);
    };
    $scope.todayDate_from = function () {
        $scope.dateFrom = new Date();
    };
    $scope.clearDate_from = function () {
        $scope.dateFrom = null;
    };
    $scope.openToDatePicker = function ($event) {
        $scope.toDatePickerOpened = true;
    };
    $scope.setDateTo = function (year, month, day) {
        $scope.dateTo = new Date(year, month, day);
    };
    $scope.todayDate_to = function () {
        $scope.dateTo = new Date();
    };
    $scope.clearDate_to = function () {
        $scope.dateTo = null;
    };
    $scope.viewApplication = function (_application) {
        JobApplicationsService.SetCurrentPage($scope.pagination.current);
        JobApplicationsService.SetApplication(_application);
        $state.go('recruiter.jobApplication');
    };

    $scope.deleteApplication = function (_application) {
        var application = {
            applicationID: _application._id,
            recruiterUserID: Auth.GetUserID()
        };
        ModalService.SetTitle('Delete Job Application')
        ModalService.SetMessage('Are you sure you want to delete job application?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetTitle('Delete Job Application')
            ModalService.SetMessage('Deleting job application,please wait!');
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modals/modal.html',
                controller: 'ModalController'
            });
            
            var JobApplications = Restangular.all('api/jobApplications');
            JobApplications.customDELETE("", application).then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    JobApplicationsService.DeleteApplication(_application);
                    Notification.success({ message: response.data.message, title: 'Delete Job Application' });          
                }
            })
        });
    };
    $scope.getPage = function (newPage) {
        var query = {
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: newPage,
            perPage: $scope.jobApplicationsPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo,
            recruiterUserID: Auth.GetUserID()
        };
        $scope.getJobApplications(query);
    };
    $scope.searchJobApplications = function () {
        ModalService.SetTitle('Search Job Applications')
        ModalService.SetMessage('Searching for job applications,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        var query = {
            searchBy: $scope.searchBy,
            searchTerm: $scope.searchTerm,
            pageNo: 1,
            perPage: $scope.jobApplicationsPerPage,
            date: $scope.date,
            dateFrom: $scope.dateFrom,
            dateTo: $scope.dateTo,
            recruiterUserID: Auth.GetUserID()
        };
        $scope.getJobApplications(query);

    };
    $scope.getJobApplications = function (query) {
        JobApplicationsService.SetSearchBy($scope.searchBy);
        JobApplicationsService.SetSearchTerm($scope.searchTerm);
        //get from /api/jobApplications/getRecruiterJobApplicationsBy
        var JobApplications = Restangular.all('api/jobApplications/getRecruiterJobApplicationsBy');
        JobApplications.getList(query).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                if (response.data.total == 0) {
                    Notification.error({ message: 'No job applications matching your search criteria found!', title: 'Search Job Applications' });
                };
                $scope.jobApplications = response.data;
                JobApplicationsService.SetApplications(response.data);
                $scope.totalJobApplications = response.data.total;
                JobApplicationsService.SetTotalItems(response.data.total);
            };
        })
    };
}]);

jobApplicationsModule.controller('JobApplicationController', ['$scope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'Auth', 'JobApplicationsService', 'ModalService', 'CandidatesService', 'Notification', function ($scope, $state, $uibModal, $uibModalStack, $timeout, Restangular, Auth, JobApplicationsService, ModalService, CandidatesService, Notification) {
    $scope.jobApplication = JobApplicationsService.GetApplication();
    console.log(JobApplicationsService.GetApplication());
    $scope.back = function () {
        window.history.back();
    };
    $scope.viewProfile = function () {
        ModalService.SetTitle('Get Applicant Profile');
        ModalService.SetMessage('Searching for applicant profile,please wait!');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/modal.html',
            controller: 'ModalController'
        });
        //get from /api/jobSeekers/getByID
        var JobSeeker = Restangular.one('api/jobSeekers/getByID', $scope.jobApplication.jobSeekerID);
        JobSeeker.get().then(function (response) {
            if (response) {
                $uibModalStack.dismissAll();
                CandidatesService.SetCandidate(response.data.jobSeeker);
                $state.go('recruiter.candidateProfile');
            };
        })
    };
    $scope.addCV = function () {
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
            candidateID: $scope.candidate._id,
            mainQualification: $scope.candidate.mainQualification,
            profession: $scope.candidate.profession,
            preferredJobTitles: $scope.candidate.preferredJobTitles
        }
        Resumes.post(resume).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                Notification.success({ message: response.data.message, title: 'Add CV' });
            };
        })
    };
    $scope.deleteApplication = function () {
        var application = {
            applicationID: $scope.jobApplication._id
        };
        ModalService.SetTitle('Delete Job Application')
        ModalService.SetMessage('Are you sure you want to delete job application?');
        var modalInstance = $uibModal.open({
            templateUrl: 'app/modals/messageModal.html',
            controller: 'ModalController'
        });
        modalInstance.result.then(function () {
            $uibModalStack.dismissAll();
            ModalService.SetTitle('Delete Job Application')
            ModalService.SetMessage('Deleting job application,please wait!');
            var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/modal.html',
                    controller: 'ModalController'
                });

            var JobApplications = Restangular.all('api/jobApplications');
            JobApplications.customDELETE("", application).then(function (response) {
                if (response) {
                    $uibModalStack.dismissAll();
                    JobApplicationsService.DeleteApplication($scope.jobApplication);
                    Notification.success({ message: response.data.message, title: 'Delete Job Application' });
                }
            })
        });
    };
}]);
