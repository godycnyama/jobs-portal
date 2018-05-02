'use strict';
var MD5 = require("crypto-js/md5");
var Joi = require('joi'),
    Boom = require('boom'),
    JobAd = require('../models/mongodbModels/jobAd'),
    Order = require('../models/mongodbModels/order'),
    Item = require('../models/mongodbModels/item'),
    OrderOption = require('../models/mongodbModels/orderOption'),
    Recruiter = require('../models/mongodbModels/recruiter'),
    IPaddressValidate = require('./orderValidateIPaddress'),
    PaymentData = require('./paymentData'),
    OrderValidateSignature = require('./orderValidateDataSignature'),
    PaymentDataValidate = require('./orderValidatePaymentData'),
    mongoose = require('mongoose');
const config = require('../config/config');
const async = require('async');
const retry = require('retry');
const strings = require('locutus/php/strings');
var events = require('events');
var promiseRetry = require('promise-retry');
const notifier = new events.EventEmitter();
   
var nconf = require('nconf');
    
    nconf.file('../settings.json')
         .env();



    exports.getUnpaidOrders = {
        auth: {
            strategy: 'jwt',
            scope: ['admin','recruiter']
        },
        validate: {
            query: {
                pageNo: Joi.number().integer().required(),
                perPage: Joi.number().integer().required(),
                recruiterUserID: Joi.number().integer().required()
            }
        },
        handler: function (request, reply) {               
            Order.paginate({ orderType: 'Job Ad', paid: false, userID: request.query.recruiterUserID }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    
            
        }
    };

    exports.getOrdersBy = {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        validate: {
            query: {
                searchBy: Joi.string().required().trim().max(50),
                searchTerm: Joi.string().allow(['', null]).trim().max(50),
                pageNo: Joi.number().integer().required(),
                perPage: Joi.number().integer().required(),
                date: Joi.date().allow(['', null]),
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
                    Order.paginate({}, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    break;
                case 'OrderID':
                    Order.paginate({ '_id': request.query.searchTerm }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    break;
                case 'Paid':
                    Order.paginate({ 'paid': true }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    break;
                case 'Not Paid':
                    Order.paginate({ 'paid': false }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    break;
                case 'Recruiter Company Name':
                    Order.paginate({ 'companyName': new RegExp(request.query.searchTerm, 'i') }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    break;
                case 'Date':
                    Order.paginate({ createdOn: date }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    break;
                case 'Date Range':
                    Order.paginate({ createdOn: { $gte: dateFrom, $lte: dateTo } }, { sort: { createdOn: -1 }, page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    break;
            }
        }
    };

    exports.getRecruiterOrdersBy = {
        auth: {
            strategy: 'jwt',
            scope: ['admin', 'recruiter']
        },
        validate: {
            query: {
                searchBy: Joi.string().required().trim().max(50),
                searchTerm: Joi.string().allow(['',null]).trim().max(50),
                recruiterUserID: Joi.number().integer().required(),
                pageNo: Joi.number().integer().required(),
                perPage: Joi.number().integer().required(),
                date: Joi.date().allow(['', null]),
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
                    Order.paginate({userID: request.query.recruiterUserID}, { page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    break;
                case 'OrderID':
                    Order.paginate({ userID: request.query.recruiterUserID, _id: request.query.searchTerm }, { page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    break;
                case 'Paid':
                    Order.paginate({ userID: request.query.recruiterUserID, paid: true }, { page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {         
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });               
                    });
                    break;
                case 'Not Paid':
                    Order.paginate({ userID: request.query.recruiterUserID, paid: false }, { page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    break;
                case 'Date':
                    Order.paginate({ userID: request.query.recruiterUserID, createdOn: date }, { page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    break;
                case 'Date Range':
                    Order.paginate({ userID: request.query.recruiterUserID, createdOn: { $gte: dateFrom, $lte: dateTo } }, { page: request.query.pageNo, limit: request.query.perPage }, function (err, orders) {
                        if (err) {
                            return reply(Boom.badRequest(err));
                        }
                        return reply({
                            data: orders.docs,
                            total: orders.total,
                            perPage: orders.limit,
                            pageNo: orders.page
                        });
                    });
                    break;
            }
        }
    };


    exports.getAllOrders = {
        auth: {
            strategy: 'jwt',
            scope: ['admin', 'recruiter']
        },
    handler: function (request, reply) {
        Order.find({}, function (err, orders) {
            if (err) {
                return reply(Boom.badRequest(err));
            } else {
                if (orders) {
                    return reply(orders);
                } else {
                    return reply(Boom.notFound("No orders found"));
                }
            }
        });
    }
};

    exports.getOrderByID = {
        auth: {
            strategy: 'jwt',
            scope: ['admin', 'recruiter']
        },
    handler: function (request, reply) {
        Order.findOne({ '_id': request.params.orderID }, function (err, order) {
            if (err) {
                return reply(Boom.badRequest(err));
            } else {
                if (order) {
                    return reply(order);
                } else {
                    return reply(Boom.notFound("No order found"));
                }
            }
        });
    }
};
    exports.getOrdersByRecruiterID = {
        auth: {
            strategy: 'jwt',
            scope: ['admin', 'recruiter']
        },
    handler: function (request, reply) {
        Order.find({ 'recruiterID': request.payload.recruiterID }, function (err, orders) {
            if (err) {
                return reply(Boom.badRequest(err));
            } else {
                if (orders) {
                    return reply(orders);
                } else {
                    return reply(Boom.notFound("No orders found"));
                }
            }
        });
    }
 };

exports.proceedToCheckout = {
        auth: {
            strategy: 'jwt',
            scope: ['admin', 'recruiter']
        },
        handler: function (request, reply) {
            var cancelURL = "https://www.jobmix.co.za/#/recruiter/checkout-order";
            Order.findOne({ '_id': request.payload.orderID }, function (err, order) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if(!order){
                        return reply(Boom.notFound("Order not found!"));
                }
                var orderSignature = generateSignature(order, cancelURL);
                var getString = generateGetString(order, cancelURL, orderSignature);
                return reply({ order: order, getString: getString});
            });
        }
    };

    exports.createSearchOrder = {
        auth: {
            strategy: 'jwt',
            scope: ['admin', 'recruiter']
        },
    validate: {
        payload: {
            recruiterUserID: Joi.number().required(),
            numberOfMonths: Joi.number().integer().required()
        }
    },
    handler: function (request, reply) {
        var cancelURL = "https://www.jobmix.co.za/#/recruiter/checkout-searchorder";
        async.waterfall([function (cb) {
            Recruiter.findOne({ userID: request.payload.recruiterUserID }, function (err, recruiter) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!recruiter) {
                    return reply(Boom.badRequest("Can not find recruiter userID!"));

                }
                if (recruiter) {
                    return cb(null, recruiter);
                }
            });
        }, function (recruiter0,cb) {
            Item.findOne({ category: 'CV Search' }, function (err, item) {
                if (err) {
                    return reply(Boom.badRequest("An error occured while verifying item price,try again"));
                }
                if (!item) {
                    return reply(Boom.badRequest("No items found"));
                }
                if (item) {
                    return cb(null,recruiter0, item);
                }
            });
        }, function (recruiter1,item, cb) {
            var order = new Order();
            order.recruiterID = recruiter1._id;
            order.userID = recruiter1.userID;
            order.orderType = 'CV Search';
            order.paymentID = '';
            order.subTotal = 0;
            order.tax = 0;
            order.total = item.unitPrice;
            order.numberOfMonths = request.payload.numberOfMonths;
            order.orderDetails = [];
            order.save(function (err, order0) {
                if (err) {
                    return cb(new Error('An error occured while creating  order,try again!'))
                }
                if (!order0) {
                    return cb(new Error('Could not create order,try again!'))
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

    exports.createJobAdOrder = {
        auth: {
            strategy: 'jwt',
            scope: ['admin', 'recruiter']
        },
    validate: {
        payload: {
            recruiterUserID: Joi.number().required()
        }
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Recruiter.findOne({ userID: request.payload.recruiterUserID }, function (err, recruiter) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!recruiter) {
                    return reply(Boom.badRequest("Can not find recruiter userID!"));

                }
                if (recruiter) {
                    return cb(null, recruiter);
                }
            });
        }, function (recruiter0, cb) {
            var order = new Order();
            order.recruiterID = recruiter0._id;
            order.userID = recruiter0.userID;
            order.orderType = 'Job Ad';
            order.paymentID = '';
            order.subTotal = 0;
            order.tax = 0;
            order.total = 0;
            order.orderDetails = [];
            order.save(function (err, order0) {
                if (err) {
                    return reply(Boom.badRequest("An error occured while creating  order,try again"));
                }
                return cb(null, order0);
            });
        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply({
                order: result,
                message: "Order# " + result._id + " created successfully!"
            })
        })
        
    }
};

    exports.clearOrder = {
        auth: {
            strategy: 'jwt',
            scope: ['admin', 'recruiter']
        },
    validate: {
        payload: {
            orderID: Joi.number().required(),
            recruiterUserID: Joi.number().required()
        }
    },
    handler: function (request, reply){
        Order.findOne({ _id: request.params.orderID },function (err,order){
            if (err) {
                return reply(Boom.badRequest(err));
            }
            if (!order) {
                return reply(Boom.badRequest('Order not found!'));
            }
            if (order.userID != request.payload.recruiterUserID) {
                return reply(Boom.badRequest("Not Authorized!"));
            };
            order.subTotal = 0;
            order.tax = 0;
            order.total = 0;
            order.orderDetails = [];
            order.save(function(err,order0){
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                return reply({
                    order: order0,
                    message: "Order# " + order._id + " cleared successfully!"
                })
            }) 
        })
    }
}

    exports.addExistingJobAdAddToNewOrder = {
        auth: {
            strategy: 'jwt',
            scope: ['admin', 'recruiter']
        },
    validate: {
        payload: {
            jobAdID: Joi.number().required(),
            jobREF: Joi.string().required().trim().max(50),
            jobTitle: Joi.string().required().trim().max(50),
            recruiterUserID: Joi.number().required()
        }
    },
    handler: function (request, reply) {
        var cancelURL = "https://www.jobmix.co.za/#/recruiter/checkout-order";
        async.waterfall([function (cb) {
            JobAd.findOne({ _id: request.payload.jobAdID}, function (err, jobAd) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!jobAd) {
                    return reply(Boom.notFound("Job Ad not found!"));
                }
                if (jobAd) {
                    if (jobAd.paid == true) {
                        return reply(Boom.badRequest("JobAdID " + jobAd._id + "with jobREF " + request.payload.jobREF + " already paid"));
                    }
                    return cb(null, jobAd);
                }
            });

        }, function (jobAd0, cb) {
            Recruiter.findOne({ userID: request.payload.recruiterUserID }, function (err, recruiter) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!recruiter) {
                    return reply(Boom.badRequest("Can not find recruiter userID!"));

                }
                if (recruiter) {
                    return cb(null,jobAd0, recruiter);
                }
            });

        }, function (jobAd1, recruiter1, cb) {
            Item.findOne({
                minimumJobAds: { $lte: 1 },
                maximumJobAds: { $gte: 1 },
                category: 'Job Ad'
            }, function (err, item0) {
                if (err) {
                    return reply(Boom.badRequest('Could not add job ad  to order,try again!'))
                }
                if (!item0) {
                    return reply(Boom.badRequest('Could not add job ad  to order,try again!'));
                }
                if (item0) {
                    return cb(null,jobAd1, recruiter1, item0)
                }
            })
        }, function (jobAd2,recruiter2, item0, cb) {
            //create job Ad Order
            var order = new Order();
            order.recruiterID = recruiter2._id;
            order.userID = recruiter2.userID;
            order.orderType = 'Job Ad';
            order.paymentID = '';
            order.subTotal = 0;
            order.tax = 0;
            order.orderDetails.push({ jobAdID: jobAd2._id, jobREF: jobAd2.jobREF,jobTitle:jobAd2.jobTitle });
            order.jobAdTotal = 1;
            order.unitPrice = item0.unitPrice;
            order.total = item0.unitPrice
            order.save(function (err, order0) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (order0) {
                    var orderSignature = generateSignature(order0, cancelURL);
                    console.log(orderSignature);
                    var getString = generateGetString(order0, cancelURL, orderSignature);
                    console.log(getString);
                    return cb(null, { order: order0, getString: getString, message: 'JobAd added to order successfully! '})
                }
            });

        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply(result);
        })
    }
};

    exports.createJobAdAddToNewOrder = {
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
            applicationsLimit: Joi.number().integer().allow(['', null]),
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
        var cancelURL = "https://www.jobmix.co.za/#/recruiter/checkout-order";
        async.waterfall([function (cb) {
            JobAd.findOne({ jobREF: request.payload.jobREF, company: request.payload.company }, function (err, jobAd) {
                if (err) {
                    return reply(Boom.badRequest(err));                 
                }
                if (!jobAd) {
                    return cb();
                }
                if (jobAd) {
                    return reply(Boom.badRequest("JobREF " + request.payload.jobREF + " already exists"));                 
                }
            });

        }, function (cb) {
            Recruiter.findOne({ _id: request.payload.company}, function (err, recruiter) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!recruiter) {
                    return reply(Boom.badRequest("Can not find recruiter userID!"));
                    
                }
                if (recruiter) {
                    return cb(null,recruiter);
                }
            });

        }, function (recruiter0,cb) {
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
            jobAd.applicationsLimit = request.payload.applicationsLimit;
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
                return cb(null,recruiter0, jobAd);
            });
        },function (recruiter1,jobAd, cb) {
            Item.findOne({
                minimumJobAds: { $lte: 1 },
                maximumJobAds: { $gte: 1 },
                category:'Job Ad'
            }, function (err, item0) {
                if (err) {
                    return reply(Boom.badRequest('Could not add job ad  to order,try again!'))
                }
                if (!item0) {
                    return reply(Boom.badRequest('Could not add job ad  to order,try again!'));
                }
                if(item0){
                    return cb(null,recruiter1,jobAd,item0)
                }
            })
        }, function (recruiter2, jobAd, item0, cb) {
            var orderItem = {
                jobAdID: jobAd._id,
                jobREF: jobAd.jobREF,
                jobTitle: jobAd.jobTitle
            };
            //create job Ad Order
            var order = new Order();
            order.recruiterID = recruiter2._id;
            order.userID = recruiter2.userID;
            order.orderType = 'Job Ad';
            order.paymentID = '';
            order.subTotal = 0;
            order.tax = 0;       
            order.unitPrice = item0.unitPrice;
            order.total = item0.unitPrice;
            order.orderDetails.push(orderItem);
            order.save(function (err, order0) {
                if (err) {
                    return reply(Boom.badRequest(err));               
                }
                if (order0) {
                    var orderSignature = generateSignature(order0,cancelURL);
                    var getString = generateGetString(order0,cancelURL, orderSignature);
                    return cb(null, { order: order0, getString: getString,message: 'JobREF ' + jobAd.jobREF + 'has been created successfully with JobID ' + jobAd._id })
                }
            });

        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));         
            }
            return reply(result);
        })
    }
};

    exports.createJobAdAddToExistingOrder = {
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
            applicationsLimit: Joi.number().integer().allow(['', null]),
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
        var cancelURL = "https://www.jobmix.co.za/#/recruiter/checkout-order";
        async.waterfall([function (cb) {
            JobAd.findOne({ jobREF: request.payload.jobREF, company: request.payload.company }, function (err, jobAd) {
                if (err) {
                    return reply(Boom.badRequest(err));                 
                }
                if (!jobAd) {
                    return cb();
                }
                if (jobAd) {
                    return reply(Boom.badRequest("JobREF " + request.payload.jobREF + 'already exists'));
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
            jobAd.applicationsLimit = request.payload.applicationsLimit;
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
                return cb(null, jobAd);
            });
        }, function (jobAd, cb) {
            Order.findOne({ _id: request.params.orderID}, function (err, order) {
                if (err) {
                    return reply(Boom.badRequest(err));                 
                }
                if (!order) {
                    return reply(Boom.badRequest('Order not found!'));                              
                }
                order.orderDetails.push({ jobAdID: jobAd._id, jobREF: jobAd.jobREF ,jobTitle: jobAd.jobTitle});
                return cb(null, jobAd, order);
            });

        }, function (jobAd, order, cb) {
            //find prices
            Item.findOne({
                minimumJobAds: { $lte: order.orderDetails.length },
                maximumJobAds: { $gte: order.orderDetails.length },
                category: order.orderType
            }, function (err, item0) {
                if (err) {
                    return reply(Boom.badRequest(err))
                }
                if (!item0) {
                    return reply(Boom.badRequest(err));
                }
                if (item0) {
                    return cb(null,jobAd, order, item0)
                }
            })
        }, function (jobAd ,order, item0, cb) {
            order.jobAdTotal = order.orderDetails.length;
            order.unitPrice = item0.unitPrice;
            var unitPrice = item0.unitPrice;
            var total = 0;
            for (var i = 0; i < order.orderDetails.length; i++) {       
                total += unitPrice;
            };
            order.total = total;
            order.save(function (err, order0) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (order0) {
                    var orderSignature = generateSignature(order0,cancelURL);
                    var getString = generateGetString(order0,cancelURL, orderSignature);
                    return cb(null, { order: order0, getString: getString, message: 'JobREF ' + jobAd.jobREF + 'has been created successfully with JobID ' + jobAd._id })
                }
            })

        }], function (err,result) {
            if (err) {
                return reply(Boom.badRequest(err));             
            }
            return reply(result);
        })
    }
};

    exports.addExistingJobAdToExistingOrder = {
        auth: {
            strategy: 'jwt',
            scope: ['admin', 'recruiter']
        },
    validate: {
        payload: {           
                orderID: Joi.number().integer().required(),
                jobAdID: Joi.number().integer().required(),
                jobREF: Joi.string().required().trim().max(50),
                jobTitle: Joi.string().required().trim().max(50)
        }
    },
    handler: function (request, reply) {
        var cancelURL = "https://www.jobmix.co.za/#/recruiter/checkout-order";
        async.waterfall([function (cb) {
            Order.findOne({ '_id': request.payload.orderID }, function (err, order) {
                if (err) {
                    console.log(err);
                    return reply(Boom.badRequest(err));
                }
                if (!order) {
                    return reply(Boom.badRequest('Order' + request.payload.orderID + 'could not be found!'))
                }
                if (order) {
                    for (var i = 0; i < order.orderDetails.length; i++) {
                        if (order.orderDetails[i].jobAdID === request.payload.jobAdID) {
                            return reply(Boom.badRequest('JobAdID ' + request.payload.jobAdID + ' already added to Order# ' + request.payload.orderID))
                        }
                    };
                    var orderItem = {
                        jobAdID: request.payload.jobAdID,
                        jobREF: request.payload.jobREF,
                        jobTitle: request.payload.jobTitle,
                    };
                    order.orderDetails.push(orderItem);
                    return cb(null,orderItem,order);
                }                                  
            }); 
        }, function (orderItem,order, cb) {
            Item.findOne({
                          minimumJobAds: { $lte: order.orderDetails.length },
                          maximumJobAds: { $gte: order.orderDetails.length },
                          category:order.orderType
            }, function (err, item0) {
                if (err) {
                    return reply(Boom.badRequest(err))
                }
                if (!item0) {
                    console.log('item not found');
                    return reply(Boom.notFound(err));
                }
                if(item0){
                    return cb(null,orderItem,order,item0)
                }
            })
        },function(orderItem,order,item0,cb){
            order.jobAdTotal = order.orderDetails.length;
            order.unitPrice = item0.unitPrice;                        
            var unitPrice = item0.unitPrice;
            var total = 0;
            for (var i = 0; i < order.orderDetails.length; i++) {
                total += unitPrice;
            };
            order.total = total;
            order.save(function (err, order0) {
                if (err) {
                    console.log(err);
                    return reply(Boom.badRequest(err));

                }
                if (order0) {
                    var orderSignature = generateSignature(order0,cancelURL);
                    var getString = generateGetString(order0,cancelURL, orderSignature);                           
                    return cb(null, { order: order0, getString: getString,message:'JobREF: ' + orderItem.jobREF + ' added to order successfully!' })
                }
            })

        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err.message));
            }
            return reply(result);
        })
        
    }
};

    exports.updateJobAdAddToExistingOrder = {
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
            applicationsLimit: Joi.number().integer().allow(['', null]),
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
        var cancelURL = "https://www.jobmix.co.za/#/recruiter/checkout-order";
        async.waterfall([function (cb) {
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
                jobAd.applicationsLimit = request.payload.applicationsLimit;
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
                jobAd.save(function (err, jobAd0) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobAd0);            
                })
            });

        },  function (jobAd, cb) {
            Order.findOne({ _id: request.params.orderID }, function (err, order) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!order) {
                    return reply(Boom.notFound('Order not found!'));
                }
                order.orderDetails.push({ jobAdID: jobAd._id, jobREF: jobAd.jobREF ,jobTitle: jobAd.jobTitle });
                return cb(null, jobAd, order);
            });

        }, function (jobAd, order, cb) {
            //find prices
            Item.findOne({
                minimumJobAds: { $lte: order.orderDetails.length },
                maximumJobAds: { $gte: order.orderDetails.length },
                category: order.orderType
            }, function (err, item0) {
                if (err) {
                    return reply(Boom.badRequest(err))
                }
                if (!item0) {
                    return reply(Boom.badRequest(err));
                }
                if (item0) {
                    return cb(null, jobAd, order, item0)
                }
            })
        }, function (jobAd, order, item0, cb) {
            order.jobAdTotal = order.orderDetails.length;
            order.unitPrice = item0.unitPrice;
            var unitPrice = item0.unitPrice;
            var total = 0;
            for (var i = 0; i < order.orderDetails.length; i++) {
                total += unitPrice;
            };
            order.total = total;
            order.save(function (err, order0) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (order0) {
                    var orderSignature = generateSignature(order0,cancelURL);
                    var getString = generateGetString(order0,cancelURL, orderSignature);
                    return cb(null, { order: order0, getString: getString, message: 'JobREF ' + jobAd.jobREF + ' has been updated successfully!'})
                }
            })

        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply(result);
        })
    }
};

    exports.updateJobAdAddToNewOrder = {
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
            applicationsLimit: Joi.number().integer().allow(['', null]),
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
        var cancelURL = "https://www.jobmix.co.za/#/recruiter/checkout-order";
        async.waterfall([function (cb) {
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
                jobAd.applicationsLimit = request.payload.applicationsLimit;
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
                jobAd.save(function (err, jobAd0) {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    return cb(null, jobAd0);                   
                })
            });

        }, function (jobAd, cb) {
            Item.findOne({
                minimumJobAds: { $lte: 1 },
                maximumJobAds: { $gte: 1 },
                category: 'Job Ad'
            }, function (err, item0) {
                if (err) {
                    return reply(Boom.badRequest('Could not add job ad  to order,try again!'))
                }
                if (!item0) {
                    return reply(Boom.badRequest('Could not add job ad  to order,try again!'));
                }
                if (item0) {
                    return cb(null, jobAd, item0)
                }
            })
        }, function (jobAd, item0, cb) {
            var orderItem = {
                jobAdID: jobAd._id,
                jobREF: jobAd.jobREF,
                jobTitle: jobAd.jobTitle
            };
            //create job Ad Order
            var order = new Order();
            order.recruiterID = jobAd.company;
            order.userID = jobAd.userID;
            order.orderType = 'Job Ad';
            order.paymentID = '';
            order.subTotal = 0;
            order.tax = 0;
            order.unitPrice = item0.unitPrice;
            order.total = item0.unitPrice;
            order.orderDetails.push(orderItem);
            order.save(function (err, order0) {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (order0) {
                    var orderSignature = generateSignature(order0,cancelURL);
                    var getString = generateGetString(order0,cancelURL, orderSignature);
                    return cb(null, { order: order0, getString: getString, message: 'JobREF ' + jobAd.jobREF + ' has been updated successfully!'})
                }
            });

        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            return reply(result);
        })
    }
};

    exports.deleteExistingJobAdFromExistingOrder = {
    auth: {
            strategy: 'jwt',
            scope: ['admin', 'recruiter']
        },
    validate: {
        query: {           
            orderID: Joi.number().integer().required(),
            jobAdID: Joi.number().integer().required()                   
        }
    },
    handler: function (request, reply) {
        var cancelURL = "https://www.jobmix.co.za/#/recruiter/checkout-order";
        async.waterfall([function (cb) {
            Order.findOne({ '_id': request.query.orderID }, function (err, order) {
                if (err) {     
                    return reply(Boom.badRequest(err))
                }
                if (!order) {
                    return reply(Boom.badRequest('Order' + request.query.orderID + 'could not be found!'))                
                }
                if (order) {
                    
                    for (var i = 0; i < order.orderDetails.length; i++) {
                        if (order.orderDetails[i].jobAdID == request.query.jobAdID) {
                            order.orderDetails.splice(i, 1);
                            console.log(order);
                        }
                    };   
                    var total = 0;
                    for (var i = 0; i < order.orderDetails.length; i++) {
                        total += unitPrice;
                    };
                    order.total = total;
                    console.log(order);
                    order.save(function (err,order0) {
                        if (err) {
                            return reply(Boom.badRequest(err))
                        }
                        return cb(null, order0);
                    })                
                }                                  
            });
        }, function (order, cb) {
            Item.findOne({
                minimumJobAds: { $lte: order.orderDetails.length },
                maximumJobAds: { $gte: order.orderDetails.length },
                category: order.orderType
            }, function (err, item) {
                if (err) {
                    return reply(Boom.badRequest(err))
                }
                if (!item) {
                    return reply(Boom.notFound(err))
                }
                if(item){
                    return cb(null,order,item)
                }
            })
        },function(order,item0,cb){
            order.jobAdTotal = order.orderDetails.length;
            order.unitPrice = item0.unitPrice;                        
            var unitPrice = item0.unitPrice;
            var total = 0;
            for (var i = 0; i < order.orderDetails.length; i++) {
                total += unitPrice;
            };
            order.total = total;
            order.save(function (err, order0) {
                if (err) {
                    return reply(Boom.badRequest(err))
                }
                if (order0) {
                    var orderSignature = generateSignature(order0,cancelURL);
                    var getString = generateGetString(order0,cancelURL, orderSignature);                           
                    return cb(null, { order: order0, getString: getString,message:'Order item removed successfully!' })
                }
            })

        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest(err.message));
            }
            return reply(result);
        })
        
    }
};

exports.pay = {
    plugins:{
        'hapi-io': {
            event: 'pay',
            mapping: {
                headers:['Authorization']
            }
        }
    },
    handler: function (request, reply) {
        console.log('paid');
        var socket = request.plugins['hapi-io'].socket;
        if (socket) {
            reply({ success: true });
        }
        socket.emit('paid', { orderID: request.params.orderID });

        /*
        console.log('Pay event received');
        
        var socket = request.plugins['hapi-io'].socket;
        socket.emit('paid', { orderID: 1 });

        
        notifier.on('paid', (_order) => {
            if (request.payload.orderID === _order.orderID) {
                socket.emit('paid', { orderID: 1 });
                console.log('Paid Emitted To client');
            }
        });
        //console.log('SocketIO Event');
       // reply({code: 200});
        
        var order = request.payload;
        notifier.on('paid', (_order) => {
            if (order.orderID === _order.orderID) {
                return reply({ message: 'Order' + _order.orderID + 'paid successfully!' });
            }
        });

        notifier.on('cancelled', (_order) => {
            if (order.orderID === _order.orderID) {
                return reply({ message: 'Order' + _order.orderID + 'payment cancelled!' });
            }
        })
        */
    }
};

/*
exports.paymentSuccess = {
    handler: function (request, reply) {
        notifier.emit("paid", { orderID: order0._id, payment_status: "COMPLETE" })
        return;
    }
};

exports.paymentCancelled = {
    handler: function (request, reply) {
      return  reply.redirect('/');
        /*
        Order.findOne({ _id: request.payload.orderID }, function (err, order) {
            if (err) {
                notifier.emit("error", order)
                return;
            }
            if (!order) {
                notifier.emit("error", order)
                return;
            }
            if (order) {
                notifier.emit("cancelled",order)
                return;
            }

        })
        
        
    }
};
*/

exports.paymentNotify = {
    auth: false,
    handler: function (request, reply) {            
            var paymentData = {};
            var merchant_id = config.payfast.MERCHANT_ID;
            //console.log(request.payload.m_payment_id);
            //console.log(request.payload);
            console.log(request.payload);
        //console.log(request.params);
            if (!request.payload) {
                console.log('Parameters cannot be null');
                return reply(Boom.badRequest('Parameters cannot be null'));
            }
        
        //verify merchant_id
            if (request.payload.merchant_id !== merchant_id) {
                //throw new Error('Invalid Merchant ID');
                console.log('Invalid Merchant ID');
                return reply(Boom.badRequest('Invalid Merchant ID'));
            }
   
        //verify IP Address
        /*
            if (!IPaddressValidate.validateIPaddress(request)) {
                //throw new Error('Invalid IP Address');
                return reply(Boom.badRequest('Invalid IP Address'));
            }
        */
        //search for order.
            async.waterfall([function (cb) {
                GetOrder(request.payload.m_payment_id, function (err, order) {
                    if (err) {
                        //throw new Error(err.message);
                        console.log('Get order error');
                        return reply(Boom.badRequest('Get order error'));
                    }
                    if (!order) {
                        // throw new Error("Order not found");
                        console.log('Order not found');
                        return reply(Boom.badRequest('Order not found'));
                    }
                    return cb(null, order);
                });
            }, function (order,cb) {
                //verify if order has not been processed already
                if (request.payload.pf_payment_id === order.pf_payment_id) {
                    //throw new Error('Order has been processed already');
                    console.log('Order has been processed already');
                    return reply(Boom.badRequest('Order has been processed already'));
                }
                //verify amount
                if (request.payload.amount_gross !== order.total.toFixed(2)) {
                    //throw new Error('Amount Mismatch');
                    console.log('Amount Mismatch');
                    return reply(Boom.badRequest('Amount Mismatch'));
                }
                // 
                /*
                paymentData = PaymentData(request.payload);
                //validate payment data posted from Payfast
                if (!PaymentDataValidate(paymentData)) {
                    console.log('Invalid Data');
                    return reply(Boom.badRequest('Invalid Data'));
                }
                */
                return cb(null, order);
            }, function (order,cb) {
                //update order to paid
                if (order.paid === false && request.payload.payment_status === 'COMPLETE') {
                    order.paid = true; // update payment status to true
                    order.paymentID = request.payload.pf_payment_id; // add payfast payment id
                    UpdateOrder(order, function (err, order0) {
                        if (err) {
                            //throw new Error(err.message);
                            console.log('Update order error');
                            return reply(Boom.badRequest('Update order error'));
                        }
                        return cb(null, order0)
                    });
                }
            }, function (order1, cb) {
                //update jobads to paid
                for (var i = 0; i < order1.orderDetails.length; i++) {
                    var jobID = order1.orderDetails[i].jobAdID;
                    async.waterfall([function (cb0) {
                        GetJobAd(jobID, function (err, jobAd0) {
                            if (err) {
                                //throw new Error(err.message);
                                console.log('Get job ad error');
                                return reply(Boom.badRequest('Get job ad error'));
                            }
                            return cb0(null, jobAd0);
                        });
                    }, function (jobAd, cb0) {
                        jobAd.paid = true;
                        UpdateJobAd(jobAd, function (err, jobAd0) {
                            if (err) {
                                //throw new Error(err.message);
                                console.log('Update job ad error');
                                return reply(Boom.badRequest('Update job ad error'));
                            }
                            return cb0(null, jobAd0);
                        });

                    }], function (err, result) {
                        if (err) {
                            //throw new Error(err.message);
                            console.log('Job ad get and update error');
                            return reply(Boom.badRequest('Job ad get and update error'));
                        }
                        return;
                    })

                }
                return cb(null, { message: 'Order paid successfully!' })
            }], function (err,result) {
                if (err) {
                    //throw new Error(err.message);
                    console.log(err.message);
                    return reply(Boom.badRequest('Order payment error'));
                }
                return reply('Order paid successfully!').code(200);//inform payfast server that this route is reachable );
            })       
    }
};



exports.updateOrder = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    validate: {
        payload: {
            orderID: Joi.number().required(),
            recruiterID: Joi.number().required(),
            subTotal: Joi.number().required(),
            tax: Joi.number(),
            total: Joi.number().required(),
            paymentStatus: Joi.string().required(),
        }
    },
    handler: function (request, reply) {
        Order.findOne({ '_id': request.payload.orderID }, function (err, order) {
            if (err) {
                return reply(Boom.badRequest("An error occured while updating order,try again"));
            } else {
                if (order) {
                    order.paymentID = request.payload.paymentID
                    order.recruiterID = request.payload.recruiterID;
                    order.subTotal = request.payload.subTotal;
                    order.tax = request.payload.tax;
                    order.total = request.payload.total;
                    order.paymentStatus = request.payload.paymentStatus;
                    order.save(function (err, order0) {
                        if (err) {
                            return reply(Boom.badRequest("An error occured while updating order,try again"));
                        }                         
                        return reply({ message: "Order with ID" + order0._id + "updated successfully" });
                        
                    });
                } else {
                    return reply(Boom.notFound("Order was not found"));
                }
            }


        });
    }
};

exports.markOrderPaid = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    handler: function (request, reply) {
        async.waterfall([function (cb) {
            Order.findOne({ '_id': request.payload.orderID }, function (err, order) {
                if (err) {
                    return reply(Boom.badRequest(err.message));
                }
                if (!order) {
                    return reply(Boom.notFound('Order not found!'));
                }
                return cb(null, order);
            });
        }, function (order,cb) {
            //update order to paid
            if (order.paid === false) {
                order.paid = true; // update payment status to true
                order.paymentID = 'Admin'; // use Admin as payment ID
                UpdateOrder(order, function (err, order0) {
                    if (err) {
                        return reply(Boom.badRequest('Update order error'));
                    }
                    return cb(null, order0)
                });
            }

        }, function (order1, cb) {
            //update jobads to paid
            for (var i = 0; i < order1.orderDetails.length; i++) {
                var jobID = order1.orderDetails[i].jobAdID;
                async.waterfall([function (cb0) {
                    GetJobAd(jobID, function (err, jobAd0) {
                        if (err) {
                            return reply(Boom.badRequest('Get job ad error'));
                        }
                        return cb0(null, jobAd0);
                    });
                }, function (jobAd, cb0) {
                    jobAd.paid = true;
                    UpdateJobAd(jobAd, function (err, jobAd0) {
                        if (err) {
                            //throw new Error(err.message);
                            console.log('Update job ad error');
                            return reply(Boom.badRequest('Update job ad error'));
                        }
                        return cb0(null, jobAd0);
                    });

                }], function (err, result) {
                    if (err) {
                        return reply(Boom.badRequest('Job ad get and update error'));
                    }
                    return;
                })

            }
            return cb(null, { message: 'Order paid successfully!' })

        }], function (err, result) {
            if (err) {
                return reply(Boom.badRequest('Job ad get and update error'));
            }
            return reply({message: 'Order has been marked paid successfully!'});
        })
    }
};

exports.deleteOrder = {
    auth: {
        strategy: 'jwt',
        scope: ['admin']
    },
    handler: function (request, reply) {
        Order.findOneAndRemove({ '_id': request.query.orderID }, function (err, order) {
            console.log(request.params);
            if (err) {
                return reply(Boom.badRequest(err.message));
            }
            return reply({ message: "Order deleted successfully" });
        });
    }
};

exports.deleteOrderRecruiter = {
    auth: {
        strategy: 'jwt',
        scope: ['recruiter']
    },
    handler: function (request, reply) {
        Order.findOneAndRemove({ '_id': request.payload.orderID,userID:request.payload.recruiterUserID }, function (err, recruiter) {
            if (err) {
                return reply(Boom.badRequest(err.message));
            }
            return reply({ message: "Order deleted successfully" });
        });
    }
};

exports.deleteAllOrders = {
    auth: {
        strategy: 'jwt',
        scope: ['admin', 'recruiter']
    },
    handler: function (request, reply) {
        mongoose.connection.db.dropCollection('orders', function (err, result) {
            if (err) {
                return reply(Boom.badRequest("Could not delete orders"));

            } else {
                return reply({ message: "Orders database successfully deleted" });
            }

        });
    }
};

function generateSignature(order, cancelURL) {
    var signature_string = 'merchant_id=' + config.payfast.MERCHANT_ID + 
                    '&merchant_key=' + config.payfast.MERCHANT_KEY +
                    '&return_url=' + config.payfast.RETURN_URL + 
                    '&cancel_url=' + cancelURL + 
                    '&notify_url=' + config.payfast.NOTIFY_URL + 
                    '&m_payment_id=' + order._id +
                    '&amount=' + order.total +
                    '&item_name=' + 'Jobmix.co.za, Order #' + order._id +
                    '&item_description=' + 'Job Ads Order' 
                    
                    
    //generate security signature
    return strings.md5(signature_string);
};

function generateGetString(order,cancelURL, _signature) {
    var itemName = 'Jobmix.co.za, Order #' + order._id;
    
    var getString = 'merchant_id=' + encodeURIComponent(config.payfast.MERCHANT_ID) + 
                    '&merchant_key=' + encodeURIComponent(config.payfast.MERCHANT_KEY) + 
                    '&return_url=' + encodeURIComponent(config.payfast.RETURN_URL) + 
                    '&cancel_url=' + encodeURIComponent(cancelURL) + 
                    '&notify_url=' + encodeURIComponent(config.payfast.NOTIFY_URL) + 
                    '&m_payment_id=' + encodeURIComponent(order._id) + 
                    '&amount=' + encodeURIComponent(order.total) + 
                    '&item_name=' + encodeURIComponent(itemName) + 
                    '&item_description=' + encodeURIComponent('Job Ads Order')                             
    return getString;
}
/*
,
            post: function (ctx, next) {
                console.log('paid post event');
                ctx.socket.emit('paid', { orderID: 1 });
                /*
                notifier.on('paid', (_order) => {
                    if (ctx.data.orderID ===_order.orderID) {
                        ctx.socket.emit('paid', { orderID: 1 });
                        console.log(ctx.data.orderID);
                        console.log('Paid Emitted To client');
                    }
                });
                
}
*/
function GetOrder(orderID, cb) {
    var operation = retry.operation();
    operation.attempt(function (currentAttempt) {
        Order.findOne({ _id: orderID }, function (err, order) {
            if (operation.retry(err)) {
                return;
            }
            cb(err ? operation.mainError() : null, order);
        })
    });
}

function UpdateOrder(order,cb) {
  var operation = retry.operation();

  operation.attempt(function(currentAttempt) {
    order.save(function(err, order0) {
      if (operation.retry(err)) {
        return;
      }

      cb(err ? operation.mainError() : null, order0);
    });
  });
}

function GetJobAd(jobID,cb) {
    var operation = retry.operation();
    operation.attempt(function (currentAttempt) {
        JobAd.findOne({ _id: jobID }, function (err, jobAd) {
            if (operation.retry(err)) {
                return;
            }
            cb(err ? operation.mainError() : null, jobAd);
        })
    });
}

function UpdateJobAd(jobAd, cb) {
    var operation = retry.operation();
    operation.attempt(function (currentAttempt) {
        jobAd.save(function (err, jobAd0) {
            if (operation.retry(err)) {
                return;
            }
            cb(err ? operation.mainError() : null, jobAd0);
        })
    });
}
