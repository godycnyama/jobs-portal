'use strict';
var RecruiterMongoController = require('./mongoDBControllers/recruiterMongoController');
exports.register = function (server, options, next) {

    server.route([{
        method: 'GET',
        path: '/api/recruiters/getRecruitersBy',
        config: RecruiterMongoController.getRecruitersBy
    },
    {
        method: 'GET',
        path: '/api/recruiters/{recruiterID}',
        config: RecruiterMongoController.getRecruiterByID
    },
    {
        method: 'GET',
        path: '/api/recruiters/getByUserID/{userID}',
        config: RecruiterMongoController.getRecruiterByUserID
    },
    {
        method: 'POST',
        path: '/api/recruiters',
        config: RecruiterMongoController.createRecruiter
    },
    {
        method: 'POST',
        path: '/api/recruiters/{recruiterID}/cvs',
        config: RecruiterMongoController.addCV
    },
    {
        method: 'DELETE',
        path: '/api/recruiters/{recruiterID}/cvs',
        config: RecruiterMongoController.deleteCV
    },
    {
        method: 'PUT',
        path: '/api/recruiters/{recruiterID}',
        config: RecruiterMongoController.updateRecruiter
    },
    {
        method: 'DELETE',
        path: '/api/recruiters/deleteRecruiter',
        config: RecruiterMongoController.deleteRecruiter
    },
    {
        method: 'DELETE',
        path: '/api/recruiters/deleteAllRecruiters',
        config: RecruiterMongoController.deleteAllRecruiters
    }]);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};