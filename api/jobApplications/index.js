'use strict';
var JobApplicationsMongoController = require('./mongoDBControllers/jobApplicationsMongoController');
exports.register = function (server, options, next) {

    server.route([
    {
        method: 'GET',
        path: '/api/jobApplications/{applicationID}',
        config: JobApplicationsMongoController.getJobApplicationByID
    },
    {
        method: 'GET',
        path: '/api/jobApplications/getJobApplicationsBy',
        config: JobApplicationsMongoController.getJobApplicationsBy
    },
    {
        method: 'GET',
        path: '/api/jobApplications/getRecruiterJobApplicationsBy',
        config: JobApplicationsMongoController.getRecruiterJobApplicationsBy
    },
    {
        method: 'POST',
        path: '/api/jobApplications',
        config: JobApplicationsMongoController.createApplication
    },
    {
        method: 'POST',
        path: '/api/jobApplications/checkApplicationExists',
        config: JobApplicationsMongoController.checkApplicationExists
    },
    {
        method: 'DELETE',
        path: '/api/jobApplications',
        config: JobApplicationsMongoController.deleteApplication
    },
    {
        method: 'DELETE',
        path: '/api/jobApplications/admin',
        config: JobApplicationsMongoController.deleteApplicationAdmin
    }]);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};