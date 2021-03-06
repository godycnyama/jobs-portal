
'use strict';


const mongoose = require('mongoose');
const Boom = require('boom');
const async = require('async');
const Grid = require('gridfs-stream');
      Grid.mongo = mongoose.mongo;
    //  const conn = require('../config/db');
const connection = require('../config/db').connection;
const gfs = Grid(connection.db);
const JobSeeker = require('../models/mongodbModels/jobSeeker');

exports.uploadAttachment = {
    auth: {
        strategy: 'jwt',
        scope: ['admin','recruiter','jobseeker']
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
            writeStream.on('error', function (file) {
                return reply(Boom.badRequest('An error occured while uploading the attachment file!'));
            });
            writeStream.on('close', function (file) {
                return reply({
                    fileID: file._id,
                    message: 'Attachment' + file.filename + 'saved successfully!'
                });
            });
            request.payload.file.pipe(writeStream);
    }
};

exports.getAttachment = {
    handler: function (request, reply) {          
               gfs.exist({ _id: request.params.fileID }, function (err, found) {
                  if (err) {
                    return reply(Boom.notFound('File not found!'));
                }
                else {
                    var readStream = gfs.createReadStream({
                        _id: request.params.fileID
                    });
                    readStream.on('error', function (err) {
                        return reply(Boom.badRequest(err.message));
                    })
                    return reply(readStream);
                }
            })                    
    }
};

exports.deleteAttachment = {
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            gfs.remove({ _id: request.query.fileID }, function (err) {
                if (err) {                   
                    return cb(new Error('An error occured while deleting attachment!'))
                }
                return cb(null, { message: 'Attachment deleted successfully' })
            })
        }, function (err,cb) {

        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err.message))
            }
            return reply({message: 'Attachment deleted successfully'})
        })
              gfs.remove({ _id: request.query.fileID }, function (err) {
                if (err) {
                    return reply(Boom.badRequest('An error occured while deleting attachment!'))
                }
                else {
                    return reply({ message:'Attachment deleted successfully!'});
                }
            })       
    }
};
 
 

 
 
