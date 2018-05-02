'use strict';
var _ = require('underscore');
var dns = require('dns');
var retry = require('retry');

exports.validateIPaddress = function (request) {
    var remoteAddress = request.info.remoteAddress;
    var validIpAddresses = [
            "197.97.145.156",
            "41.74.179.194",
            "41.74.179.195",
            "41.74.179.196",
            "41.74.179.197",
            "41.74.179.200",
            "41.74.179.201",
            "41.74.179.203",
            "41.74.179.204",
            "41.74.179.210",
            "41.74.179.211",
            "41.74.179.212",
            "41.74.179.217",
            "41.74.179.218"
    ];
    var isIPValid = _.contains(validIpAddresses, remoteAddress);
    return isIPValid;
}
/*
exports.validateIPaddress = function (request) {
    var remoteAddress = request.info.remoteAddress;
    var isIPValid = false;
    
    var validDomainNames = [
        'www.payfast.co.za',
        'sandbox.payfast.co.za',
        'w1w.payfast.co.za',
        'w2w.payfast.co.za'
    ];

    var validIpAddresses = [

    ];
    /*
    for (var i = 0; i < validDomainNames.length; i++) {
        faultTolerantResolve(validDomainNames[i], function (err, addresses) {     
            if (err) {
                console.log(err);
            };
            // merge ipaddresses and remove duplicates
            validIpAddresses = _.union(validIpAddresses, addresses);
        });
    };
    
    for (var i = 0; i < validDomainNames.length; i++) {
        dns.resolve(validDomainNames[i], function (err, addresses) {
            if (err) {
                throw new Error;
            };
            // merge ipaddresses and remove duplicates
            validIpAddresses = _.union(validIpAddresses, addresses);
            
           // for (var x = 0; x < addresses.length; x++) {
           //     validIpAddresses = addresses[x];
           // }
            
        });
    };
    */
    /*
    // remove duplicate ip addresses
    var validIpAddressesUnique = _.uniq(validIpAddresses);

    for (var y = 0; y < validIpAddressesUnique.length; y++) {
        if (validIpAddressesUnique[y] === remoteAddress) {
            isIPValid = true;
            break;
        } else if ((validIpAddressesUnique[y] !== remoteAddress) && (y === (validIpAddressesUnique.length - 1))) {
            isIPValid = false;
            break;
        } else {
            continue;
        }
    };
    

    var arrayIndex = _.indexOf(validIpAddresses, remoteAddress);
    if (arrayIndex == -1) {
        isIPValid = false; // ip address is not valid
    } else {
        isIPValid = true;
    }
    return isIPValid;

}

function faultTolerantResolve(address, cb) {
    var operation = retry.operation();

    operation.attempt(function (currentAttempt) {
        dns.resolve(address, function (err, addresses) {
            if (operation.retry(err)) {
                return;
            }

            cb(err ? operation.mainError() : null, addresses);
        });
    });
}
*/