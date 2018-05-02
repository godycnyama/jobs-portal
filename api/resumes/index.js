'use strict';
var ResumeMongoController = require('./resumesMongoController');
exports.register = function (server, options, next) {

    server.route([{
        method: 'GET',
        path: '/api/resumes/getResumesBy',
        config: ResumeMongoController.getResumesBy
    },
    {
        method: 'GET',
        path: '/api/resumes/getRecruiterResumesBy',
        config: ResumeMongoController.getRecruiterResumesBy
    },
    {
        method: 'GET',
        path: '/api/resumes/{resumeID}',
        config: ResumeMongoController.getResumeByID
    },
    {
        method: 'POST',
        path: '/api/resumes',
        config: ResumeMongoController.createResume
    },
    {
        method: 'DELETE',
        path: '/api/resumes/recruiterDelete',
        config: ResumeMongoController.deleteResume
    },
    {
        method: 'DELETE',
        path: '/api/resumes/adminDelete',
        config: ResumeMongoController.deleteResumeAdmin
    }
    ]);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};