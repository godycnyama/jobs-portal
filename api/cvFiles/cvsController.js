
'use strict';


const mongoose = require('mongoose');
const Boom = require('boom'); 
const Grid = require('gridfs-stream');
      Grid.mongo = mongoose.mongo;
      //const conn = require('../config/db');
const connection = require('../config/db').connection;
// conn.db
const gfs = Grid(connection.db);

exports.uploadCV = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter', 'jobseeker']
    },
    payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
    },
    handler: function (request, reply) {
            var writeStream = gfs.createWriteStream({
                filename: request.payload.file.hapi.filename,
                mode: 'w',
                content_type: request.payload.file.headers['content-type']
            });
            writeStream.on('close', function (file) {
                return reply({
                    fileID: file._id,
                    message: 'File' + file.filename + 'saved successfully'
                });
            });
            request.payload.file.pipe(writeStream)                                              
    }
};

exports.getCV = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter', 'jobseeker']
    },
    handler: function (request, reply) {              
               gfs.exist({ _id: request.params.fileID }, function (err, found) {
                  if (err) {
                    return reply(Boom.notFound('File not found'));
                }
                else {
                    var readStream = gfs.createReadStream({
                        _id: request.params.fileID
                    });
                    readStream.on('error', function (err) {
                        return reply(Boom.notFound('An error occured while reading the file'));
                        throw err;
                    })
                    return reply(readStream);
                }
            })                    
    }
};

exports.deleteCV = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter', 'jobseeker']
    },
    handler: function (request, reply) {
              gfs.remove({ _id: request.query.fileID }, function (err) {
                if (err) {
                    return reply(Boom.badRequest('Could not delete file'))
                }
                else {
                    return reply('File deleted successfully');
                }
            })       
    }
};
 
 

 
 
