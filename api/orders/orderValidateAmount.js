'use strict';
var Order = require('../../models/mongodbModels/order');

exports.getOrderByID = function (request) {
    var isAmountValid = false;
    Order.findOne({ '_id': request.payload.m_payment_id }, function (err, order) {
            if (err) {
                 throw new Error('An Error occured while searching for order')
            } else {
                if (order) {
                    if (order.total === request.payload.amount_gross) {
                        isAmountValid = true
                    } else {
                        isAmountValid = false;
                    }
                } else {
                    throw new Error('No order found');                    
                }
            }
        });

    return isAmountValid;
    }
