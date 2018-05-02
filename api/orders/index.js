'use strict';
var OrderMongoController = require('./orderMongoController');


exports.register = function (server, options, next) {

    server.route([
    {
        method: 'Get',
        path: '/api/orders',
        config: OrderMongoController.getAllOrders    
    },
    {
        method: 'Get',
        path: '/api/orders/getOrdersBy',
        config: OrderMongoController.getOrdersBy    
    },
    {
        method: 'Get',
        path: '/api/orders/getRecruiterOrdersBy',
        config: OrderMongoController.getRecruiterOrdersBy
    },
    {
        method: 'Get',
        path: '/api/orders/getUnpaidOrders',
        config: OrderMongoController.getUnpaidOrders
    },
    {
        method: 'Get',
        path: '/api/orders/{orderID}',
        config: OrderMongoController.getOrderByID
    },
    {
        method: 'Get',
        path: '/api/orders/recruiter/{recruiterID}',
        config: OrderMongoController.getOrdersByRecruiterID
    },
    {
        method: 'POST',
        path: '/api/orders/paymentNotify',
        config: OrderMongoController.paymentNotify
    },
    {
        method: 'POST',
        path: '/api/orders/pay/{orderID}',
        config: OrderMongoController.pay
    },
    {
        method: 'POST',
        path: '/api/orders/createJobAdOrder',
        config: OrderMongoController.createJobAdOrder
    },
    {
        method: 'POST',
        path: '/api/orders/proceedToCheckout',
        config: OrderMongoController.proceedToCheckout
    },
    {
        method: 'POST',
        path: '/api/orders/clearOrder',
        config: OrderMongoController.clearOrder
    },
    {
        method: 'POST',
        path: '/api/orders/createJobAdAddToNewOrder',
        config: OrderMongoController.createJobAdAddToNewOrder
    },
    {
        method: 'POST',
        path: '/api/orders/createJobAdAddToExistingOrder/{orderID}',
        config: OrderMongoController.createJobAdAddToExistingOrder
    },
    {
        method: 'POST',
        path: '/api/orders/addExistingJobAdAddToNewOrder',
        config: OrderMongoController.addExistingJobAdAddToNewOrder
    },
    {
        method: 'POST',
        path: '/api/orders/createSearchOrder',
        config: OrderMongoController.createSearchOrder
    },
    {
        method: 'PUT',
        path: '/api/orders/updateOrder',
        config: OrderMongoController.updateOrder
    },
    {
        method: 'POST',
        path: '/api/orders/addExistingJobAdToExistingOrder',
        config: OrderMongoController.addExistingJobAdToExistingOrder
    },
    {
        method: 'PUT',
        path: '/api/orders/updateJobAdAddToNewOrder',
        config: OrderMongoController.updateJobAdAddToNewOrder
    },
    {
        method: 'PUT',
        path: '/api/orders/updateJobAdAddToExistingOrder/{orderID}',
        config: OrderMongoController.updateJobAdAddToExistingOrder
    },
    {
        method: 'DELETE',
        path: '/api/orders/deleteExistingJobAdFromExistingOrder',
        config: OrderMongoController.deleteExistingJobAdFromExistingOrder
    },
    {
        method: 'DELETE',
        path: '/api/orders/deleteOrder',
        config: OrderMongoController.deleteOrder
    },
    {
        method: 'POST',
        path: '/api/orders/markOrderPaid',
        config: OrderMongoController.markOrderPaid
    },
    {
        method: 'POST',
        path: '/api/orders/deleteOrderRecruiter',
        config: OrderMongoController.deleteOrderRecruiter
    },
    {
        method: 'DELETE',
        path: '/api/orders/deleteAllOrders',
        config: OrderMongoController.deleteAllOrders
    }]);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};