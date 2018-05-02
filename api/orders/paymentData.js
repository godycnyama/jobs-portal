'use strict';
const strings = require('locutus/php/strings');

exports.getPaymentData = function (data) {
    //get  Payfast posted data and create form data
    var data0 = data;
    var data1 = {};
    
    for (property in data0) {
        if (property !== 'signature') {
            data1[property] = data0[property];
        }
    }
    return data1;
}