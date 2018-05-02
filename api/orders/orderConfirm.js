'use strict';

var MD5 = require("crypto-js/md5");
var nconf = require('nconf');

    nconf.file('../settings.json')
         .env();

exports.confirmOrder = function (order) {

    var paymentDataEncoded = '';
    var paymentData = [
        {name: merchant_id,value: nconf.get('merchant_id')},        
        {name: merchant_key, value: nconf.get('merchant_key')},
        {name: return_url, value: nconf.get('return_url')},
        {name: cancel_url, value: nconf.get('cancel_url')},
        {name: notify_url, value: nconf.get('notify_url')},
        {name: name_first,value: ''},
        {name: name_last,value: ''},
        {name: email_address,value: '' },
        {name: m_payment_id, value: order._id },
        {name: amount,value: order.total },
        {name: item_name,value: 'JobsApp, Order #' + order._id },
        {name: item_description,value: 'Job Ads Order' }
    ];
   
    // create Get String
    for (i = 0; i < paymentData.length; i++) {
        if (paymentData[i].value !== '')
        {
        var dataName = paymentData[i].name;                
        var dataValue = paymentData[i].value;               
        paymentDataEncoded += dataName + encodeURIComponent(dataValue.trim()) + '&';
        }
    }
    //remove last &
    var paymentDataEncoded1 = paymentDataEncoded.substr(0, paymentDataEncoded.length - 1);
    var paymentDataEncoded2 = paymentDataEncoded1;
    //add passphrase
    var pass_phrase = nconf.get(pass_phrase);
    if ( pass_phrase!=='') {
        paymentDataEncoded2 += '&passphrase=' + encodeURIComponent(pass_phrase);
    }

    
    //generate security signature
    var signature = MD5(paymentDataEncoded2);
        paymentDataEncoded1 += '&signature=' + signature;
    // return string with signature but without passphrase
  return paymentDataEncoded1  
}