'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  JobApplication = require('../../models/mongodbModels/jobApplication'),
  mongoose = require('mongoose'),
  JobSeeker = require('../../models/mongodbModels/jobSeeker'),
  Recruiter = require('../../models/mongodbModels/recruiter');
const async = require('async');



exports.getJobApplicationsBy = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        query: {
            searchBy: Joi.string().required().trim().max(50),
            searchTerm: Joi.string().trim().max(50).allow('', null),
            pageNo: Joi.number().required(),
            perPage: Joi.number().required(),
            date: Joi.date(),
            fromDate: Joi.date(),
            toDate: Joi.date()
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
                JobApplication.paginate({}, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
            case 'JobAdID':
                JobApplication.paginate({ 'jobAdID': request.params.jobAdID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
            case 'JobAdREF':
                JobApplication.paginate({ 'jobAdREF': new RegExp(request.query.searchTerm, 'i')}, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
            case 'Job Title':
                JobApplication.paginate({ 'jobTitle': new RegExp(request.query.searchTerm, 'i')}, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
            case 'RecruiterID':
                JobApplication.paginate({ 'recruiterID': request.payload.recruiterID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
            case 'Date':
                JobApplication.paginate({ createdOn: date }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
            case 'Date Range':
                JobApplication.paginate({ createdOn: { $gte: dateFrom, $lte: dateTo } }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
        }
    
  }
};

exports.getRecruiterJobApplicationsBy = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        query: {
            recruiterUserID: Joi.number().required(),
            searchBy: Joi.string().required().trim().max(50),
            searchTerm: Joi.string().trim().max(50).allow('',null),
            pageNo: Joi.number().required(),
            perPage: Joi.number().required(),
            date: Joi.date(),
            dateFrom: Joi.date(),
            dateTo: Joi.date()
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
                JobApplication.paginate({ recruiterUserID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
            case 'JobID':
                JobApplication.paginate({ 'jobAdID': request.query.searchTerm, recruiterUserID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    console.log(applications);
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
            case 'JobREF':
                JobApplication.paginate({ 'jobAdREF': new RegExp(request.query.searchTerm, 'i'), recruiterUserID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    console.log(applications);
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
            case 'Job Title':
                JobApplication.paginate({ 'jobTitle': new RegExp(request.query.searchTerm, 'i'), recruiterUserID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
            case 'Date':
                JobApplication.paginate({ createdOn: date, recruiterUserID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
            case 'Date Range':
                JobApplication.paginate({ createdOn: { $gte: dateFrom, $lte: dateTo }, recruiterUserID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: applications.docs,
                        total: applications.total,
                        perPage: applications.limit,
                        pageNo: applications.page
                    });
                });
                break;
        }

    }
};

exports.getJobApplicationByID = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    handler: function (request, reply) {
        JobApplication.findById(request.params.applicationID, function (err, application) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for job application,try again"));
            } else {
                if (application) {
                    return reply(application);
                } else {
                    return reply(Boom.badRequest("No application found"));
                }
            }
        });
    }
};

exports.checkApplicationExists = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter', 'jobseeker']
    },
    validate: {
        payload: {
            jobAdID: Joi.number().required(),
            jobSeekerUserID: Joi.number().required()       
        }
    },
    handler: function (request, reply) {

        JobApplication.findOne({ jobAdID: request.payload.jobAdID, jobSeekerUserID: request.payload.jobSeekerUserID}, function (err, application) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            if (application) {
                return reply(Boom.badRequest('You have already applied for this job!'));
            }
            return reply();
        });
    },
};


exports.createApplication = {
    auth: {
        strategy: 'jwt',
        scope: ['admin','jobseeker']
    },
  validate: {
    payload: {          
        jobAdID: Joi.number().required(),
        jobAdREF: Joi.string().required().trim().max(50),
        jobTitle: Joi.string().required().trim().max(50),
        recruiterID: Joi.number().required(),
        recruiterUserID: Joi.number().required(),
        jobSeekerUserID: Joi.number().required(),
        coverNote:Joi.string().required().trim().max(2000)           
        }
  },
  handler: function (request, reply) {
      async.waterfall([function (cb) {
          JobApplication.findOne({ jobAdID: request.payload.jobAdID,jobSeekerUserID: request.payload.jobSeekerUserID }, function (err, application) {
              if (err) {
                  return reply(Boom.badRequest(err));
              }
              if (application) {
                  return reply(Boom.badRequest('You have already applied for this job!'));
              }
             return cb();
          });
      }, function (cb) {
          JobSeeker.findOne({ userID: request.payload.jobSeekerUserID}, function (err, jobSeeker) {
              if (err) {
                  return reply(Boom.badRequest(err));
              }
              if (!jobSeeker) {
                  return reply(Boom.badRequest('JobSeeker not found!'));
              }
              return cb(null, jobSeeker);
          });
      }, function (jobSeeker0, cb) {
          var application = new JobApplication();
          application.jobAdID = request.payload.jobAdID;
          application.jobAdREF = request.payload.jobAdREF;
          application.jobTitle = request.payload.jobTitle;
          application.recruiterID = request.payload.recruiterID;
          application.recruiterUserID = request.payload.recruiterUserID;
          application.jobSeekerID = jobSeeker0._id;
          application.jobSeekerUserID = jobSeeker0.userID;
          application.jobSeekerEmail = jobSeeker0.email;
          application.firstName = jobSeeker0.firstName;
          application.middleName = jobSeeker0.middleName;
          application.lastName = jobSeeker0.lastName;
          application.coverNote = request.payload.coverNote;
          application.createdOn = new Date();
          application.createdOn.setHours(0, 0, 0, 0);
          application.save(function (err, application0) {
              if (err) {
                  return reply(Boom.badRequest(err));
              }
              return cb(null,application0);
          });
      }], function (err, result) {
          if (err) {
              return reply(Boom.badRequest(err));
          }
          return reply({ message: "You have successfully applied for the " + result.jobTitle + " " + result.jobAdREF + " job!"});
      });
  }
};



exports.deleteApplication = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    handler: function (request, reply) {
        JobApplication.findOneAndRemove({ '_id': request.query.applicationID, recruiterUserID: request.query.recruiterUserID }, function (err, application) {
            if (err) {
                return reply(Boom.badRequest(err.message));
            }
            return reply({ message: "Application deleted successfully" });
        });
    }
};

exports.deleteApplicationAdmin = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    handler: function (request, reply) {
        JobApplication.findOneAndRemove({ '_id': request.query.applicationID }, function (err, application) {
            if (err) {
                return reply(Boom.badRequest(err.message));
            }
            return reply({ message: "Application deleted successfully" });
        });
    }
};




