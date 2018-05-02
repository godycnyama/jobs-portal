var jobAdsRESTserviceModule = angular.module('jobAdsRESTserviceModule', ['ngResource']);
var apiURL = 'http://www.jobsapp.com';
// Some APIs expect a PUT request in the format URL/object/ID
// Here we are creating an 'update' method
jobAdsRESTserviceModule.factory('JobAdsRESTService', ['$resource', function ($resource) {
    return $resource(apiURL + '/jobAds/:resourceRoute/:jobAdID/:jobREF/:paymentStatus/:recruiterID/:companyName',
        {
            resourceRoute: '@resourceRoute',
            jobAdID: '@jobAdID',
            jobREF: '@jobREF',
            recruiterID: '@recruiterID',
            companyName: '@companyName'
        },
        {
            update: { method: 'PUT' },
            getJobAdByID: {
                            method: 'GET',
                            params: {
                                        resourceRoute: 'jobAdByID',
                                    }
            },
            getJobAdByREF: {
                            method: 'GET',
                            params: {
                                        resourceRoute: 'jobAdByREF'
                                    }
            },
            getJobAdsByPaymentStatus: {
                method: 'GET',
                params: {
                    resourceRoute: 'jobAdsByPaymentStatus'
                }
            },
            getJobAdsByRecruiterID: {
                                      method: 'GET',
                                      params: {
                                                    resourceRoute: 'jobAdsByRecruiterID'
                                               }
            },
            getJobAdsByCompanyName: {
                                      method: 'GET',
                                      params: {
                                                    resourceRoute: 'jobAdsByCompanyName'
                                              }
            },
            deleteJobAdByID: {
                                method: 'DELETE',
                                params: {
                                            resourceRoute: 'deleteJobAdByID'
                                        }

            },
            deleteJobAdByREF: {
                                method: 'DELETE',
                                params: {
                                            resourceRoute: 'jobAdsByCompanyName'
                                        }

            },
            deleteAllJobAds: {
                               method: 'DELETE',
                               params: {
                                            resourceRoute: 'deleteAllJobAds'
                                       }
            }

        });
}]);