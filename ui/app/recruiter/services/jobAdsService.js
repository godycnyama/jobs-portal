var jobAdsServiceModule = angular.module('jobAdsServiceModule', []);
jobAdsServiceModule.factory('JobAdsService', [ function () {
    var iniJobAd = {
        jobTitle: null,
        jobREF: null,
        jobLevel: 'Management',
        jobType: 'Permanent',
        companySector: 'Academic',
        closingDate: null,
        jobLocationTown: null,
        jobLocationCountry: 'South Africa',
        renumerationType: 'Basic Salary',
        renumerationMarketRelated: false,
        renumerationBenefits: null,
        salaryCurrency: 'R',
        minimumSalary: null,
        maximumSalary: null,
        salaryNegotiable: false,
        hideSalary: false,
        salaryFrequency: 'Per Month',
        employmentEquityPosition: false,
        disabilityOption: 'Yes',
        introduction: null,
        jobDescription: null,
        jobRequirements: null,
        applyOnline: false,
        howToApply: null,
        recruiterUserID: null,
        company: null,
    };
    var jobAd = {
        jobTitle: null,
        jobREF: null,
        jobLevel: 'Management',
        jobType: 'Permanent',
        companySector: 'Academic',
        closingDate: null,
        jobLocationTown: null,
        jobLocationCountry: 'South Africa',
        renumerationType: 'Basic Salary',
        renumerationMarketRelated: false,
        renumerationBenefits: null,
        salaryCurrency: 'R',
        minimumSalary: null,
        maximumSalary: null,
        salaryNegotiable: false,
        hideSalary: false,
        salaryFrequency: 'Per Month',
        employmentEquityPosition: false,
        disabilityOption: 'Yes',
        introduction: null,
        jobDescription: null,
        jobRequirements: null,
        applyOnline: false,
        howToApply: null,
        recruiterUserID: null,
        company: null,
    };
    var jobAds = [];
    var cart = [];
    var mode = true;
    var backNav = 'NO';
    var searchTerm = '';
    var searchBy = 'All';
    var itemsPerPage = 4;
    var totalItems = 0;
    var copy = false;
    var currentPage = 1;
    return {
        SetCurrentPage: function (_page) {
            currentPage = _page;
            return;
        },
        GetCurrentPage: function (_page) {
            return currentPage;
        },
        SetBackNav: function () {
            backNav = 'YES';
            return;

        },
        ReSetBackNav: function () {
            backNav = 'NO';
            return;
        },
        GetBackNav: function () {
            return backNav;
        },
        SetCopy: function () {
            return copy = true;
        },
        ReSetCopy: function () {
            return copy = false;
        },
        GetCopy: function () {
            return copy;
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
        SetCreate: function () {
            mode = true
            return;
        },
        SetEdit: function () {
            mode = false
            return;
        },
        GetMode: function () {           
            return mode;
        },
        SetJobAd: function (_jobAd) {
            jobAd = _jobAd;
            return;
        },
        GetIniJobAd: function () {
            return iniJobAd
        },
        GetJobAd: function () {
            return jobAd
        },
        CreateJobAd: function () {
            jobAd = iniJobAd;
            return
        },
        viewJobAd: function(_jobAd){
            jobAd = _jobAd;
            return 
        },
        JobAdBackNavigation: function (jobRef) {
            jobAds = $localStorage.jobAds;
            for (i = 0; i < jobAds.length; i++) {
                if (jobAds[i].jobRef == jobRef) {
                    jobAd = jobAds[i];
                    return
                }
            }
        },
        JobAdBack: function () { },
     /*   CreateJobAd: function (jobAd) {
            jobAds.push(jobAd);
            $localStorage.jobAds = jobAds;
            return
        },
        */
        DeleteJobAd: function (_jobAd) {
            for (var i = 0; i < jobAds.length; i++) {
                if (jobAds[i]._id == _jobAd._id) {
                    jobAds.splice(i, 1);
                }
            }
            return;
        },
        CloseJobAd: function (_jobAd) {
            for (var i = 0; i < jobAds.length; i++) {
                if (jobAds[i]._id == _jobAd._id) {
                    jobAds[i].closed = true;
                }
            }
            return;
        },
        SetJobAds: function (_Ads) {
            jobAds = _Ads;
            return
        },
        GetJobAds: function () {         
            return jobAds;
        },
        ClearJobAds: function () {
            jobAds = [];
            totalItems = 0;
        },
        PreviewJobAd: function (Ad) {
            jobAd = Ad;
            return
        },
        GetJobAdPreview: function (jobRef) {
            for (i = 0; i < jobAds.length; i++) {
                if (jobAds[i].jobRef == jobRef) {
                    return jobAds[i];
                }
            }
        }
    }
}]);