'use strict';
var MD5 = require("crypto-js/md5");
var Joi = require('joi'),
    Boom = require('boom'),
    Order = require('../../models/mongodbModels/order'),
    IPaddressValidate = require('./orderValidateIPaddress'),
    PaymentDataEncoded = require('./paymentDataEncoded'),
    OrderValidateSignature = require('./orderValidateSignature'),
    PaymentDataValidate = require('./orderValidatePaymentData'),
    EventEmitter = require("events").EventEmitter,
    mongoose = require('mongoose');
   
var nconf = require('nconf');
    
    nconf.file('../settings.json')
         .env();
    

exports.getAllOrders = {
    handler: function (request, reply) {
        Order.find({}, function (err, orders) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for order,try again"));
            } else {
                if (orders) {
                    return reply(orders);
                } else {
                    return reply(Boom.badRequest("No orders found"));
                }
            }
        });
    }
};

exports.getOrderByID = {
    handler: function (request, reply) {
        Order.findOne({ '_id': request.payload.orderID }, function (err, order) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for order,try again"));
            } else {
                if (order) {
                    return reply(order);
                } else {
                    return reply(Boom.badRequest("No order found"));
                }
            }
        });
    }
};
exports.getOrdersByRecruiterID = {
    handler: function (request, reply) {
        Order.find({ 'recruiterID': request.payload.recruiterID }, function (err, orders) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for orders,try again"));
            } else {
                if (orders) {
                    return reply(orders);
                } else {
                    return reply(Boom.badRequest("No orders found"));
                }
            }
        });
    }
};

exports.createOrder = {
    validate: {
        payload: {
            cart: Joi.array().items(Joi.object().keys({
                _id: Joi.number().integer().required(),
                jobTitle: Joi.string().alphanum().required().trim().min(1).max(50),
                jobREF: Joi.string().alphanum().required().trim().min(1).max(50),
                price: Joi.number().required()
            })),
        }
    },
    handler: function (request, reply) {
        var order = new Order(request.payload.cart);
        order.save(function (err, order) {
            if (err) {
                return reply(Boom.badRequest("An error occured while creating  order,try again"));
            } else {
                if (order) {
                    var orderSignature = generateSignature(order);

                    return reply({
                        merchant_id: nconf.get('merchant_id'),
                        merchant_key: nconf.get('merchant_key'),
                        return_url: nconf.get('return_url'),
                        cancel_url: nconf.get('cancel_url'),
                        notify_url: nconf.get('notify_url'),
                        m_payment_id: order._id,
                        amount: order.total,
                        item_name: 'JobsApp, Order #' + order._id,
                        item_description: 'Job Ads Order',                       
                        signature: orderSignature
                    });
                } else {
                    return reply(Boom.badRequest("Could not create order,try again"));
                }
            }
        });
    }
};

exports.paymentSuccess = {
    handler: function (request, reply) {
        EventEmitter.emit("success", { orderID: order0._id, payment_status: "COMPLETE" })
        return;
    }
};

exports.paymentCancelled = {
    handler: function (request, reply) {
        EventEmitter.emit("cancelled", { orderID: order0._id, payment_status: "PENDING" })
        return;
    }
};


exports.paymentNotify = {
    handler: function (request, reply) {
            reply('OK').code(200);//inform payfast server that this route is reachable            
            var pfData = request.payload;
            var paymentDataEncoded = '';
        //search for order.
        Order.findOne({ '_id': request.payload.m_payment_id }, function (err, order) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for orders,try again"));
            } else {
                if (order) {
                    try {
                        // 
                        paymentDataEncoded = PaymentDataEncoded(pfData);
                        //verify merchant_id
                        var merchant_id = nconf.get('merchant_id');
                        if (pfData.merchant_id !== merchant_id) {
                            throw new Error('Invalid Merchant ID')
                        }

                        //verify if order has not been processed already
                        if(pfData.pf_payment_id === order.pf_payment_id){
                            throw new Error('Order has been processed already')
                        }
                        //verify amount
                        if (pfData.amount_gross !== order.total) {
                            throw new Error('Amount Mismatch')
                            }
                        //verify IP Address
                        if (!IPaddressValidate.validateIPaddress(request)) {
                            throw new Error('Invalid IP Address')
                        }
                        //validate posted data Signature
                        if (!OrderValidateSignature(paymentDataEncoded, pfData)) {
                            throw new Error('Invalid Signature')
                        }
                        //validate payment data posted from Payfast
                        if (!PaymentDataValidate(paymentDataEncoded)) {
                            throw new Error('Invalid Data')
                        }
                        
                        //update order to paid
                        if (order.paymentStatus !== 'COMPLETE' && pfData.payment_status === 'COMPLETE') {
                            order.paymentStatus = pfData.payment_status; // update paymentStatus to complete
                            order.pf_payment_id = pfData.pf_payment_id; // add payfast payment id
                            order.save(function (err, order0) {
                                if (err) {
                                    return reply(Boom.badRequest("An error occured while updating order,try again"));
                                } else {
                                    if (order0) {
                                        EventEmitter.emit("paid",{orderID: order0._id,payment_status: "COMPLETE"})
                                        return;
                                    } else {
                                        return reply(Boom.badRequest("Order with ID" + recruiter._id + "could not be updated,try again"));
                                    }
                                }
                            });
                        }
                    }
                    catch (err) {
                        return reply(Boom.badRequest(err.message));
                    }
                } else {
                    return reply(Boom.badRequest("No orders found"));
                }
            }
        });
    }
};



exports.updateOrder = {
    validate: {
        payload: {
            paymentID: Joi.String,
            recruiterID: Joi.number().required(),
            subTotal: Joi.number().required(),
            tax: Joi.number(),
            total: Joi.number().required(),
            paymentStatus: Joi.String().required(),
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
                        } else {
                            if (order0) {
                                return reply({ message: "Order with ID" + recruiter0._id + "updated successfully" });
                            } else {
                                return reply(Boom.badRequest("Order with ID" + recruiter._id + "could not be updated,try again"));
                            }
                        }
                    });
                } else {
                    return reply(Boom.badRequest("Order was not found"));
                }
            }


        });
    }
};


exports.deleteOrder = {
    handler: function (request, reply) {
        Order.findOne({ '_id': request.payload.orderID }, function (err, recruiter) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for order,try again"));
            } else {
                if (recruiter) {
                    recruiter.remove();
                    return reply({ message: "Order deleted successfully" });
                } else {
                    return reply(Boom.badRequest("Order was not found"));
                }
            }
        });
    }
};

exports.deleteAllOrders = {
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

function generateSignature(order) {
    var signature = 'merchant_id' + '=' + nconf.get('merchant_id') + '&' +
                    'merchant_key' + '=' + nconf.get('merchant_key') + '&' +
                    'return_url' + '=' + nconf.get('return_url') + '&' +
                    'cancel_url' + '=' + nconf.get('cancel_url') + '&' +
                    'notify_url' + '=' + nconf.get('notify_url') + '&' +
                    'm_payment_id' + '=' + order._id + '&' +
                    'amount' + '=' + order.total + '&' +
                    'item_name' + '=' + 'JobsApp, Order #' + order._id + '&' +
                    'item_description' + '=' + 'Job Ads Order'    
    //generate security signature
    var signature1 = MD5(signature);
    return signature1;
}