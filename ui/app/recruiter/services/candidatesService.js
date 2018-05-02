var candidatesServiceModule = angular.module('candidatesServiceModule',[]);

candidatesServiceModule.factory('CandidatesService', [function () {
    var searchTerm = '';
    var searchBy = 'All';
    var advancedSearchQuery = {
        qualification: '',
        skill:'',
        profession: '',
        preferredJobTitles: '',
        preferredJobTypes: '',
        preferredJobLocations: '',
        locationTown: '',
        locationCountry: ''
    };
    var candidatesPerPage = 4;
    var totalCandidates = 0;
    var currentPage = 1;
    var candidate = {};
    var candidates = [];
    var cvs = [];
    var attachments = [];
    return {
        SetCurrentPage: function (_page) {
            currentPage = _page;
            return;
        },
        GetCurrentPage: function (_page) {
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
        SetAdvancedSearchQuery: function (_advancedQuery) {
            advancedSearchQuery = _advancedQuery;
            return
        },
        GetAdvancedSearchQuery: function () {
            return advancedSearchQuery;
        },
        SetCandidatesPerPage: function (_candidatesPerPage) {
            return candidatesPerPage = _candidatesPerPage;
        },
        GetCandidatesPerPage: function () {
            return candidatesPerPage;
        },
        SetTotalCandidates: function (_totalCandidates) {
            return totalCandidates = _totalCandidates;
        },
        GetTotalCandidates: function () {
            return totalCandidates;
        },
        SetCandidate: function (_candidate) {
            candidate = _candidate;
        },
        GetCandidate: function () {
            return candidate;
        },
        SetCandidates: function (_candidates) {
            candidates = _candidates;
            return;
        },
        GetCandidates: function () {
            return candidates;
        },
        ClearCandidates: function () {
            candidates = [];
            totalCandidates = 0;
        },
        DeleteCandidate: function (_candidate) {
            for (var i = 0; i < candidates.length; i++) {
                if (candidates[i]._id === _candidate._id) {
                    candidates.splice(i, 1);
                    return
                }
            }
        },
        SetCVS: function (_cvs) {
            cvs = _cvs;
        },
        GetCVS: function () {
            return cvs;
        }
        ,
        SetAttachments: function (_attachments) {
            attachments = _attachments;
        },
        GetAttachments: function () {
            return attachments;
        }
    }
}]);

candidatesServiceModule.factory('MyCandidatesService', [function () {
    var searchTerm = '';
    var searchBy = 'All';
    var advancedSearchQuery = {
        qualification: '',
        skill: '',
        profession: '',
        preferredJobTitles: '',
        preferredJobTypes: '',
        preferredJobLocations: '',
        locationTown: '',
        locationCountry: ''
    };
    var candidatesPerPage = 4;
    var totalCandidates = 0;
    var currentPage = 1;
    var candidate = {};
    var candidates = [];
    var cvs = [];
    var attachments = [];
    return {
        SetCurrentPage: function (_page) {
            currentPage = _page;
            return;
        },
        GetCurrentPage: function (_page) {
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
        SetAdvancedSearchQuery: function (_advancedQuery) {
            advancedSearchQuery = _advancedQuery;
            return
        },
        GetAdvancedSearchQuery: function () {
            return advancedSearchQuery;
        },
        SetCandidatesPerPage: function (_candidatesPerPage) {
            return candidatesPerPage = _candidatesPerPage;
        },
        GetCandidatesPerPage: function () {
            return candidatesPerPage;
        },
        SetTotalCandidates: function (_totalCandidates) {
            return totalCandidates = _totalCandidates;
        },
        GetTotalCandidates: function () {
            return totalCandidates;
        },
        SetCandidate: function (_candidate) {
            candidate = _candidate;
        },
        GetCandidate: function () {
            return candidate;
        },
        SetCandidates: function (_candidates) {
            candidates = _candidates;
            return;
        },
        GetCandidates: function () {
            return candidates;
        },
        ClearCandidates: function () {
            candidates = [];
            totalCandidates = 0;
        },
        DeleteCandidate: function (_candidate) {
            for (var i = 0; i < candidates.length; i++) {
                if (candidates[i]._id === _candidate._id) {
                    candidates.splice(i, 1);
                    return
                }
            }
        },
        SetCVS: function (_cvs) {
            cvs = _cvs;
        },
        GetCVS: function () {
            return cvs;
        }
        ,
        SetAttachments: function (_attachments) {
            attachments = _attachments;
        },
        GetAttachments: function () {
            return attachments;
        }
    }
}]);
