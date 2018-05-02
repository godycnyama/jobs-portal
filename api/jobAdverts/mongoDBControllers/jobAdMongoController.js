'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  JobAd = require('../../models/mongodbModels/jobAd'),
  mongoose = require('mongoose');
const async = require('async');
const Order = require('../../models/mongodbModels/order');
const Item = require('../../models/mongodbModels/item');
const Recruiter = require('../../models/mongodbModels/recruiter');

exports.getJobAdsBy = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    validate: {
        query: {
            searchBy: Joi.string().required().trim().max(50),
            searchTerm: Joi.string().allow(['',null]).trim().max(50),
            pageNo: Joi.number().required(),
            perPage: Joi.number().required(),
            date: Joi.date().allow(['',null]),
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
                JobAd.paginate({}, {sort:{createdOn: -1}, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest(err.message));
                    }
                    if (!jobAds) {
                        return reply(Boom.notFound("No job ads matching your search criteria found!"));
                    }
                    return reply({
                        data: jobAds.docs,
                        total: jobAds.total,
                        perPage: jobAds.limit,
                        pageNo: jobAds.page
                    });
                });
                break;
            case 'Recruiter Company Name':
                async.waterfall([function (cb) {
                    Recruiter.findOne({ 'companyName': new RegExp(request.query.searchTerm, 'i') }, function (err, recruiter) {
                        if (err) {
                            return reply(Boom.badRequest("An error occured while searching for jobAd,try again"));
                        }
                        if (!recruiter) {
                            return reply(Boom.notFound("Company Name not found!"));
                        }
                        cb(null, recruiter);
                    });
                }, function (cb,recruiter) {
                    JobAd.paginate({ company: request._id }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        cb(null, jobAds);         
                    });

                }], function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest(err.message));
                    }
                    return reply({
                        data: jobAds.docs,
                        total: jobAds.total,
                        perPage: jobAds.limit,
                        pageNo: jobAds.page
                    })
                })
                
                break;
            case 'RecruiterID':
                JobAd.paginate({ company: request.query.recruiterID }, {sort:{createdOn: -1}, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    if (!jobAds) {
                        return reply(Boom.notFound("No job ads found!"));
                    }
                    return reply({
                        data: jobAds.docs,
                        total: jobAds.total,
                        perPage: jobAds.limit,
                        pageNo: jobAds.page
                    });
                });
                break;
            case 'JobID':
                JobAd.paginate({ _id: new RegExp(request.query.searchTerm, 'i')}, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for job Seekers,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
            case 'JobREF':
                JobAd.paginate({ jobREF: new RegExp(request.query.searchTerm, 'i')}, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for job Seekers,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
            case 'Job Title':
                JobAd.paginate({ jobTitle: new RegExp(request.query.searchTerm, 'i')}, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for job Seekers,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
            case 'Paid':
                JobAd.paginate({ paid: true }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    if (!jobAds) {
                        return reply(Boom.notFound("No job ads found"));
                    }
                    return reply({
                        data: jobAds.docs,
                        total: jobAds.total,
                        perPage: jobAds.limit,
                        pageNo: jobAds.page
                    });
                });
                break;
            case 'Not Paid':
                JobAd.paginate({ paid: false }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    if (!jobAds) {
                        return reply(Boom.notFound("No job ads found"));
                    }
                    return reply({
                        data: jobAds.docs,
                        total: jobAds.total,
                        perPage: jobAds.limit,
                        pageNo: jobAds.page
                    });
                });
                break;
            case 'Date':
                JobAd.paginate({ createdOn: date }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    if (!jobAds) {
                        return reply(Boom.notFound("No job ads found"));
                    }
                    return reply({
                        data: jobAds.docs,
                        total: jobAds.total,
                        perPage: jobAds.limit,
                        pageNo: jobAds.page
                    });
                });
                break;
            case 'Date Range':
                JobAd.paginate({ createdOn: { $gte: dateFrom, $lte: dateTo } }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    if (!jobAds) {
                        return reply(Boom.notFound("No job ads found"));
                    }
                    return reply({
                        data: jobAds.docs,
                        total: jobAds.total,
                        perPage: jobAds.limit,
                        pageNo: jobAds.page
                    });
                });
                break;
            case 'Closed':
                JobAd.paginate({ closed: true }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    if (!jobAds) {
                        return reply(Boom.notFound("No job ads found"));
                    }
                    return reply({
                        data: jobAds.docs,
                        total: jobAds.total,
                        perPage: jobAds.limit,
                        pageNo: jobAds.page
                    });
                });
                break;
            case 'Open':
                JobAd.paginate({ closed: false }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    if (!jobAds) {
                        return reply(Boom.notFound("No job ads found"));
                    }
                    return reply({
                        data: jobAds.docs,
                        total: jobAds.total,
                        perPage: jobAds.limit,
                        pageNo: jobAds.page
                    });
                });
                break;
        }
    }
};

exports.getRecruiterJobAdsBy = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        query: {
            searchBy: Joi.string().required().trim().max(50),
            searchTerm: Joi.string().allow(['', null]).trim().max(50),
            recruiterUserID: Joi.number().integer().required(),
            pageNo: Joi.number().required(),
            perPage: Joi.number().required(),
            date: Joi.date().allow(['',null]),
            dateFrom: Joi.date().allow(['', null]),
            dateTo: Joi.date().allow(['', null])
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
                JobAd.paginate({ userID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for jobAds,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
            case 'JobID':
                JobAd.paginate({ _id: new RegExp(request.query.searchTerm, 'i'), userID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for job Seekers,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
            case 'JobREF':
                JobAd.paginate({ jobREF: new RegExp(request.query.searchTerm, 'i'), userID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for job Seekers,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
            case 'Job Title':
                JobAd.paginate({ jobTitle: new RegExp(request.query.searchTerm, 'i'), userID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for job Seekers,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
            case 'Paid':
                JobAd.paginate({ paid: true, userID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for job Seekers,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
            case 'Not Paid':
                JobAd.paginate({ paid: false, userID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for jobAds,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
            case 'Date':
                JobAd.paginate({ createdOn: date, userID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for jobAds,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
            case 'Date Range':
                JobAd.paginate({ createdOn: { $gte: dateFrom, $lte: dateTo }, userID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for jobAds,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
            case 'Closed':
                JobAd.paginate({ closed: true, userID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for jobAds,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
            case 'Open':
                JobAd.paginate({ closed: false, userID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for jobAds,try again"));
                    } else {
                        if (jobAds) {
                            return reply({
                                data: jobAds.docs,
                                total: jobAds.total,
                                perPage: jobAds.limit,
                                pageNo: jobAds.page
                            });
                        } else {
                            return reply(Boom.notFound("No jobAds found"));
                        }
                    }
                });
                break;
        }
    }
};

exports.jobSeekerGetJobAds = {
    validate: {
        query: {
            jobTitle: Joi.string().required().trim().max(50),
            jobLocation: Joi.string().allow(['', null]).trim().max(50),
            pageNo: Joi.number().required(),
            perPage: Joi.number().required()
        }
    },
    handler: function (request, reply) {
        var jobs = [];
        // search for job ads regardless of location
        if(!request.query.jobLocation){
            JobAd.paginate({ jobTitle: new RegExp(request.query.jobTitle, 'i'),paid: true}, {sort:{createdOn: -1}, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                if (err) {
                    return reply(Boom.badRequest(err.message));
                }
                if (!jobAds) {
                    return reply(Boom.notFound("No jobs matching your search criteria found!"));
                }
                jobs = jobAds.docs;
                return reply({
                    data: jobAds.docs,
                    total: jobAds.total,
                    perPage: jobAds.limit,
                    pageNo: jobAds.page
                });         
            });
        }
        // search for job ads including location
        if (request.query.jobTitle && request.query.jobLocation) {
            JobAd.paginate({ jobTitle: new RegExp(request.query.jobTitle, 'i'), jobLocationTown: new RegExp(request.query.jobLocation, 'i'), jobLocationCountry: new RegExp(request.query.jobLocation, 'i'), paid: true }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                if (err) {
                    return reply(Boom.badRequest(err.message));
                }
                if (!jobAds) {
                    return reply(Boom.notFound("No jobs matching your search criteria found!"));
                }
                jobs = jobAds.docs;
                return reply({
                    data: jobAds.docs,
                    total: jobAds.total,
                    perPage: jobAds.limit,
                    pageNo: jobAds.page
                });
            });
        }
        // search for all job ads if no job ads match search criteria
        if (!jobs) {
            JobAd.paginate({ paid: true }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, jobAds) {
                if (err) {
                    return reply(Boom.badRequest(err.message));
                }
                if (!jobAds) {
                    return reply(Boom.notFound("No jobs matching your search criteria found!"));
                }
                return reply({
                    data: jobAds.docs,
                    total: jobAds.total,
                    perPage: jobAds.limit,
                    pageNo: jobAds.page
                });
            });
        }
       
    }
};

exports.getAllJobAds = {
  handler: function (request, reply) {
    JobAd.find({}, function (err, jobAds) {
      if(err){
          return reply(Boom.badRequest("An error occured while searching for jobAds,try again"));
      }else{
                if(jobAds){
                    return reply(jobAds);  
                }else{
                        return reply(Boom.notFound("No jobAds found"));  
                    }
      }            
    });
  }
};


exports.closeJobAd = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    handler: function (request, reply) {
        JobAd.findOne({ '_id': request.payload.jobAdID }, function (err, jobAd) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for jobAd,try again"));
            }
            if (!jobAd) {
                return reply(Boom.notFound("No jobAd found!"));
            }
            if(jobAd.close == true){
                return reply(Boom.badRequest('Job Ad with JobREF ' + jobAd.jobREF + ' is closed already!'));
            }
            jobAd.close = true;
            jobAd.save(function(err,jobAd){
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return reply({message: 'Job Ad with JobREF ' + jobAd.jobREF + ' closed successfully!'})
            })
        });
    }
};

exports.markPaidJobAd = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    handler: function (request, reply) {
        JobAd.findOne({ '_id': request.payload.jobAdID }, function (err, jobAd) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for jobAd,try again"));
            }
            if (!jobAd) {
                return reply(Boom.notFound("No jobAd found!"));
            }
            if (jobAd.paid == true) {
                return reply(Boom.badRequest('Job Ad with JobREF ' + jobAd.jobREF + ' is paid already!'));
            }
            jobAd.paid = true;
            jobAd.save(function (err, jobAd) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return reply({ message: 'Job Ad with JobREF ' + jobAd.jobREF + ' marked as paid successfully!' })
            })
        });
    }
};

exports.closeJobAdRecruiter = {
    auth: {
        strategy: 'jwt',
        scope: ['recruiter']
    },
    handler: function (request, reply) {
        JobAd.findOne({ '_id': request.payload.jobAdID}, function (err, jobAd) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for jobAd,try again"));
            }   
            if (!jobAd) {
                return reply(Boom.notFound("No jobAd found!"));
            }
            if (jobAd.userID !== request.payload.recruiterUserID) {
                return reply(Boom.badRequest("You are not authorised to close this job ad!"));
            }
            if (jobAd.closed == true) {
                return reply(Boom.badRequest('Job Ad with JobREF ' + jobAd.jobREF + ' is closed already!'));
            }
            jobAd.closed = true;
            jobAd.save(function (err, jobAd) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return reply({ message: 'Job Ad with JobREF ' + jobAd.jobREF + ' closed successfully!' })
            })
        });
    }
};

exports.getJobAdByID = {
  handler: function (request, reply) {
    JobAd.findOne({ '_id': request.params.jobAdID }, function (err, jobAd) {
       if(err){
          return reply(Boom.badRequest("An error occured while searching for jobAd,try again"));
      }else{
                if(jobAd){
                    return reply(jobAd);  
                }else{
                        return reply(Boom.notFound("No jobAd found"));  
                    }
      }             
    });
  }
};

exports.getJobAdByREF = {
    handler: function (request, reply) {
        JobAd.findOne({ 'jobAdREF': request.params.jobAdREF }, function (err, jobAd) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for jobAd,try again"));
            } else {
                if (jobAd) {
                    return reply(jobAd);
                } else {
                    return reply(Boom.notFound("No jobAd found"));
                }
            }
        });
    }
};

exports.getJobAdsByRecruiterID = {
  handler: function (request, reply) {
    JobAd.find({ 'company': request.params.recruiterID }, function (err, jobAds) {
       if(err){
          return reply(Boom.badRequest("An error occured while searching for recruiter,try again"));
      }else{
                if(jobAds){
                    return reply(jobAds);  
                }else{
                        return reply(Boom.notFound("No jobAds found"));  
                    }
      }             
    });
  }
};

exports.getJobAdsByPaymentStatus = {
    handler: function (request, reply) {
        JobAd.find({ 'paid': request.params.paymentStatus }, function (err, jobAds) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for recruiter,try again"));
            } else {
                if (jobAds) {
                    return reply(jobAds);
                } else {
                    return reply(Boom.notFound("No jobAds found"));
                }
            }
        });
    }
};

exports.createJobAd = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
  validate: {
    payload: {         
        jobREF: Joi.string().required().trim().min(1).max(50),
        jobTitle: Joi.string().required().trim().min(1).max(50),
        jobLevel: Joi.string().required().trim().max(50),
        jobType: Joi.string().required().trim().max(50),
        companySector: Joi.string().required().trim().max(50),
        employmentEquityPosition: Joi.boolean().required(),
        disabilityOption: Joi.string().required().trim().max(50),
        closingDate: Joi.date().required(),
        jobLocationTown: Joi.string().trim().min(1).max(50),
        jobLocationCountry: Joi.string().trim().required().max(50),
        salaryCurrency: Joi.string().trim().required().max(50),
        minimumSalary: Joi.string().trim().required().max(50),
        maximumSalary: Joi.string().trim().required().max(50),
        salaryNegotiable: Joi.boolean().required(),
        hideSalary: Joi.boolean().required(),
        salaryFrequency: Joi.string().trim().required().max(50),
        renumerationType: Joi.string().trim().required().max(50),
        renumerationMarketRelated: Joi.boolean(),
        renumerationBenefits: Joi.string().trim().min(1).max(500),
        introduction: Joi.string().required().trim().min(1).max(1000),
        jobDescription: Joi.string().required().trim().min(1).max(1000),
        jobRequirements: Joi.string().required().trim().min(1).max(1000),
        applyOnline: Joi.boolean().required(),
        howToApply: Joi.string().allow(['', null]).trim().max(1000),
        recruiterUserID: Joi.number().required(),
        company: Joi.number().required() 
      }
  },
  handler: function (request, reply) {
      async.waterfall([function (cb) {
          JobAd.findOne({ jobREF: request.payload.jobREF, company: request.payload.company }, function (err, jobAd) {
              if (err) {
                  return reply(Boom.badRequest(err));
              }
              if (!jobAd) {
                  return cb();
              }
              if (jobAd) {
                  return reply(Boom.badRequest("JobREF " + request.payload.jobREF + ' already exists'));
              }
          });
      }, function (cb) {
          var jobAd = new JobAd();
          jobAd.jobREF = request.payload.jobREF;
          jobAd.jobTitle = request.payload.jobTitle;
          jobAd.jobLevel = request.payload.jobLevel;
          jobAd.jobType = request.payload.jobType;
          jobAd.companySector = request.payload.companySector;
          jobAd.employmentEquityPosition = request.payload.employmentEquityPosition;
          jobAd.disabilityOption = request.payload.disabilityOption;
          jobAd.closingDate = new Date(request.payload.closingDate);
          jobAd.closingDate.setHours(0, 0, 0, 0),
          jobAd.jobLocationTown = request.payload.jobLocationTown;
          jobAd.jobLocationCountry = request.payload.jobLocationCountry;
          jobAd.salaryCurrency = request.payload.salaryCurrency;
          jobAd.minimumSalary = request.payload.minimumSalary;
          jobAd.maximumSalary = request.payload.maximumSalary;
          jobAd.salaryNegotiable = request.payload.salaryNegotiable;
          jobAd.hideSalary = request.payload.hideSalary;
          jobAd.salaryFrequency = request.payload.salaryFrequency;
          jobAd.renumerationType = request.payload.renumerationType;
          jobAd.renumerationMarketRelated = request.payload.renumerationMarketRelated;
          jobAd.renumerationBenefits = request.payload.renumerationBenefits;
          jobAd.introduction = request.payload.introduction;
          jobAd.jobDescription = request.payload.jobDescription;
          jobAd.jobRequirements = request.payload.jobRequirements;
          jobAd.applyOnline = request.payload.applyOnline;
          jobAd.howToApply = request.payload.howToApply;
          jobAd.userID = request.payload.recruiterUserID;
          jobAd.company = request.payload.company;
          jobAd.save(function (err, jobAd) {
              if (err) {
                  return reply(Boom.badRequest(err));
              }
              console.log(jobAd);
              return cb(null,{ message: "JobAd with jobREF " + request.payload.jobREF + " created successfully" });
          });
      }], function (err, result) {
          if (err) {
              return reply(Boom.badRequest(err));
          }
          return reply({ message: result.message });
      });      
  }
};

exports.createAndAddToCart = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        payload: {
            jobREF: Joi.string().alphanum().required().trim().min(1).max(50),
            jobTitle: Joi.string().alphanum().required().trim().min(1).max(50),
            jobLevel: Joi.string().alphanum().required(),
            jobType: Joi.string().alphanum().required(),
            companySector: Joi.string().alphanum().required(),
            employmentEquityPosition: Joi.boolean().required(),
            disabilityOption: Joi.string().alphanum().required(),
            closingDate: Joi.date().required(),
            jobLocationTown: Joi.string().required().trim().min(1).max(50),
            jobLocationCountry: Joi.string().required(),
            salaryCurrency: Joi.string().alphanum().required(),
            minimumSalary: Joi.number().required(),
            maximumSalary: Joi.number().required(),
            salaryNegotiable: Joi.boolean().required(),
            hideSalary: Joi.boolean().required(),
            salaryFrequency: Joi.string().alphanum().required(),
            renumerationType: Joi.string().alphanum().required(),
            renumerationMarketRelated: Joi.boolean(),
            renumerationBenefits: Joi.string().alphanum().required().trim().min(1).max(500),
            jobDescription: Joi.string().required().trim().min(1).max(1000),
            jobRequirements: Joi.string().required().trim().min(1).max(1000),
            company: Joi.number().required(),
            contactPerson: Joi.string().alphanum().required().trim().min(1).max(100),
            contactPersonJobTitle: Joi.string().required().trim().min(1).max(50),
            contactEmail: Joi.string().email().required().trim().min(1).max(50),
            tel: Joi.string().alphanum().required().trim().min(1).max(50),
            mobile: Joi.string().alphanum().required().trim().min(1).max(50)
        }
    },
    handler: function (request, reply) {
        var jobAd = new JobAd();
        jobAd.jobREF = request.payload.jobREF;
        jobAd.jobTitle = request.payload.jobTitle;
        jobAd.jobLevel = request.payload.jobLevel;
        jobAd.jobType = request.payload.jobType;
        jobAd.companySector = request.payload.companySector;
        jobAd.employmentEquityPosition = request.payload.employmentEquityPosition;
        jobAd.disabilityOption = request.payload.disabilityOption;
        jobAd.closingDate = new Date(request.payload.closingDate);
        jobAd.closingDate.setHours(0, 0, 0, 0),
        jobAd.jobLocationTown = request.payload.jobLocationTown;
        jobAd.jobLocationCountry = request.payload.jobLocationCountry;
        jobAd.salaryCurrency = request.payload.salaryCurrency;
        jobAd.minimumSalary = request.payload.minimumSalary;
        jobAd.maximumSalary = request.payload.maximumSalary;
        jobAd.salaryNegotiable = request.payload.salaryNegotiable;
        jobAd.hideSalary = request.payload.hideSalary;
        jobAd.salaryFrequency = request.payload.salaryFrequency;
        jobAd.renumerationType = request.payload.renumerationType;
        jobAd.renumerationMarketRelated = request.payload.renumerationMarketRelated;
        jobAd.renumerationBenefits = request.payload.renumerationBenefits;
        jobAd.jobDescription = request.payload.jobDescription;
        jobAd.jobRequirements = request.payload.jobRequirements;
        jobAd.company = request.payload.company;
        jobAd.contactPerson = request.payload.contactPerson;
        jobAd.contactPersonJobTitle = request.payload.contactPersonJobTitle;
        jobAd.contactEmail = request.payload.contactEmail;
        jobAd.tel = request.payload.tel;
        jobAd.mobile = request.payload.mobile;

        async.waterfall([function (cb) {
            jobAd.save(function (err, jobAd) {
                if (err) {
                    return cb(new Error('An error occured while creating job ad,try again!'));
                }
                return cb(null, jobAd);
            });
        }, function (jobAd, cb) {
            Item.find({
                minimumJobAds: { $gte: 1 },
                maximumJobAds: { $lte: 1},
                category: 'Job Ad'
            }, function (err, item0) {
                if (err) {
                    return cb(new Error('Job Ad with Job REF' + jobAd.jobREF + 'and Job ID '+ jobAd._id +'created successfully but could not be added to cart!'));
                }
                return cb(null, jobAd, item0);
            })

        }, function (jobAd, item0, cb) {
            var order = new Order();
            order.recruiterID = request.payload.company;
            order.orderType = 'Job Ad';
            order.paymentID = '';
            order.subTotal = '';
            order.tax = '';
            order.total = item0.unitPrice;
            order.paymentStatus = 'PENDING';
            order.numberOfMonths = '';
            order.orderDetails = [];
            order.save(function (err, order0) {
                if (err) {
                    return cb(new Error('Job Ad with Job REF' + jobAd.jobREF + 'and Job ID ' + jobAd._id + 'created successfully but could not be added to cart!'))
                }
                if (order0) {
                    var orderSignature = generateSignature(order0);
                    var getString = GetString.generateGetString(order0, orderSignature);
                    return cb(null, { order: order0, getString: getString })
                }
            });

        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err.message));
            }
            return reply(result);
        })
    }
};

exports.updateJobAd = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        payload: {
            jobAdID: Joi.number().required(),
            jobREF: Joi.string().required().trim().min(1).max(50),
            jobTitle: Joi.string().required().trim().min(1).max(50),
            jobLevel: Joi.string().required().trim().max(50),
            jobType: Joi.string().required().trim().max(50),
            companySector: Joi.string().required().trim().max(50),
            employmentEquityPosition: Joi.boolean().required(),
            disabilityOption: Joi.string().required().trim().max(50),
            closingDate: Joi.date().required(),
            jobLocationTown: Joi.string().trim().min(1).max(50),
            jobLocationCountry: Joi.string().trim().required().max(50),
            salaryCurrency: Joi.string().trim().required().max(50),
            minimumSalary: Joi.string().trim().required().max(50),
            maximumSalary: Joi.string().trim().required().max(50),
            salaryNegotiable: Joi.boolean().required(),
            hideSalary: Joi.boolean().required(),
            salaryFrequency: Joi.string().trim().required().max(50),
            renumerationType: Joi.string().trim().required().max(50),
            renumerationMarketRelated: Joi.boolean(),
            renumerationBenefits: Joi.string().trim().min(1).max(500),
            introduction: Joi.string().required().trim().min(1).max(1000),
            jobDescription: Joi.string().required().trim().min(1).max(1000),
            jobRequirements: Joi.string().required().trim().min(1).max(1000),
            applyOnline: Joi.boolean().required(),
            howToApply: Joi.string().allow(['', null]).trim().max(1000),
            recruiterUserID: Joi.number().required()
        }
    },
    handler: function (request, reply) {
        JobAd.findOne({ '_id': request.payload.jobAdID }, function (err, jobAd) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            if (!jobAd) {
                return reply(Boom.notFound("JobAD was not found"));
            }
            if (jobAd.userID !== request.payload.recruiterUserID) {
                return reply(Boom.badRequest('You are not authorized to update this job ad'));
            }
            jobAd.jobREF = request.payload.jobREF;
            jobAd.jobTitle = request.payload.jobTitle;
            jobAd.jobLevel = request.payload.jobLevel;
            jobAd.jobType = request.payload.jobType;
            jobAd.companySector = request.payload.companySector;
            jobAd.employmentEquityPosition = request.payload.employmentEquityPosition;
            jobAd.disabilityOption = request.payload.disabilityOption;
            jobAd.closingDate = new Date(request.payload.closingDate);
            jobAd.closingDate.setHours(0, 0, 0, 0),
            jobAd.jobLocationTown = request.payload.jobLocationTown;
            jobAd.jobLocationCountry = request.payload.jobLocationCountry;
            jobAd.salaryCurrency = request.payload.salaryCurrency;
            jobAd.minimumSalary = request.payload.minimumSalary;
            jobAd.maximumSalary = request.payload.maximumSalary;
            jobAd.salaryNegotiable = request.payload.salaryNegotiable;
            jobAd.hideSalary = request.payload.hideSalary;
            jobAd.salaryFrequency = request.payload.salaryFrequency;
            jobAd.renumerationType = request.payload.renumerationType;
            jobAd.renumerationMarketRelated = request.payload.renumerationMarketRelated;
            jobAd.renumerationBenefits = request.payload.renumerationBenefits;
            jobAd.introduction = request.payload.introduction;
            jobAd.jobDescription = request.payload.jobDescription;
            jobAd.jobRequirements = request.payload.jobRequirements;
            jobAd.applyOnline = request.payload.applyOnline;
            jobAd.howToApply = request.payload.howToApply;
            jobAd.save(function(err,jobAd0){
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return reply({ message: "JobAD " + jobAd0.jobTitle + " with JobREF " + jobAd0.jobREF + " updated successfully" });
            })
        });
    }
};

exports.updateAndAddToCart = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        payload: {
            jobAdID: Joi.number().required(),
            jobREF: Joi.string().alphanum().required().trim().min(1).max(50),
            jobTitle: Joi.string().alphanum().required().trim().min(1).max(50),
            jobLevel: Joi.string().alphanum().required(),
            jobType: Joi.string().alphanum().required(), //'Permanent','Contract','Temporary'
            companySector: Joi.string().alphanum().required(), //eg 'Engineering','Construction','Education','Hospitality','Medical'
            employmentEquityPosition: Joi.boolean().required(),
            disabilityOption: Joi.string().alphanum().required(),
            createdOn: Joi.date().required(),
            closingDate: Joi.date().required(),
            jobLocationTown: Joi.string().required().trim().min(1).max(50),
            jobLocationCountry: Joi.string().required(),
            salaryCurrency: Joi.string().alphanum().required(),
            minimumSalary: Joi.number().required(),
            maximumSalary: Joi.number().required(),
            salaryNegotiable: Joi.boolean().required(),
            hideSalary: Joi.boolean().required(),
            salaryFrequency: Joi.string().alphanum().required(),
            renumerationType: Joi.string().alphanum().required(),//e.g ['Basic salary','Basic plus benefits','Cost to company','Basic plus commission','Commission']
            renumerationMarketRelated: Joi.boolean(),
            renumerationBenefits: Joi.string().alphanum().required().trim().min(1).max(500),
            jobDescription: Joi.string().required().trim().min(1).max(1000),
            jobRequirements: Joi.string().required().trim().min(1).max(1000),
            company: Joi.number().required(),
            contactPerson: Joi.string().alphanum().required().trim().min(1).max(100),
            contactPersonJobTitle: Joi.string().required().trim().min(1).max(50),
            contactEmail: Joi.string().email().required().trim().min(1).max(50),
            tel: Joi.string().alphanum().required().trim().min(1).max(50),
            mobile: Joi.string().alphanum().required().trim().min(1).max(50)
        }
    },
    handler: function (request, reply) {
        JobAd.findOne({ '_id': request.payload.jobAdID }, function (err, jobAd) {
        });
        async.waterfall([function (cb) {
            JobAd.findOne({ '_id': request.payload.jobAdID }, function (err, jobAd) {
                if (err) {
                    return cb(new Error('An error occured while searching for job ad,try again!'));
                }
                if (!jobAd) {
                    return cb(new Error('Job ad,not found!'));
                }
                if (jobAd) {
                    jobAd.jobREF = request.payload.jobREF;
                    jobAd.jobTitle = request.payload.jobTitle;
                    jobAd.jobLevel = request.payload.jobLevel;
                    jobAd.jobType = request.payload.jobType;
                    jobAd.companySector = request.payload.companySector;
                    jobAd.employmentEquityPosition = request.payload.employmentEquityPosition;
                    jobAd.disabilityOption = request.payload.disabilityOption;
                    jobAd.createdOn = new Date(request.payload.createdOn);
                    jobAd.closingDate = new Date(request.payload.closingDate);
                    jobAd.jobLocationTown = request.payload.jobLocationTown;
                    jobAd.jobLocationCountry = request.payload.jobLocationCountry;
                    jobAd.salaryCurrency = request.payload.salaryCurrency;
                    jobAd.minimumSalary = request.payload.minimumSalary;
                    jobAd.maximumSalary = request.payload.maximumSalary;
                    jobAd.salaryNegotiable = request.payload.salaryNegotiable;
                    jobAd.hideSalary = request.payload.hideSalary;
                    jobAd.salaryFrequency = request.payload.salaryFrequency;
                    jobAd.renumerationType = request.payload.renumerationType;
                    jobAd.renumerationMarketRelated = request.payload.renumerationMarketRelated;
                    jobAd.renumerationBenefits = request.payload.renumerationBenefits;
                    jobAd.jobDescription = request.payload.jobDescription;
                    jobAd.jobRequirements = request.payload.jobRequirements;
                    jobAd.company = request.payload.company;
                    jobAd.contactPerson = request.payload.contactPerson;
                    jobAd.contactPersonJobTitle = request.payload.contactPersonJobTitle;
                    jobAd.contactEmail = request.payload.contactEmail;
                    jobAd.tel = request.payload.tel;
                    jobAd.mobile = request.payload.mobile;
                    jobAd.save(function (err, jobAd0) {
                        if (err) {
                            return cb(new Error('An error occured while updating job ad,try again!'));
                        }
                        return cb(null,jobAd0)
                    });
                }
            });
        }, function (jobAd, cb) {
            Item.find({
                minimumJobAds: { $gte: 1 },
                maximumJobAds: { $lte: 1 },
                category: 'Job Ad'
            }, function (err, item0) {
                if (err) {
                    return cb(new Error('Job Ad with Job REF' + jobAd.jobREF + 'and Job ID ' + jobAd._id + 'updated successfully but could not be added to cart!'));
                }
                return cb(null, jobAd, item0);
            })

        }, function (jobAd, item0, cb) {
            var order = new Order();
            order.recruiterID = request.payload.company;
            order.orderType = 'Job Ad';
            order.paymentID = '';
            order.subTotal = '';
            order.tax = '';
            order.total = item0.unitPrice;
            order.paymentStatus = 'PENDING';
            order.numberOfMonths = '';
            order.orderDetails = [];
            order.save(function (err, order0) {
                if (err) {
                    return cb(new Error('Job Ad with Job REF' + jobAd.jobREF + 'and Job ID ' + jobAd._id + 'created successfully but could not be added to cart!'))
                }
                if (order0) {
                    var orderSignature = generateSignature(order0);
                    var getString = GetString.generateGetString(order0, orderSignature);
                    return cb(null, { order: order0, getString: getString })
                }
            });

        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err.message));
            }
            return reply(result);
        })
    }
};

exports.deleteJobAdByID = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
  handler: function (request, reply) {
    JobAd.findOne({ '_id': request.query.jobAdID }, function (err, jobAd) {
      if(err){
          return reply(Boom.badRequest("An error occured while searching for jobAd,try again"));
      }
      if (!jobAd) {
          return reply(Boom.notFound("JobAd was not found"));
      }
      jobAd.remove(function (err) {
          if (err) {
              return reply(Boom.badRequest("An error occured while deleting jobAd,try again"));
          }
          return reply({ message: "JobAd deleted successfully" });
      });         
    });
  }
};

exports.deleteJobAdByIDRecruiter = {
    auth: {
        strategy: 'jwt',
        scope: ['recruiter']
    },
    handler: function (request, reply) {
        JobAd.findOne({ '_id': request.payload.jobAdID }, function (err, jobAd) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for jobAd,try again"));
            }
            if (!jobAd) {
                return reply(Boom.notFound("JobAd was not found"));
            }
            if (jobAd.userID !== request.payload.recruiterUserID) {
                return reply(Boom.badRequest("You are not authorised to close this job ad!"));
            }
            jobAd.remove(function (err) {
                if (err) {
                    return reply(Boom.badRequest("An error occured while deleting jobAd,try again"));
                }
                return reply({ message: "JobAd deleted successfully" });
            });
        });
    }
};

exports.deleteJobAdByREF = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    handler: function (request, reply) {
        JobAd.findOne({ 'jobAdREF': request.payload.jobAdREF }, function (err, jobAd) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for jobAd,try again"));
            } else {
                if (jobAd) {
                    jobAd.remove();
                    return reply({ message: "JobAd deleted successfully" });
                } else {
                    return reply(Boom.notFound("JobAd was not found"));
                }
            }
        });
    }
};

exports.deleteAllJobAds = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
  handler: function (request, reply) {
    mongoose.connection.db.dropCollection('jobAds', function (err, result) {
      if (err) {
        return reply(Boom.badRequest("Could not delete jobAds"));
        
      }else{
          return reply({ message: "JobAds database successfully deleted"});
      }
      
    });
  }
};
