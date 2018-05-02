'use strict';
var JobSeekerMongoController = require('./mongoDBControllers/jobSeekerMongoController');
exports.register = function (server, options, next) {
    
    server.route([{
        method: 'GET',
        path: '/api/jobSeekers/getJobSeekersBy',
        config: JobSeekerMongoController.getJobSeekersBy
    },
    {
        method: 'GET',
        path: '/api/jobSeekers',
        config: JobSeekerMongoController.getAllJobSeekers
    },
    {
        method: 'GET',
        path: '/api/jobSeekers/advancedSearch',
        config: JobSeekerMongoController.jobSeekersAdvancedSearch
    },
    {
        method: 'GET',
        path: '/api/jobSeekers/getByID/{jobSeekerID}',
        config: JobSeekerMongoController.getJobSeekerByID
    },
    {
        method: 'GET',
        path: '/api/jobSeekers/{email}',
        config: JobSeekerMongoController.getJobSeekerByEmail
    },
    {
        method: 'POST',
        path: '/api/jobSeekers',
        config: JobSeekerMongoController.createJobSeeker
    },
    {
        method: 'POST',
        path: '/api/jobSeekers/{email}/qualifications',
        config: JobSeekerMongoController.addQualification
    },
    {
        method: 'PUT',
        path: '/api/jobSeekers/{email}/qualifications/{qualificationID}',
        config: JobSeekerMongoController.updateQualification
    },
    {
        method: 'DELETE',
        path: '/api/jobSeekers/{email}/qualifications/{qualificationID}',
        config: JobSeekerMongoController.deleteQualification
    },
    {
        method: 'POST',
        path: '/api/jobSeekers/{email}/skills',
        config: JobSeekerMongoController.addSkill
    },
    {
        method: 'PUT',
        path: '/api/jobSeekers/{email}/skills/{skillID}',
        config: JobSeekerMongoController.updateSkill
    },
    {
        method: 'DELETE',
        path: '/api/jobSeekers/{email}/skills/{skillID}',
        config: JobSeekerMongoController.deleteSkill
    },
    {
        method: 'POST',
        path: '/api/jobSeekers/{email}/employment',
        config: JobSeekerMongoController.addEmployment
    },
    {
        method: 'PUT',
        path: '/api/jobSeekers/{email}/employment/{employmentID}',
        config: JobSeekerMongoController.updateEmployment
    },
    {
        method: 'DELETE',
        path: '/api/jobSeekers/{email}/employment/{employmentID}',
        config: JobSeekerMongoController.deleteEmployment
    },
    {
        method: 'POST',
        path: '/api/jobSeekers/{email}/languages',
        config: JobSeekerMongoController.addLanguage
    },
    {
        method: 'PUT',
        path: '/api/jobSeekers/{email}/languages/{languageID}',
        config: JobSeekerMongoController.updateLanguage
    },
    {
        method: 'DELETE',
        path: '/api/jobSeekers/{email}/languages/{languageID}',
        config: JobSeekerMongoController.deleteLanguage
    },
    {
        method: 'POST',
        path: '/api/jobSeekers/{email}/referees',
        config: JobSeekerMongoController.addReferee
    },
    {
        method: 'PUT',
        path: '/api/jobSeekers/{email}/referees/{refereeID}',
        config: JobSeekerMongoController.updateReferee
    },
    {
        method: 'DELETE',
        path: '/api/jobSeekers/{email}/referees/{refereeID}',
        config: JobSeekerMongoController.deleteReferee
    },
    {
        method: 'POST',
        path: '/api/jobSeekers/uploadCV',
        config: JobSeekerMongoController.uploadCV
    },
    {
        method: 'DELETE',
        path: '/api/jobSeekers/deleteCV',
        config: JobSeekerMongoController.deleteCV
    },
    {
        method: 'POST',
        path: '/api/jobSeekers/{email}/attachments',
        config: JobSeekerMongoController.uploadAttachment
    },
    {
        method: 'DELETE',
        path: '/api/jobSeekers/deleteAttachment/{fileID}',
        config: JobSeekerMongoController.deleteAttachment
    },
    {
        method: 'PUT',
        path: '/api/jobSeekers/{email}',
        config: JobSeekerMongoController.updateJobSeeker
    },
    {
        method: 'DELETE',
        path: '/api/jobSeekers/deleteJobSeeker',
        config: JobSeekerMongoController.deleteJobSeeker
    },
    {
        method: 'DELETE',
        path: '/api/jobSeekers',
        config: JobSeekerMongoController.deleteAllJobSeekers
    }]);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};