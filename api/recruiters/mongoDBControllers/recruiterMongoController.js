'use strict';

const Joi = require('joi'),
  Boom = require('boom'),
  Recruiter = require('../../models/mongodbModels/recruiter'),
  User = require('../../models/mongodbModels/user'),
  mongoose = require('mongoose');
const async = require('async');
//const verifyUniqueRecruiter = require('../util/recruiterFunctions').verifyUniqueRecruiter;

exports.getRecruitersBy = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    validate: {
        query: {
            searchBy: Joi.string().alphanum().required().trim().min(1).max(50),
            searchTerm: Joi.string().alphanum().required().trim().min(1).max(50),
            pageNo: Joi.number().integer().required(),
            perPage: Joi.number().integer().required(),
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
                Recruiter.paginate({}, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, recruiters) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for recruiters,try again!"));
                    } else {
                        if (recruiters) {
                            return reply({
                                data: recruiters.docs,
                                total: recruiters.total,
                                perPage: recruiters.limit,
                                pageNo: recruiters.page
                            });
                        } else {
                            return reply(Boom.notFound("No recruiters found!"));
                        }
                    }
                });
                break;
            case 'RecruiterType':
                Recruiter.paginate({ 'recruiterType': request.query.searchTerm }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobSeekers) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for recruiters,try again!"));
                    } else {
                        if (recruiters) {
                            return reply({
                                data: recruiters.docs,
                                total: recruiters.total,
                                perPage: recruiters.limit,
                                pageNo: recruiters.page
                            });
                        } else {
                            return reply(Boom.notFound("No recruiters found"));
                        }
                    }
                });
                break;
            case 'CompanyName':
                Recruiter.paginate({ 'companyName': new RegExp(request.query.searchTerm, 'i') }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, recruiter) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for recruiter,try again!"));
                    } else {
                        if (recruiters) {
                            return reply({
                                data: recruiters.docs,
                                total: recruiters.total,
                                perPage: recruiters.limit,
                                pageNo: recruiters.page
                            });
                        } else {
                            return reply(Boom.notFound("No recruiter(s) found!"));
                        }
                    }
                });
                break;
            case 'Date':
                Recruiter.populate({ createdOn: date }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for recruiters,try again!"));
                    } else {
                        if (recruiters) {
                            return reply({
                                data: recruiters.docs,
                                total: recruiters.total,
                                perPage: recruiters.limit,
                                pageNo: recruiters.page
                            });
                        } else {
                            return reply(Boom.notFound("No recruiters found!"));
                        }
                    }
                });
                break;
            case 'Date Range':
                Recruiter.populate({ createdOn: { $gt: dateFrom, $lt: dateTo } }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, applications) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for recruiters,try again!"));
                    } else {
                        if (recruiters) {
                            return reply({
                                data: recruiters.docs,
                                total: recruiters.total,
                                perPage: recruiters.limit,
                                pageNo: recruiters.page
                            });
                        } else {
                            return reply(Boom.notFound("No recruiters found!"));
                        }
                    }
                });
                break;
        }
    }
};

exports.getRecruiterByID = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate:{
        params:{
            recruiterID: Joi.number().integer().required()
        }
    },
  handler: function (request, reply) {
    Recruiter.findOne({ '_id': request.params.recruiterID }, function (err, recruiter) {
       if(err){
          return reply(Boom.badRequest("An error occured while searching for recruiter,try again"));
      }else{
                if(recruiter){
                    return reply(recruiter);  
                }else{
                        return reply(Boom.notFound("No recruiter found"));  
                    }
      }             
    });
  }
};

exports.getRecruiterByUserID = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        params: {
            userID: Joi.number().integer().required()
        }
    },
    handler: function (request, reply) {
        Recruiter.findOne({ 'userID': request.params.userID }, function (err, recruiter) {
            if (err) {
                throw Boom.badRequest(err);
            }
            if (!recruiter) {
                throw Boom.badRequest('Recruiter not found!');
            }
            return reply({recruiter: recruiter});
        });
    }
};

exports.createRecruiter = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
  validate: {
    payload: {
      userID: Joi.number().integer().required(),
      companyName: Joi.string().required().trim().min(1).max(50),
      recruiterType: Joi.string().required().trim().min(1).max(50),
      introduction: Joi.string().required().trim().min(1).max(500),
      physicalAddress: Joi.string().required().trim().min(1).max(50),
      postalAddress: Joi.string().trim().min(1).max(50),
      tel: Joi.string().trim().min(1).max(50),
      mobile: Joi.string().trim().min(1).max(50),
      email: Joi.string().email().trim(),
      fax: Joi.string().trim().min(1).max(40),
      website: Joi.string().trim().min(1).max(50),
      companyLogo: Joi.string()
    }
  },
  handler: function (request, reply) {
      var recruiter = new Recruiter();
      recruiter.userID = request.payload.userID;
      recruiter.companyName = request.payload.companyName;
      recruiter.recruiterType = request.payload.recruiterType;
      recruiter.introduction = request.payload.introduction;
      recruiter.physicalAddress = request.payload.physicalAddress;
      recruiter.postalAddress = request.payload.postalAddress;
      recruiter.tel = request.payload.tel;
      recruiter.mobile = request.payload.mobile;
      recruiter.email = request.payload.email;
      recruiter.fax = request.payload.fax;
      recruiter.website = request.payload.website;
      recruiter.companyLogo = request.payload.companyLogo;
      recruiter.cvs = [];   
      async.waterfall([function (cb) {
          Recruiter.findOne({ 'userID': request.params.userID }, function (err, recruiter) {
              if (err) {
                  return reply(Boom.badRequest(err));
              }
              if (recruiter) {
                  return reply(Boom.badRequest('Recruiter details already created!'));        
              }
              if (!recruiter) {
                  return cb();
              }
          })
      }, function (cb) {
          recruiter.save(function (err, recruiter) {
              if (err) {
                  return reply(Boom.badRequest(err))          
              }
              return cb(null, recruiter);
          })
      }], function (err, message) {
          if (err) {
              return reply(Boom.badRequest(err.message));
          }
          return reply({message:'Recruiter details added successfully!'}).code(201);
      })
      
  }
};

exports.updateRecruiter = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        payload: {
            companyName: Joi.string().required().trim().max(50),
            recruiterType: Joi.string().required().trim().max(50),
            companySector: Joi.string().required().trim().max(50),
            yearFounded: Joi.string().required().trim().max(4),
            numberOfemployees: Joi.string().required().trim().max(50),
            introduction: Joi.string().required().trim().max(500),
            physicalAddress: Joi.string().trim().max(50).allow(['', null]),
            postalAddress: Joi.string().trim().max(50).allow(['', null]),
            tel: Joi.string().trim().max(50).allow(['', null]),
            mobile: Joi.string().trim().max(50).allow(['', null]),
            email: Joi.string().email().trim().max(50).allow(['', null]),
            fax: Joi.string().trim().max(40).allow(['', null]),
            website: Joi.string().trim().max(50).allow(['', null]),
            companyLogo: Joi.string().allow(['', null])
           
        }
    },
    handler: function (request, reply) {
        Recruiter.findOne({ '_id': request.params.recruiterID }, function (err, recruiter) {
            if (err) {
                return reply(Boom.badRequest(err));
            } else {
                if (recruiter) {                   
                    recruiter.companyName = request.payload.companyName;
                    recruiter.recruiterType = request.payload.recruiterType;
                    recruiter.companySector = request.payload.companySector;
                    recruiter.yearFounded = request.payload.yearFounded;
                    recruiter.numberOfemployees = request.payload.numberOfemployees;
                    recruiter.introduction = request.payload.introduction;
                    recruiter.physicalAddress = request.payload.physicalAddress;
                    recruiter.postalAddress = request.payload.postalAddress;
                    recruiter.tel = request.payload.tel;
                    recruiter.mobile = request.payload.mobile;
                    recruiter.email = request.payload.email;
                    recruiter.fax = request.payload.fax;
                    recruiter.website = request.payload.website;
                    recruiter.companyLogo = request.payload.companyLogo;                    
                    recruiter.save(function (err, recruiter0) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        } else {
                            if (recruiter0) {
                                return reply({ message: "Recruiter " + recruiter0.companyName + " updated successfully" });
                            } else {
                                return reply(Boom.badRequest("Recruiter " + recruiter.companyName + " could not be updated,try again"));
                            }
                        }
                    });
                } else {
                    return reply(Boom.notFound("Recruiter was not found"));
                }
            }


        });
    }
};

exports.addCV = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        payload: {
            recruiterUserID: Joi.number().required(),
            candidateID: Joi.number().required()                       
        }
    },
    handler: function (request, reply) {
        Recruiter.findOne({ userID: request.payload.recruiterUserID }, function (err, recruiter) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            if (!recruiter) {
                return reply(Boom.notFound("Recruiter was not found!"));
            }
            recruiter.cvs.push(request.payload.candidateID)
            recruiter.save(function (err, recruiter0) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return reply({
                        recruiter: recruiter0,
                        message: "CV added successfully!"});
            });
        });
    }
};

exports.deleteCV = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        query: {
            recruiterUserID: Joi.number().required(),
            cvID: Joi.number().required()
        }
    },
    handler: function (request, reply) {
        Recruiter.findOne({ userID: request.query.recruiterUserID }, function (err, recruiter) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            if (!recruiter) {
                return reply(Boom.notFound("Recruiter was not found!"));
            }
            for (var i = 0; i < recruiter.cvs.length; i++) {
                if (recruiter.cvs[i]._id === request.query.cvID) {
                    recruiter.cvs.splice(i, 1);
                }
            }
            recruiter.save(function (err, recruiter0) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return reply({
                    recruiter: recruiter0,
                    message: "CV removed successfully!"});
            });
        });
    }
};

exports.deleteRecruiter = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Recruiter.findOne({ '_id': request.query.recruiterID }, function (err, recruiter) {
                var recruiter0 = recruiter;
                if (err) {
                    return reply(Boom.badRequest(err.message));
                }
                if (!recruiter) {
                    return reply(Boom.badRequest("Job Seeker not found!"));
                }
                recruiter.remove(function (err, recruiter1) {
                    if (err) {
                        return reply(Boom.badRequest(err.message));
                    }
                    return cb(null, recruiter0);
                })
            })
        }, function (recruiter1, cb) {
            User.findOneAndRemove({ '_id': recruiter1.userID }, function (err, user) {
                if (err) {
                    return reply(Boom.badRequest(err.message));
                }
                return cb();
            })
        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err.message));
            }
            return reply({ message: 'Recruiter deleted successfully!' });
        })
    }
};

exports.deleteAllRecruiters = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
  handler: function (request, reply) {
    mongoose.connection.db.dropCollection('recruiters', function (err, result) {
      if (err) {
        return reply(Boom.badRequest("Could not delete recruiters"));
        
      }else{
          return reply({ message: "Recruiter database successfully deleted"});
      }
      
    });
  }
};
