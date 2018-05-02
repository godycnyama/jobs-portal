'use strict';
var AttachmentsController = require('./attachmentsController');
exports.register = function (server, options, next) {

    server.route([{
        method: 'GET',
        path: '/api/attachments/getAttachment/{fileID}',
        config: AttachmentsController.getAttachment
    },
    {
        method: 'POST',
        path: '/api/attachments/uploadAttachment',
        config: AttachmentsController.uploadAttachment
    },
    {
        method: 'POST',
        path: '/api/attachments/deleteAttachment',
        config: AttachmentsController.deleteAttachment
    }
    ]);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')    
};