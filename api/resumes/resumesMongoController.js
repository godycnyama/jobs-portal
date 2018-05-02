'use strict';

const Joi = require('joi'),
  Boom = require('boom'),
  Resume = require('../models/mongodbModels/resume'),
  Recruiter = require('../models/mongodbModels/recruiter'),
  mongoose = require('mongoose');
const async = require('async');


exports.getResumesBy = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        query: {
            searchBy: Joi.string().required().trim().max(50),
            searchTerm: Joi.string().allow(['', null]).trim().max(50),
            pageNo: Joi.number().required(),
            perPage: Joi.number().required(),
            date: Joi.date().allow(['', null]),
            fromDate: Joi.date().allow(['', null]),
            toDate: Joi.date().allow(['', null])
        }
    },
    handler: function (request, reply) {
        var searchBy = request.query.searchBy;
        var date = new Date(request.query.date);
        date.setHours(0, 0, 0, 0);
        var dateFrom = new Date(request.query.dateFrom);
        dateFrom.setHours(0, 0, 0, 0);
        var dateTo = new Date(request.query.dateTo);
        dateTo.setHours(0, 0, 0, 0);
        switch (searchBy) {
            case 'All':
                Resume.paginate({}, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, resumes) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: resumes.docs,
                        total: resumes.total,
                        perPage: resumes.limit,
                        pageNo: resumes.page
                    });
                });
                break;
            case 'RecruiterID':
                Resume.paginate({ 'recruiterID': request.query.searchTerm }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, resumes) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: resumes.docs,
                        total: resumes.total,
                        perPage: resumes.limit,
                        pageNo: resumes.page
                    });
                });
                break;
            case 'RecruiterUserID':
                Resume.paginate({ 'recruiterUserID': new RegExp(request.query.searchTerm, 'i') }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, resumes) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: resumes.docs,
                        total: resumes.total,
                        perPage: resumes.limit,
                        pageNo: resumes.page
                    });
                });
                break;
            case 'Date':
                Resume.populate({ createdOn: date }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, resumes) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: resumes.docs,
                        total: resumes.total,
                        perPage: resumes.limit,
                        pageNo: resumes.page
                    });
                });
                break;
            case 'Date Range':
                Resume.populate({ createdOn: { $gt: dateFrom, $lt: dateTo } }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, resumes) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: resumes.docs,
                        total: resumes.total,
                        perPage: resumes.limit,
                        pageNo: resumes.page
                    });
                });
                break;
        }
    }
};

exports.getRecruiterResumesBy = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        query: {
            recruiterUserID:Joi.number().integer().required(),
            searchBy: Joi.string().required().trim().max(50),
            searchTerm: Joi.string().allow(['', null]).trim().max(50),
            pageNo: Joi.number().required(),
            perPage: Joi.number().required(),
            date: Joi.date().allow(['', null]),
            fromDate: Joi.date().allow(['', null]),
            toDate: Joi.date().allow(['', null])
        }
    },
    handler: function (request, reply) {
        var searchBy = request.query.searchBy;
        var date = new Date(request.query.date);
        date.setHours(0, 0, 0, 0);
        var dateFrom = new Date(request.query.dateFrom);
        dateFrom.setHours(0, 0, 0, 0);
        var dateTo = new Date(request.query.dateTo);
        dateTo.setHours(0, 0, 0, 0);
        switch (searchBy) {
            case 'All':
                Resume.paginate({ recruiterUserID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, resumes) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: resumes.docs,
                        total: resumes.total,
                        perPage: resumes.limit,
                        pageNo: resumes.page
                    });
                });
                break;
            case 'Qualification':
                Resume.paginate({ 'mainQualification': request.query.searchTerm, recruiterUserID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, resumes) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: resumes.docs,
                        total: resumes.total,
                        perPage: resumes.limit,
                        pageNo: resumes.page
                    });
                });
                break;
            case 'Profession':
                Resume.paginate({ 'profession': request.query.searchTerm, recruiterUserID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, resumes) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: resumes.docs,
                        total: resumes.total,
                        perPage: resumes.limit,
                        pageNo: resumes.page
                    });
                });
                break;
            case 'Preferred Job Titles':
                Resume.paginate({ 'preferredJobTitles': request.query.searchTerm, recruiterUserID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, resumes) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: resumes.docs,
                        total: resumes.total,
                        perPage: resumes.limit,
                        pageNo: resumes.page
                    });
                });
                break;
        }
    }
};

exports.getResumeByID = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        params: {
            resumeID: Joi.number().integer().required()
        }
    },
    handler: function (request, reply) {
        Resume.findOne({ '_id': request.params.resumeID }, function (err, resume) {
            if (err) {
                throw Boom.badRequest(err);
            }
            if (!resume) {
                throw Boom.badRequest('CV not found!');
            }
            return reply({resume: resume});
        });
    }
};

exports.createResume = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
  validate: {
    payload: {
      candidateID: Joi.number().required(),
      recruiterUserID: Joi.number().required(),
      mainQualification: Joi.string().trim().max(50),
      profession: Joi.string().trim().max(50),
      preferredJobTitles: Joi.string().trim().max(50).allow(['', null])
    }
  },
  handler: function (request, reply) {    
      async.waterfall([function (cb) {
          Resume.findOne({ 'recruiterUserID': request.payload.recruiterUserID, 'candidateID': request.payload.candidateID }, function (err, resume) {
              if (err) {
                  return reply(Boom.badRequest(err));
              }
              if (resume) {
                  return reply(Boom.badRequest('CV already exists in your database!'));
              }
              if (!resume) {
                  return cb(null);
              }
          })
      }, function (cb) {
          Recruiter.findOne({ 'userID': request.payload.recruiterUserID }, function (err, recruiter) {
              if (err) {
                  return reply(Boom.badRequest(err));
              }
              if (!recruiter) {
                  return reply(Boom.notFound('Recruiter not found'));        
              }
              if (recruiter) {
                  return cb(null,recruiter);
              }
          })
      }, function (recruiter, cb) {
          var resume = new Resume();
          resume.candidateID = request.payload.candidateID,
          resume.recruiterID = recruiter._id,
          resume.recruiterUserID = request.payload.recruiterUserID,
          resume.mainQualification = request.payload.mainQualification,
          resume.profession = request.payload.profession,
          resume.preferredJobTitles = request.payload.preferredJobTitles,
          resume.save(function (err, resume) {
              if (err) {
                  return reply(Boom.badRequest(err))          
              }
              return cb(null, resume);
          })
      }], function (err, resume) {
          if (err) {
              return reply(Boom.badRequest(err.message));
          }
          return reply({message:'CV added successfully!'}).code(201);
      })
      
  }
};

exports.deleteResume = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        query: {
            recruiterUserID: Joi.number().required(),
            resumeID: Joi.number().required()
        }
    },
    handler: function (request, reply) {
        Resume.findOneAndRemove({ candidateID: request.query.resumeID, recruiterUserID: request.query.recruiterUserID }, function (err, resume) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({ message: "CV removed successfully!"});
        });
    }
};

exports.deleteResumeAdmin = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    validate: {
        query: {
            resumeID: Joi.number().required()
        }
    },
    handler: function (request, reply) {
        Resume.findOneAndRemove({ _id: request.query.resumeID }, function (err, resume) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({ message: "CV removed successfully!" });
        });
    }
};



