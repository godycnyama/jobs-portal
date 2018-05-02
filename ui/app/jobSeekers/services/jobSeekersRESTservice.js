var jobSeekerRESTserviceModule = angular.module('jobSeekersRESTserviceModule', ['ngResource']);
var apiURL = 'http://www.jobsapp.com';
// Some APIs expect a PUT request in the format URL/object/ID
// Here we are creating an 'update' method
jobSeekersRESTserviceModule.factory('JobSeekersRESTservice', ['$resource', function ($resource) {
    return $resource(apiURL + '/jobSeekers/:resourceRoute/:username',
        {
            resourceRoute: '@resourceRoute',
            username: '@username'
        },
        {
            updateJobSeeker: {
                method: 'PUT',
                params: {
                    resourceRoute: 'updateJobSeeker',
                }
            },
            addQualification: {
                method: 'GET',
                params: {
                    resourceRoute: 'addQualification',
                }
            },
            update: { method: 'PUT' },
            updateQualification: {
                method: 'PUT',
                params: {
                    resourceRoute: 'updateQualification',
                }
            },
            deleteQualification: {
                method: 'DELETE',
                params: {
                    resourceRoute: 'deleteQualification',
                }
            },
            addSkill: {
                method: 'GET',
                params: {
                    resourceRoute: 'addSkill',
                }
            },
            updateSkill: {
                method: 'PUT',
                params: {
                    resourceRoute: 'updateSkill',
                }
            },
            deleteSkill: {
                method: 'DELETE',
                params: {
                    resourceRoute: 'deleteSkill',
                }
            },
            addEmployment: {
                method: 'GET',
                params: {
                    resourceRoute: 'addEmployment',
                }
            },
            
            updateEmployment: {
                method: 'PUT',
                params: {
                    resourceRoute: 'updateEmployment',
                }
            },
            deleteEmpoyment: {
                method: 'DELETE',
                params: {
                    resourceRoute: 'deleteEmployment',
                }
            },
            addCV: {
                method: 'GET',
                params: {
                    resourceRoute: 'addCV',
                }
            },
            updateCV: {
                method: 'PUT',
                params: {
                    resourceRoute: 'updateCV',
                }
            },
            deleteCV: {
                method: 'DELETE',
                params: {
                    resourceRoute: 'deleteCV',
                }
            },
            addAttachment: {
                method: 'GET',
                params: {
                    resourceRoute: 'addAttachment',
                }
            },
            updateAttachment: {
                method: 'PUT',
                params: {
                    resourceRoute: 'updateAttachment',
                }
            },
            deleteAttachment: {
                method: 'DELETE',
                params: {
                    resourceRoute: 'deleteAttachment',
                }
            },
            
            deleteJobSeekerByUsername: {
                method: 'DELETE',
                params: {
                    resourceRoute: 'deleteJobSeeker'
                }

            }
            

        });
}]);