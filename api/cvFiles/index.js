'use strict';
var CVsController = require('./cvsController');
exports.register = function (server, options, next) {

    server.route([{
        method: 'GET',
        path: '/api/cvs/getCV/{fileID}',
        config: CVsController.getCV
    },
    {
        method: 'POST',
        path: '/api/cvs/uploadCV',
        config: CVsController.uploadCV
    },
    {
        method: 'POST',
        path: '/api/cvs/deleteCV',
        config: CVsController.deleteCV
    }
    ]);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')    
};