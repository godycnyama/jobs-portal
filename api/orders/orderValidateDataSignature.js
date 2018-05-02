'use strict';

const strings = require('locutus/php/strings');
const config = require('../config/config');


exports.validatePayFastPostedDataSignature = function (paymentDataEncoded1,postedData) {
    var isPostedDataValid = false;   
    var paymentDataEncoded2 = paymentDataEncoded1;

    //add passphrase
    /*
    var pass_phrase = config.payfast.pass_phrase;
    if (pass_phrase !== '') {
        paymentDataEncoded2 += '&passphrase=' + encodeURIComponent(pass_phrase);
    }
    */

    //generate security signature
    var signature = strings.md5(paymentDataEncoded2);
    //compare signatures
    if (signature !== postedData.signature)
    {
        isPostedDataValid = false;
        //throw new Error('Invalid Signature');
    } else {
        isPostedDataValid = true
    }

    return isPostedDataValid;
}