var jobApplicationsServiceModule = angular.module('jobApplicationsServiceModule', []);
jobApplicationsServiceModule.factory('JobApplicationsService', [function () {
    var searchTerm = '';
    var searchBy = 'All';
    var itemsPerPage = 4;
    var totalItems = 0;
    var currentPage = 1;
    var application = {};
    var applications = [];
    return {
        SetCurrentPage: function (_page) {
            currentPage = _page;
            return;
        },
        GetCurrentPage: function () {
            return currentPage;
        },
        SetSearchTerm: function (_searchTerm) {
            return searchTerm = _searchTerm;
        },
        GetSearchTerm: function () {
            return searchTerm;
        },
        SetSearchBy: function (_searchBy) {
            return searchBy = _searchBy;
        },
        GetSearchBy: function () {
            return searchBy;
        },
        SetItemsPerPage: function (_itemsPerPage) {
            return itemsPerPage = _itemsPerPage;
        },
        GetItemsPerPage: function () {
            return itemsPerPage;
        },
        SetTotalItems: function (_totalItems) {
            return totalItems = _totalItems;
        },
        GetTotalItems: function () {
            return totalItems;
        },
        SetApplication: function (_application) {
            application = _application;
        },
        GetApplication: function () {
            return application;;
        },
        SetApplications: function (_applications) {
            applications = _applications;
        },
        GetApplications: function () {
            return applications;
        },
        ClearApplications: function () {
            applications = [];
            totalItems = 0;
        },
        DeleteApplication: function (_application) {
            for (var i = 0; i < applications.length; i++) {
                if (applications[i]._id == _application._id) {
                    applications.splice(i, 1);
                }
            }
            return;
        }
    }
}]);