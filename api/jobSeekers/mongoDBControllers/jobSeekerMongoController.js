'use strict';

const Joi = require('joi'),
  Boom = require('boom'),
  JobSeeker = require('../../models/mongodbModels/jobSeeker'),
  User = require('../../models/mongodbModels/user'),
  mongoose = require('mongoose');
  mongoose.Promise = require('bluebird');
  const async = require('async');
  const Qualification = require('../../models/mongodbModels/qualification');
  const Skill = require('../../models/mongodbModels/skill');
  const Employment = require('../../models/mongodbModels/employment');
  const Language = require('../../models/mongodbModels/language');
  const Referee = require('../../models/mongodbModels/referee');
  const CV = require('../../models/mongodbModels/cv');
  const Attachment = require('../../models/mongodbModels/attachment');
  const Readable = require('stream').Readable;
  const Grid = require('gridfs-stream');
  Grid.mongo = mongoose.mongo;
  const connection = require('../../config/db').connection;
  const gfs = Grid(connection.db);
  var events = require('events');
  const notifier = new events.EventEmitter();
  const retry = require('retry');
  const _ = require('underscore');


  exports.getAllJobSeekers = {
      auth: {
        strategy: 'jwt',
        scope: ['admin','recruiter']
    },
  handler: function (request, reply) {
    JobSeeker.find({}, function (err, jobSeekers) {
      if(err){
          return reply(Boom.badRequest(err));
      }
      if(!jobSeekers){
          return reply(Boom.notFound("No job Seekers found"));
      }
      return reply({ data: jobSeekers })
    });
  }
};

  exports.jobSeekersAdvancedSearch = {
      auth: {
          strategy: 'jwt',
          scope: ['admin', 'recruiter']
      },
    validate: {
        query: {
            pageNo: Joi.number().required(),
            perPage: Joi.number().required(),
            qualification: Joi.string().required().trim().max(50),
            skill: Joi.string().required().trim().max(50),
            profession: Joi.string().required().trim().max(50),
            preferedJobTitles: Joi.string().required().trim().max(50),
            preferedJobTypes: Joi.string().required().trim().max(50),
            preferedJobLocations: Joi.string().required().trim().max(50),
            locationTown: Joi.string().required().trim().max(50),
            locationCountry: Joi.string().required().trim().max(50)
        }
    },
    handler: function (request, reply) {
        JobSeeker.paginate({
            mainQualification: new RegExp(request.query.qualification, 'i'),
            'skills.description': new RegExp(request.query.skill, 'i'),
            profession: new RegExp(request.query.profession, 'i'),
            locationTown: new RegExp(request.query.locationTown, 'i'),
            locationCountry: new RegExp(request.query.locationCountry, 'i'),
            preferredJobTitles: new RegExp(request.query.preferredJobTitles, 'i'),
            preferredJobTypes: new RegExp(request.query.preferredJobTypes, 'i'),
            preferredJobLocations: new RegExp(request.query.preferredJobLocations, 'i')
        }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobSeekers) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            if (jobSeekers.total === 0) {
                return reply(Boom.notFound("No job Seekers found"));
            }
            return reply({
                data: jobSeekers.docs,
                total: jobSeekers.total,
                perPage: jobSeekers.limit,
                pageNo: jobSeekers.page
            });
        });
    }
};

  exports.getJobSeekersBy = {
      auth: {
          strategy: 'jwt',
          scope: ['admin', 'recruiter']
      },
    validate:{
        query: {
            searchBy: Joi.string().required().trim().max(50),
            searchTerm: Joi.string().allow(['', null]).trim().max(50),
            pageNo: Joi.number().required(),
            perPage: Joi.number().required(),
            date: Joi.date().allow(['', null]),
            fromDate: Joi.date().allow(['', null]),
            toDate: Joi.date().allow(['', null]),
            qualification: Joi.string().allow(['', null]).trim().max(50),
            profession: Joi.string().allow(['', null]).trim().max(50),
            skill: Joi.string().allow(['', null]).trim().max(50),
            locationTown: Joi.string().allow(['', null]).trim().max(50),
            locationCountry: Joi.string().allow(['', null]).trim().max(50),
            preferredJobTitles: Joi.string().allow(['', null]).trim().max(50),
            preferredJobTypes: Joi.string().allow(['', null]).trim().max(50),
            preferredJobLocations: Joi.string().allow(['', null]).trim().max(50),
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
                JobSeeker.paginate({}, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobSeekers) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: jobSeekers.docs,
                        total: jobSeekers.total,
                        perPage: jobSeekers.limit,
                        pageNo: jobSeekers.page
                    });
                });
                break;
            case 'Qualification':
                Qualification.find({ title: new RegExp(request.query.searchTerm, 'i') }, function (err, qualifications) {
                    var docs = [];
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    for (var i = 0; i < qualifications.length; i++) {
                        GetJobSeeker(qualifications[i].email, function (err, jobSeeker) {
                            if (err) {
                                return reply(Boom.badRequest(err));
                            }
                            AddToArray(jobSeeker, docs);
                            if (i == qualifications.length) {
                                PaginateArray(docs, request.query.perPage, request.query.pageNo);
                                return reply({
                                    data: docs,
                                    total: docs.length,
                                    perPage: request.query.perPage,
                                    pageNo: request.query.pageNo
                                });
                            }
                        });
                    }
                });
                break;
            case 'Skill':
                Skill.find({ description: new RegExp(request.query.searchTerm, 'i') }, function (err, skills) {
                    var docs = [];
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    for (var i = 0; i < skills.length; i++) {
                        GetJobSeeker(skills[i].email, function (err, jobSeeker) {
                            if (err) {
                                return reply(Boom.badRequest(err));
                            }
                            AddToArray(jobSeeker, docs);
                            if (i == skills.length) {
                                PaginateArray(docs, request.query.perPage, request.query.pageNo);
                                return reply({
                                    data: docs,
                                    total: docs.length,
                                    perPage: request.query.perPage,
                                    pageNo: request.query.pageNo
                                });
                            }
                        });
                    }
                });
                break;
            case 'Profession':
                JobSeeker.paginate({ profession: new RegExp(request.query.searchTerm, 'i') }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobSeekers) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: jobSeekers.docs,
                        total: jobSeekers.total,
                        perPage: jobSeekers.limit,
                        pageNo: jobSeekers.page
                    });
                });
                break;
            case 'Town Location':
                JobSeeker.paginate({ locationTown: new RegExp(request.query.searchTerm, 'i') }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobSeekers) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: jobSeekers.docs,
                        total: jobSeekers.total,
                        perPage: jobSeekers.limit,
                        pageNo: jobSeekers.page
                    });
                });
                break;
            case 'Country Location':
                JobSeeker.paginate({ locationCountry: new RegExp(request.query.searchTerm, 'i') }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobSeekers) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: jobSeekers.docs,
                        total: jobSeekers.total,
                        perPage: jobSeekers.limit,
                        pageNo: jobSeekers.page
                    });
                });
                break;
            case 'Prefered Job Titles':
                JobSeeker.paginate({ preferredJobTitles: new RegExp(request.query.searchTerm, 'i') }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobSeekers) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: jobSeekers.docs,
                        total: jobSeekers.total,
                        perPage: jobSeekers.limit,
                        pageNo: jobSeekers.page
                    });
                });
                break;
            case 'Prefered Job Types':
                JobSeeker.paginate({ preferredJobTypes: new RegExp(request.query.searchTerm, 'i') }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobSeekers) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: jobSeekers.docs,
                        total: jobSeekers.total,
                        perPage: jobSeekers.limit,
                        pageNo: jobSeekers.page
                    });
                });
                break;
            case 'Prefered Job Locations':
                JobSeeker.paginate({ preferredJobLocations: new RegExp(request.query.searchTerm, 'i') }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobSeekers) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: jobSeekers.docs,
                        total: jobSeekers.total,
                        perPage: jobSeekers.limit,
                        pageNo: jobSeekers.page
                    });
                });
                break;
            case 'Advanced Search':
                JobSeeker.paginate({ 'qualifications.title': new RegExp(request.query.qualification, 'i'), profession: new RegExp(request.query.profession, 'i'), 'skills.description': new RegExp(request.query.skill, 'i'), locationTown: new RegExp(request.query.locationTown, 'i'), locationCountry: new RegExp(request.query.locationCountry, 'i'), preferredJobTitles: new RegExp(request.query.preferredJobTitles, 'i'), preferredJobTypes: new RegExp(request.query.preferredJobTypes, 'i'), preferredJobLocations: new RegExp(request.query.preferredJobLocations, 'i') }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobSeekers) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return reply({
                        data: jobSeekers.docs,
                        total: jobSeekers.total,
                        perPage: jobSeekers.limit,
                        pageNo: jobSeekers.page
                    });
                });
                break;
        }
    }
};

  exports.getJobSeekerByID = {
    handler: function (request, reply) {
        JobSeeker.findOne({ '_id': request.params.jobSeekerID }, function (err, jobSeeker) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            if (!jobSeeker) {
                return reply(Boom.badRequest("Job Seeker not found!"));
            }
            return reply({jobSeeker: jobSeeker})
        })
    }
};

exports.getJobSeekerByEmail = {
    handler: function (request, reply) {
        JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            if (!jobSeeker) {
                return reply(Boom.badRequest("Job Seeker not found!"));
            }
            return reply({ jobSeeker: jobSeeker })
        })
    }
};

exports.deleteJobSeeker = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            JobSeeker.findOne({ 'email': request.query.email }, function (err, jobSeeker) {
                var jobSeeker0 = jobSeeker;
                if (err) {
                    return reply(Boom.badRequest(err.message));
                }
                if (!jobSeeker) {
                    return reply(Boom.badRequest("Job Seeker not found!"));
                }
                jobSeeker.remove(function (err, jobSeeker1) {
                    if (err) {
                        return reply(Boom.badRequest(err.message));
                    }
                    return cb(null, jobSeeker0);
                })
            })
        }, function (jobSeeker1,cb) {
            User.findOneAndRemove({ '_id': jobSeeker1.userID }, function (err, user) {
                if (err) {
                    return reply(Boom.badRequest(err.message));
                }
                return cb();
            })
        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err.message));
            }
            return reply({message: 'Job Seeker deleted successfully!'});
        })      
    }
};

exports.createJobSeeker = {
  validate: {
      payload: {
            userID: Joi.number().required(),
            email: Joi.string().email().required(),                    
            firstName: Joi.string().required().trim().max(50),
            middleName: Joi.string().allow(['',null]).trim().max(50),
            lastName: Joi.string().required().trim().max(50),
            gender: Joi.string().required().trim().max(50),
            birthDate: Joi.date().required(),
            nationality: Joi.string().required().trim().max(50),
            profession: Joi.string().required().trim().max(100),
            mainQualification: Joi.string().allow(['', null]).trim().max(500),
            introduction: Joi.string().allow(['', null]).trim().max(500),
            homeTel: Joi.string().allow(['', null]).trim().max(50),
            workTel: Joi.string().allow(['', null]).trim().max(50),
            mobile: Joi.string().allow(['', null]).trim().max(50),
            address: Joi.string().required().trim().max(150),
            locationTown: Joi.string().required().trim().max(50),
            locationCountry: Joi.string().required().trim().max(50),
            linkedInProfile: Joi.string().allow(['', null]).trim().max(150),
            website: Joi.string().allow(['', null]).trim().max(150),
            professionalAffiliations: Joi.string().allow(['', null]).trim().max(500),
            noticePeriod: Joi.string().required().trim().max(50),
            requiredSalaryCurrency: Joi.string().required().trim().max(150),
            requiredMinimumSalary: Joi.number().required(),
            requiredMaximumSalary: Joi.number().required(),
            photo: Joi.string().allow(['', null]).trim(),
            preferredJobTitles: Joi.string().allow(['', null]).trim().max(500),
            preferredJobTypes: Joi.string().allow(['', null]).trim().max(500),
            preferredJobLocations: Joi.string().allow(['',null]).trim().max(500),
            
        }
    },
  handler: function (request, reply) {
      var jobSeeker = new JobSeeker();
      jobSeeker.userID = request.payload.userID
      jobSeeker.email = request.payload.email;
      jobSeeker.firstName = request.payload.firstName;
      jobSeeker.middleName = request.payload.middleName;
      jobSeeker.lastName = request.payload.lastName;
      jobSeeker.gender = request.payload.gender;
      jobSeeker.birthDate = request.payload.birthDate;
      jobSeeker.nationality = request.payload.nationality;
      jobSeeker.profession = request.payload.profession;
      jobSeeker.mainQualification = request.payload.mainQualification;
      jobSeeker.introduction = request.payload.introduction;
      jobSeeker.homeTel = request.payload.homeTel;
      jobSeeker.workTel = request.payload.workTel;
      jobSeeker.mobile = request.payload.mobile;
      jobSeeker.email = request.payload.email;
      jobSeeker.address = request.payload.address;
      jobSeeker.locationTown = request.payload.locationTown;
      jobSeeker.locationCountry = request.payload.locationCountry;
      jobSeeker.linkedInProfile = request.payload.linkedInProfile;
      jobSeeker.website = request.payload.website;
      jobSeeker.professionalAffiliations = request.payload.professionalAffiliations;
      jobSeeker.noticePeriod = request.payload.noticePeriod;
      jobSeeker.requiredSalaryCurrency = request.payload.requiredSalaryCurrency;
      jobSeeker.requiredMinimumSalary = request.payload.requiredMinimumSalary;
      jobSeeker.requiredMaximumSalary = request.payload.requiredMaximumSalary;
      jobSeeker.photo = request.payload.photo;
      jobSeeker.preferredJobTitles = request.payload.preferredJobTitles;
      jobSeeker.preferredJobTypes = request.payload.preferredJobTypes;
      jobSeeker.preferredJobLocations = request.payload.preferredJobLocations;
      async.waterfall([function (cb) {
          JobSeeker.findOne({ 'userID': request.params.userID }, function (err, jobSeeker) {
              if (err) {
                  return cb(new Error('An error occured while creating  jobSeeker details,try again!'))
              }
              if (jobSeeker) {
                  return cb(new Error('JobSeeker details already created!'))
              }
              if (!jobSeeker) {
                  return cb();
              }
          })
      }, function (cb) {
          jobSeeker.save(function (err, jobSeeker) {
              if (err) {
                  console.log(err);
                  return cb(new Error('An error occured while creating  jobSeeker details,try again!'))
              }
              return cb(null, jobSeeker);
          })
      }], function (err, jobSeeker) {
          if (err) {
              return reply(Boom.badRequest(err.message));
          }
          return reply({jobSeeker: jobSeeker,message: 'Job Seeker details added successfully!'}).code(201);
      })
  }
};

exports.addQualification = {
    validate: {
        params: {
            email: Joi.string().email(),
        },
        payload: {
                email: Joi.string().email(),
                title: Joi.string().required().trim().max(50),
                level: Joi.string().required().trim().max(50),
                institution: Joi.string().required().trim().max(50),
                locationTown: Joi.string().required().trim().max(50),
                locationCountry: Joi.string().required().trim().max(50),
                startMonth: Joi.string().required().trim().max(50),
                endMonth: Joi.string().required().trim().max(50),
                startYear: Joi.number().integer().required(),
                endYear: Joi.number().integer().required(),
                status: Joi.string().required().trim().max(50), //e.g.'Complete','InComplete','In Progress'
                majors: Joi.string().required().trim().max(1000)   
        }
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {          
            Qualification.create(request.payload, function (err, qualification) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb(null, qualification);
            })
        }, function (qualification0,cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!jobSeeker) {
                    return reply(Boom.notFound('Job Seeker not found!'));
                }
                jobSeeker.qualifications.push(qualification0._id);
                jobSeeker.save(function (err,jobSeeker0) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobSeeker0);
                })
            })

        }], function (err, jobSeeker1) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Qualification added successfully",
                jobSeeker: jobSeeker1
            });
        });
    }
};

exports.updateQualification = {
    validate: {
        params: {
            email: Joi.string().email().required(),
            qualificationID: Joi.number().integer().required()
        },
        payload: {               
                title: Joi.string().required().trim().max(50),
                level: Joi.string().required().trim().max(50),
                institution: Joi.string().required().trim().max(50),
                locationTown: Joi.string().required().trim().max(50),
                locationCountry: Joi.string().required().trim().max(50),
                startMonth: Joi.string().required().trim().max(50),
                endMonth: Joi.string().required().trim().max(50),
                startYear: Joi.number().integer().required(),
                endYear: Joi.number().integer().required(),
                status: Joi.string().required().trim().max(50), //e.g.'Complete','InComplete','In Progress'
                majors: Joi.string().required().trim().max(1000)        
        }
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Qualification.findByIdAndUpdate(request.params.qualificationID,
            {
                title: request.payload.title,
                level: request.payload.level,
                institution: request.payload.institution,
                locationTown: request.payload.locationTown,
                locationCountry: request.payload.locationCountry,
                startMonth: request.payload.startMonth,
                endMonth: request.payload.endMonth,
                startYear: request.payload.startYear,
                endYear: request.payload.endYear,
                status: request.payload.status,
                majors: request.payload.majors
            },
            function (err, qualification) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb();
            });
        }, function (cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!jobSeeker) {
                    return reply(Boom.badRequest('Job Seeker not found!'));            
                }           
               return cb(null, jobSeeker);
                
            })
        }], function (err,result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Qualification updated successfully",
                jobSeeker: result
            });
        })       
        
    }
};

exports.deleteQualification = {
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Qualification.findByIdAndRemove(request.params.qualificationID, function (err) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb();
            });
        }, function (cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                for (var i = 0; i < jobSeeker.qualifications.length; i++) {
                    if (jobSeeker.qualifications[i]._id == request.params.qualificationID) {
                        jobSeeker.qualifications.splice(i, 1);
                    }
                };
                jobSeeker.save(function (err, jobSeeker0) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobSeeker0);
                })

            });
        }], function (err,result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Qualification deleted successfully",
                jobSeeker: result
            });
        });     
    }
};

exports.addSkill = {
    validate: {
        params: {
            email: Joi.string().email(),
        },
        payload: {
                email: Joi.string().email(),
                description: Joi.string().required().trim().max(50),
                skillLevel: Joi.string().required().trim().max(50),
                experience: Joi.string().required().trim().max(50),
                lastDateUsedMonth: Joi.string().allow(['', null]).trim().max(50),
                lastDateUsedYear: Joi.number().allow(['', null]),
                isCurrent: Joi.boolean().required()       
        }
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Skill.create(request.payload, function (err, skill) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb(null, skill);
            })
        }, function (skill0, cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!jobSeeker) {
                    return reply(Boom.badRequest('Job Seeker not found!'));                  
                }
                jobSeeker.skills.push(skill0._id);
                jobSeeker.save(function (err, jobSeeker0) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobSeeker0);
                })
            })

        }], function (err, jobSeeker1) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Skill added successfully",
                jobSeeker: jobSeeker1
            });
        });
    }
};

exports.updateSkill = {
    validate: {
        params: {
            email: Joi.string().email().required(),
            skillID: Joi.number().integer().required()
        },
        payload: {              
                description: Joi.string().required().trim().max(50),
                skillLevel: Joi.string().required().trim().max(50),
                experience: Joi.string().required().trim().max(50),
                lastDateUsedMonth: Joi.string().allow(['', null]).trim().max(50),
                lastDateUsedYear: Joi.number().allow(['', null]),
                isCurrent: Joi.boolean().required()
        }
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Skill.findByIdAndUpdate(request.params.skillID,
            {
                skillLevel: request.payload.skillLevel,
                experience: request.payload.experience,
                lastDateUsedMonth: request.payload.lastDateUsedMonth,
                lastDateUsedYear: request.payload.lastDateUsedYear,
                isCurrent: request.payload.isCurrent
            },
            function (err, skill) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb();
            });
        }, function (cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!jobSeeker) {
                    return reply(Boom.notFound('Job Seeker not found!'));         
                }
                return cb(null, jobSeeker);
            })
        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Skill updated successfully",
                jobSeeker: result
            });
        })
    }
};

exports.deleteSkill = {
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Skill.findByIdAndRemove(request.params.skillID, function (err) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb();
            });
        }, function (cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                for (var i = 0; i < jobSeeker.skills.length; i++) {
                    if (jobSeeker.skills[i]._id == request.params.skillID) {
                        jobSeeker.skills.splice(i, 1);
                    }
                };
                jobSeeker.save(function (err, jobSeeker0) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobSeeker0);
                })

            });
        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Skill deleted successfully",
                jobSeeker: result
            });
        });       
    }
};

exports.addEmployment = {
    validate: {
        params: {
            email: Joi.string().email(),
        },
        payload: {
                email: Joi.string().email(),
                jobTitle: Joi.string().required().trim().max(50),
                jobLevel: Joi.string().required().trim().max(50), //e.g 'None','Junior','Skilled','Senior','Management','Executive'
                jobType: Joi.string().required().trim().max(50), //e.g 'Permanent','Contract','Temporary'
                companyName: Joi.string().required().trim().max(50),
                companySector: Joi.string().required().trim().max(50), //e.g 'Engineering','Construction','Education','Hospitality','Medical'
                startMonth: Joi.string().required().trim().max(50),
                endMonth: Joi.string().allow(['',null]).trim().max(50),
                startYear: Joi.string().required().trim().max(50),
                endYear: Joi.string().allow(['',null]).trim().max(50),
                isCurrent: Joi.boolean().required(),
                locationTown: Joi.string().required().trim().max(50),
                locationCountry: Joi.string().required().trim().max(50),
                duties: Joi.string().required().trim().max(10000),
                reasonsForLeaving: Joi.string().allow(['',null]).trim().max(150)
        }
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {          
            Employment.create(request.payload, function (err, employment) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb(null, employment);
            })
        }, function (employment0,cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!jobSeeker) {
                    return reply(Boom.notFound('Job Seeker not found!'));           
                }
                jobSeeker.employment.push(employment0._id);
                jobSeeker.save(function (err,jobSeeker0) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobSeeker0);
                })
            })

        }], function (err, jobSeeker1) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Employment record added successfully",
                jobSeeker: jobSeeker1
            });
        });
    }
};

exports.updateEmployment = {
    validate: {
        params: {
            email: Joi.string().email(),
            employmentID: Joi.number(),
        },
        payload: {              
                jobTitle: Joi.string().required().trim().max(50),
                jobLevel: Joi.string().required().trim().max(50), //e.g 'None','Junior','Skilled','Senior','Management','Executive'
                jobType: Joi.string().required().trim().max(50), //e.g 'Permanent','Contract','Temporary'
                companyName: Joi.string().required().trim().max(50),
                companySector: Joi.string().required().trim().max(50), //e.g 'Engineering','Construction','Education','Hospitality','Medical'
                startMonth: Joi.string().required().trim().max(50),
                endMonth: Joi.string().allow(['',null]).trim().max(50),
                startYear: Joi.string().required().trim().max(50),
                endYear: Joi.string().allow(['',null]).trim().max(50),
                isCurrent: Joi.boolean().required(),
                locationTown: Joi.string().required().trim().max(50),
                locationCountry: Joi.string().required().trim().max(50),
                duties: Joi.string().required().trim().min(1).max(10000),
                reasonsForLeaving: Joi.string().allow(['',null]).trim().max(150)         
        }
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Employment.findByIdAndUpdate(request.params.employmentID,
            {
                jobTitle: request.payload.jobTitle,
                jobLevel: request.payload.level,
                jobType: request.payload.jobType,
                companyName: request.payload.companyName,
                companySector: request.payload.companySector,
                startMonth: request.payload.startMonth,
                endMonth: request.payload.endMonth,
                startYear: request.payload.startYear,
                endYear: request.payload.endYear,
                locationTown: request.payload.locationTown,
                locationCountry: request.payload.locationCountry,
                isCurrent: request.payload.isCurrent,
                duties: request.payload.duties,
                reasonsForLeaving: request.payload.reasonsForLeaving
            },
            function (err, employment) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb();
            });
        }, function (cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!jobSeeker) {
                    return reply(Boom.badRequest('Job Seeker not found!'));       
                }
                return cb(null, jobSeeker);
            })
        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Employment updated successfully",
                jobSeeker: result
            });
        })      
    }
};

exports.deleteEmployment = {
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Employment.findByIdAndRemove(request.params.employmentID, function (err) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb();
            });
        }, function (cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                for (var i = 0; i < jobSeeker.employment.length; i++) {
                    if (jobSeeker.employment[i]._id == request.params.employmentID) {
                        jobSeeker.employment.splice(i, 1);
                    }
                };
                jobSeeker.save(function (err, jobSeeker0) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobSeeker0);
                })

            });
        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Employment record deleted successfully",
                jobSeeker: result
            });
        });      
    }
};

exports.addLanguage = {
    validate: {
        params: {
            email: Joi.string().email(),
        },
        payload: {
                email: Joi.string().email(),
                languageName: Joi.string().required().trim().min(1).max(50),
                spokenAbility: Joi.string().required().trim().min(1).max(50),
                writtenAbility: Joi.string().required().trim().min(1).max(50)  
        }
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Language.create(request.payload, function (err, language) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb(null, language);
            })
        }, function (language0, cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!jobSeeker) {
                    return reply(Boom.notFound('Job Seeker not found!'));         
                }
                jobSeeker.languages.push(language0._id);
                jobSeeker.save(function (err, jobSeeker0) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobSeeker0);
                })
            })

        }], function (err, jobSeeker1) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Language added successfully",
                jobSeeker: jobSeeker1
            });
        });
    }
};

exports.updateLanguage = {
    validate: {
        params: {
            email: Joi.string().email(),
            languageID: Joi.number().integer()
        },
        payload: {                       
                languageName: Joi.string().required().trim().min(1).max(50),
                spokenAbility: Joi.string().required().trim().min(1).max(50),
                writtenAbility: Joi.string().required().trim().min(1).max(50)      
        }
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Language.findByIdAndUpdate(request.params.languageID,
            {
                languageName: request.payload.languageName,
                spokenAbility: request.payload.spokenAbility,
                writtenAbility: request.payload.writtenAbility
            },
            function (err, language) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb();
            });
        }, function (cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!jobSeeker) {
                    return reply(Boom.badRequest('Job Seeker not found!'));         
                }
                return cb(null, jobSeeker);
            })
        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Language updated successfully",
                jobSeeker: result
            });
        })     
    }
};

exports.deleteLanguage = {
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Language.findByIdAndRemove(request.params.langaugeID, function (err) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb();
            });
        }, function (cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                for (var i = 0; i < jobSeeker.languages.length; i++) {
                    if (jobSeeker.languages[i]._id == request.params.languageID) {
                        jobSeeker.languages.splice(i, 1);
                    }
                };
                jobSeeker.save(function (err, jobSeeker0) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobSeeker0);
                })

            });
        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Language deleted successfully",
                jobSeeker: result
            });
        });    
    }
};

exports.addReferee = {
    validate: {
        params: {
            email: Joi.string().email(),
        },
        payload: {
            email: Joi.string().email(),
            fullName: Joi.string().required().trim().max(50),
            title: Joi.string().required().trim().max(50),
            organisationName: Joi.string().required().trim().max(50),
            tel: Joi.string().required().trim().max(50),
            cell: Joi.string().required().trim().max(50),
            refereeEmail: Joi.string().email()    
        }
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Referee.create(request.payload, function (err, referee) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb(null, referee);
            })
        }, function (referee0, cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!jobSeeker) {
                    return reply(Boom.badRequest('Job Seeker not found!'));                  
                }
                jobSeeker.referees.push(referee0._id);
                jobSeeker.save(function (err, jobSeeker0) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobSeeker0);
                })
            })

        }], function (err, jobSeeker1) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Referee added successfully",
                jobSeeker: jobSeeker1
            });
        });
    }
};

exports.updateReferee = {
    validate: {
        params: {
            email: Joi.string().email(),
            refereeID: Joi.number().integer()
        },
        payload: {
            fullName: Joi.string().required().trim().max(50),
            title: Joi.string().required().trim().max(50),
            organisationName: Joi.string().required().trim().max(50),
            tel: Joi.string().required().trim().max(50),
            cell: Joi.string().required().trim().max(50),
            refereeEmail: Joi.string().email()
        }
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Referee.findByIdAndUpdate(request.params.refereeID,
            {
                fullName: request.payload.fullName,
                title: request.payload.title,
                organisationName: request.payload.organisationName,
                tel: request.payload.tel,
                cell: request.payload.cell,
                refereeEmail: request.payload.refereeEmail
            },
            function (err, referee) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb();
            });
        }, function (cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!jobSeeker) {
                    return reply(Boom.notFound('Job Seeker not found!'));              
                }
                return cb(null, jobSeeker);
            })
        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Referee updated successfully",
                jobSeeker: result
            });
        })
    }
};

exports.deleteReferee = {
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Referee.findByIdAndRemove(request.params.refereeID, function (err) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb();
            });
        }, function (cb) {
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                for (var i = 0; i < jobSeeker.referees.length; i++) {
                    if (jobSeeker.referees[i]._id == request.params.refereeID) {
                        jobSeeker.referees.splice(i, 1);
                    }
                };
                jobSeeker.save(function (err, jobSeeker0) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobSeeker0);
                })

            });
        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "Referee deleted successfully",
                jobSeeker: result
            });
        });
    }
};

exports.uploadCV = {
    payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
    },
    handler: function (request, reply) {
        var file_name = request.payload.file.hapi.filename;
        var file_ext = file_name.split('.').pop().toLowerCase();
     
        if (!isAllowedFileExtension(file_ext)) {
            throw Boom.badRequest('File type not allowed!');
        };

        var contentType = GetContentType(file_ext);
        console.log(contentType);
        var cv = {
            fileID: '',
            fileName: '',
            content_type: contentType
        };
        var writeStream = gfs.createWriteStream({
            filename: request.payload.file.hapi.filename,
            mode: 'w',
            content_type: contentType,
            metadata: {
                userEmail: request.payload.userEmail
            }
        });
        writeStream.on('error', function (err) {
            console.log('writestream error');
            throw Boom.badRequest(err);
        });
        writeStream.on('close', function (_file) {
            //send cvAdded signal
            notifier.emit("cvAdded", _file);
            
        });
        request.payload.file.pipe(writeStream);
        notifier.on('cvAdded', (_file) => {
            if (_file.metadata.userEmail === request.payload.userEmail) {
                JobSeeker.findOne({ 'email': request.payload.userEmail }, function (err, jobSeeker) {
                    if (err) {
                        console.log('Job Seeker find error');
                        return reply(Boom.badRequest(err));
                    }
                    if (!jobSeeker) {
                        return reply(Boom.notFound('Job Seeker not found!'));
                    }
                    console.log(_file);
                    jobSeeker.cv.fileID = _file._id;
                    jobSeeker.cv.fileName = _file.filename;
                    jobSeeker.cv.content_type = _file.contentType;
                    jobSeeker.save(function (err, jobSeeker) {
                        if (err) {
                            console.log(err);
                            console.log('Job Seeker save error');
                            return reply(Boom.badRequest(err));
                        }
                        console.log(jobSeeker);
                        return reply({
                            message: "CV " + jobSeeker.cv.fileName + " uploaded successfully!",
                            jobSeeker: jobSeeker
                        });
                    })

                })
            }
        })
    }
};

exports.setAsDefaultCV = {
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            // set the current default cv to false
            CV.findOne({ 'email': request.params.email, _id: { $ne: request.params.cvID },isDefault: true }, function (err, cv) {
                if (err) {
                    return cb(err);
                }
                cv.isDefault = false;
                cv.save(function (err, cv0) {
                    if (err) {
                        return cb(err);
                    }
                    return cb(null);
                })
            })
        }, function (cb) {
            //set cv to default true
            CV.findOne({ 'email': request.params.email, _id: request.params.cvID }, function (err, cv) {
                if (err) {
                    return cb(err);
                }
                cv.isDefault = true;
                cv.save(function (err, cv0) {
                    if (err) {
                        return cb(err);
                    }
                    return cb(null, cv0);
                })
            })

        }, function (cb) {
            //get Job Seeker
            JobSeeker.findOne({ 'email': request.params.email }, function (err, jobSeeker) {
                if (err) {
                    return cb(err);
                }
                return cb(null, jobSeeker);
            })
        }], function (err,result) {
            if (err) {
                throw Boom.badRequest(err);
            }
            //return job seeker
            return reply({
                message: "Default CV successfully changed",
                jobSeeker: result
            });
        })
    }
};

exports.deleteCV = {
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            gfs.remove({ _id: request.query.fileID }, function (err) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return cb();
            })
        }, function (cb) {
            JobSeeker.findOne({ 'email': request.query.email }, function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                jobSeeker.cv.fileID = '';
                jobSeeker.cv.fileName = '';
                jobSeeker.cv.content_type = '';
                jobSeeker.save(function (err, jobSeeker) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobSeeker);
                })     
            })
        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                message: "CV deleted successfully!",
                jobSeeker: result
            });
        })    
    }
};

exports.uploadAttachment = {
    payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
    },
    handler: function (request, reply) {
        var file_name = request.payload.file.hapi.filename;
        var file_ext = "." + file_name.split('.').pop().toLowerCase();
        var writeStream = gfs.createWriteStream({
                filename: request.payload.file.hapi.filename,
                mode: 'w',
                content_type: file_ext,
                metadata: {
                    documentType: request.payload.documentType,
                    documentCategory: 'Attachment',                 
                    userEmail: request.payload.userEmail
                }
            });
            writeStream.on('error', function (err) {
                throw Boom.badRequest(err);
            });
            writeStream.on('close', function (_file) {
                var attachment = {
                    fileID: _file._id,
                    fileName: _file.filename,
                    documentType: _file.metadata.documentType
                }
                return reply({
                    message: "Attachment" + " " + _file.filename + " " + "uploaded successfully",
                    attachment: attachment
                });
            });
            request.payload.file.pipe(writeStream);
    }
};



exports.deleteAttachment = {
    handler: function (request, reply) {
        gfs.remove({ _id: request.params.fileID }, function (err) {
            if (err) {
                throw Boom.badRequest(err);
            }
            return reply({
                message: 'Attachment deleted successfully!'
            })
        })
    }
};

 exports.updateJobSeeker = {
     validate: {
         payload: {
            email: Joi.string().email().required(),
            firstName: Joi.string().required().trim().max(50),
            middleName: Joi.string().allow(['', null]).trim().max(50),
            lastName: Joi.string().required().trim().max(50),
            gender: Joi.string().required().trim().max(50), // e.g 'M','F'
            birthDate: Joi.date().required(),
            nationality: Joi.string().required().trim().max(50),
            profession: Joi.string().required().trim().max(100),
            mainQualification: Joi.string().allow(['', null]).trim().max(500),
            introduction: Joi.string().allow(['', null]).trim().max(500),
            homeTel: Joi.string().allow(['', null]).trim().max(50),
            workTel: Joi.string().allow(['', null]).trim().max(50),
            mobile: Joi.string().allow(['', null]).trim().max(50),
            address: Joi.string().required().trim().max(150),
            locationTown: Joi.string().required().trim().max(50),
            locationCountry: Joi.string().required().trim().max(50),
            linkedInProfile: Joi.string().allow(['', null]).trim().max(150),
            website: Joi.string().allow(['', null]).trim().max(150),
            professionalAffiliations: Joi.string().allow(['', null]).trim().max(500),
            noticePeriod: Joi.string().required().trim().max(50),
            requiredSalaryCurrency: Joi.string().required().trim().max(50),
            requiredMinimumSalary: Joi.number().required(),
            requiredMaximumSalary: Joi.number().required(),
            photo: Joi.string().allow(['', null]).trim(),
            preferredJobTitles: Joi.string().allow(['', null]).trim().max(500),
            preferredJobTypes: Joi.string().allow(['', null]).trim().max(500),
            preferredJobLocations: Joi.string().allow(['', null]).trim().max(500)        
        }
    },
    handler: function (request, reply) {
        JobSeeker.findOne({ 'email': request.payload.email }, function (err, jobSeeker) {
            if(err){
          return reply(Boom.badRequest("An error occured while updating job Seeker,try again"));
      }else{
                if(jobSeeker){
                     jobSeeker.firstName = request.payload.firstName;
                     jobSeeker.middleName = request.payload.middleName; 
                     jobSeeker.lastName = request.payload.lastName;
                     jobSeeker.gender = request.payload.gender;
                     jobSeeker.birthDate = new Date(request.payload.birthDate);
                     jobSeeker.profession = request.payload.profession;
                     jobSeeker.mainQualification = request.payload.mainQualification;
                     jobSeeker.introduction = request.payload.introduction;
                     jobSeeker.nationality = request.payload.nationality;                    
                     jobSeeker.homeTel = request.payload.homeTel;
                     jobSeeker.workTel = request.payload.workTel;
                     jobSeeker.mobile = request.payload.mobile;
                     jobSeeker.linkedInProfile = request.payload.linkedInProfile;
                     jobSeeker.address = request.payload.address;
                     jobSeeker.locationTown = request.payload.locationTown;
                     jobSeeker.locationCountry = request.payload.locationCountry;
                     jobSeeker.website = request.payload.website;
                     JobSeeker.professionalAffiliations = request.payload.professionalAffiliations;
                     jobSeeker.requiredMinimumSalary = request.payload.requiredMinimumSalary;
                     jobSeeker.requiredMaximumSalary = request.payload.requiredMaximumSalary;
                     jobSeeker.noticePeriod = request.payload.noticePeriod
                     jobSeeker.photo = request.payload.photo; 
                     jobSeeker.save(function (err, jobSeeker0) {
                        if(err){
                             return reply(Boom.badRequest("An error occured while updating recruiter,try again"));
                        }else{
                            if(jobSeeker0){
                                return reply({
                                    message: "JobSeeker" + jobSeeker0.firstName + jobSeeker0.LastName + "with email" + jobSeeker0.email + "updated successfully",
                                    jobSeeker: jobSeeker0
                                });
                            }else{
                                return reply(Boom.badRequest("JobSeeker"+jobSeeker0.firstName+jobSeeker0.LastName+"with email"+jobSeeker0.email+"could not be updated,try again"));
                            }
                        }                   
                });
              }else{
                     return reply(Boom.notFound("Job Seeker was not found"));  
                   }
         }       
            
            
      });
    }
};

exports.deleteAllJobSeekers = {
  handler: function (request, reply) {
    mongoose.connection.db.dropCollection('jobSeeker', function (err, result) {
      if (err) {
        return reply(Boom.badRequest("Could not delete job Seekers"));
        
      }else{
          return reply({ message: "JobSeekers database successfully deleted"});
      }
      
    });
  }
};

function GetContentType(ext) {
    var contentType = '';
    switch (ext) {
        case "pdf":
            contentType = 'application/pdf';
            break;
        case "ppt":
            contentType = 'application/vnd.ms-powerpoint';
            break;
        case "pptx":
            contentType = 'application/vnd.openxmlformats-officedocument.preplyentationml.preplyentation';
            break;
        case "xls":
            contentType = 'application/vnd.ms-excel';
            break;
        case "xlsx":
            contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            break;
        case "doc":
            contentType = 'application/msword';
            break;
        case "docx":
            contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            break;
        case "csv":
            contentType = 'application/octet-stream';
            break;
        case "gif":
            contentType = 'image/gif';
            break;
        case "jpeg":
            contentType = 'image/jpg';
            break;
        case "jpg":
            contentType = 'image/jpg';
            break;
        case "png":
            contentType = 'image/png';
            break;
        case "bmp":
            contentType = 'image/bmp';
            break;
        case "tiff":
            contentType = 'image/tiff';
            break;
        case "tif":
            contentType = 'image/tiff';
            break;
        case "ico":
            contentType = 'image/x-icon';
            break;
        default:
            contentType = 'application/octet-stream';
    }
    return contentType;
};

var fileExtensions = ['pdf', 'doc', 'docx'];

function isAllowedFileExtension(ext) {
    var isAllowed = false;
    for (var i = 0; i < fileExtensions.length; i++) {
        if (fileExtensions[i] == ext) {
            return isAllowed = true;
        }
    }
    return isAllowed;
};

//['pdf', 'ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'csv', 'gif', 'jpeg', 'jpg', 'png', 'bmp', 'tiff', 'tif', 'ico'];

function GetJobSeeker(email, cb) {
    var operation = retry.operation();
    operation.attempt(function (currentAttempt) {
        JobSeeker.findOne({ email: email }, function (err, jobSeeker) {
            if (operation.retry(err)) {
                return;
            }
            cb(err ? operation.mainError() : null, jobSeeker);
        })
    });
}

function AddToArray(jobSeeker,arr) { 
    var found = arr.some(function (el) {
        return el.email === jobSeeker.email;
    });
    if (!found) {
        arr.push(jobSeeker);
    }
}

function PaginateArray(array, page_size, page_number) {
    --page_number; // because pages logically start with 1, but technically with 0
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
}