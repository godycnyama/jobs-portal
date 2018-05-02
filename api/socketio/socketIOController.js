'use strict';
var notifier = require('./notifier');



exports.payOrder = {
    plugins:{
        'hapi-io': {
            event: 'pay',
            mapping: {
                headers:['Authorization']
            }
        }
    },
    handler: function (request, reply) {
        var order = request.payload;
        notifier.on('paid', function (_order) {
            if (order.orderID === _order.orderID) {
                return reply({ message: 'Order' + _order.orderID + 'paid successfully!' });
            }
        });

        notifier.on('cancelled', function (_order) {
            if (order.orderID === _order.orderID) {
                return reply({ message: 'Order' + _order.orderID + 'payment cancelled!' });
            }
        })
    }
};