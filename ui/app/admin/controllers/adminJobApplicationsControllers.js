var adminJobApplicationsModule = angular.module('adminJobApplicationsModule', []);

adminJobApplicationsModule.controller('AdminJobApplicationsController', ['$scope', '$rootScope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'JobAdsService', 'Restangular', 'ModalService', 'CartService', 'Auth', 'AdminJobApplicationsService', 'Notification', function ($scope, $rootScope, $state, $uibModal, $uibModalStack, $timeout, JobAdsService, Restangular, ModalService, CartService, Auth, AdminJobApplicationsService, Notification) {
    $scope.jobApplications = (AdminJobApplicationsService.GetItems() != null) ? AdminJobApplicationsService.GetItems() : [];
    $scope.back = function () {
        window.history.back();
    };
    $scope.searchByOptions = ['All','RecruiterID', 'JobID', 'JobREF', 'Job Title', 'Date', 'Date Range'];
    $scope.searchBy = AdminJobApplicationsService.GetSearchBy();
    $scope.searchTerm = AdminJobApplicationsService.GetSearchTerm();
    $scope.viewPerPageOptions = [4, 8];
    $scope.jobApplicationsPerPage = AdminJobApplicationsService.GetItemsPerPage();
    $scope.totalJobApplications = AdminJobApplicationsService.GetTotalItems();
    $scope.pagination = {
        current: AdminJobApplicationsService.GetCurrentPage(),
        last: 0
    };
    $scope.range = {
        lower: 0,
        upper: 0,
        total: 0
    };
    $scope.isEmpty = function () {
        for (var prop in $scope.jobApplications) {
            if ($scope.jobApplications.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    $scope.viewApplication = function (_application) {
        AdminJobApplicationsService.SetItem(_application);
        AdminJobApplicationsService.SetCurrentPage($scope.pagination.current);
        $state.go('admin.jobApplication');
    };

    
    $scope.deleteApplication = function (_application) {
        var application = {
            applicationID: _application._id
        };
        var modalInstance0 = {};
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
            $timeout(function () {
               var modalInstance = $uibModal.open({
                    templateUrl: 'app/modals/modal.html',
                    controller: 'ModalController'
                });
            }, 500);

            var JobApplications = Restangular.all('api/jobApplications/admin');
            JobApplications.customDELETE("", application).then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    AdminJobApplicationsService.DeleteItem(_application);
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
            dateTo: $scope.dateTo
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
            dateTo: $scope.dateTo       
        };
        $scope.getJobApplications(query);

    };
    $scope.getJobApplications = function (query) {
        AdminJobApplicationsService.SetSearchBy($scope.searchBy);
        AdminJobApplicationsService.SetSearchTerm($scope.searchTerm);
        //get from /api/jobApplications/getJobApplicationsBy
        var JobApplications = Restangular.all('api/jobApplications/getJobApplicationsBy');
        JobApplications.getList(query).then(function (response) {
            if (response.data) {
                $uibModalStack.dismissAll();
                if (response.data.total == 0) {
                    Notification.success({ message: 'No job applications found!', title: 'Search Job Applications' });
                    return
                };
                $scope.jobApplications = response.data;
                AdminJobApplicationsService.SetItems(response.data);
                $scope.totalJobApplications = response.data.total;
                AdminJobApplicationsService.SetTotalItems(response.data.total);
            };
        })
    };
}]);

adminJobApplicationsModule.controller('AdminJobApplicationController', ['$scope', '$state', '$uibModal', '$uibModalStack', '$timeout', 'Restangular', 'Auth', 'AdminJobApplicationsService', 'ModalService', 'CandidatesService', 'Notification', function ($scope, $state, $uibModal, $uibModalStack, $timeout, Restangular, Auth, AdminJobApplicationsService, ModalService, CandidatesService, Notification) {
    $scope.jobApplication = AdminJobApplicationsService.GetItem();
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
            if (response.status == 200) {
                $uibModalStack.dismissAll();
                CandidatesService.SetCandidate(response.data);
                $state.go('recruiter.candidateProfile');
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

            var JobApplications = Restangular.all('api/jobApplications/admin');
            JobApplications.customDELETE("", application).then(function (response) {
                if (response.data) {
                    $uibModalStack.dismissAll();
                    AdminJobApplicationsService.DeleteItem($scope.jobApplication);
                    Notification.success({ message: response.data.message, title: 'Delete Job Application' });
                    window.history.back();
                }
            })
        });
    };
}]);

