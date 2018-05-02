'use strict';
const config = require('../config/config');
var request = require("request");
var retry = require('retry');
var Boom = require('boom');


exports.orderValidatePaymentData = function (paymentData) {
    PostValidationDataToPayFast(paymentData, function (err, valid0) {
        if (err) {
            console.log(err);
            return false;
        }
        return valid0;
    });
    /*
    var valid = false;
    valid = PostValidationDataToPayFast(paymentDataEncoded);
    return valid;
    */
}


//post data for validation
/*
    function PostValidationDataToPayFast(paymentData) {
        var valid = false;
        request({
            uri: config.payfast.VALIDATION_URL,
            method: "POST",
            form: paymentData
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var responseStr = body.toString();
                // replace line breaks with spaces
                var responseStr0 = responseStr.Replace("\r\n"," ").Replace("\r"," ").Replace("\n"," ")
                var responseLines = responseStr0.split(" ");
                var responseLine0 = responseLines[0];
                var responseLine0Trimmed = responseLine0.trim();
                valid = responseLine0Trimmed.startsWith("VALID");
                return valid;
            }
            if (error) {
                throw Boom.badRequest('An error occured while validating data');
            }     
        });     
    }
*/
//post data for validation
    function PostValidationDataToPayFast(paymentData, cb) {
        var valid = false;
        var operation = retry.operation();
        operation.attempt(function (currentAttempt) {
            request({
                uri: config.payfast.VALIDATION_URL,
                method: "POST",
                form: paymentData
            }, function (error, response, body) {
                if (operation.retry(error)) {
                    return;
                }
                if (!error && response.statusCode == 200) {
                    var responseStr = body.toString();
                    // replace line breaks with spaces
                    var responseStr0 = responseStr.Replace("\r\n", " ").Replace("\r", " ").Replace("\n", " ")
                    var responseLines = responseStr0.split(" ");
                    var responseLine0 = responseLines[0];
                    var responseLine0Trimmed = responseLine0.trim();
                    valid = responseLine0Trimmed.startsWith("VALID");
                    
                    cb(err ? operation.mainError() : null, valid);
                }              
            });
        });
    }