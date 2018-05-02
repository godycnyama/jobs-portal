

exports.generateGetString = function (order,_signature) {
    var itemName  
    itemName +='JobsApp, Order #' + order._id;
    var getString = 'merchant_id' + '=' + encodeURIComponent(nconf.get('merchant_id')) + '&' +
                    'merchant_key' + '=' + encodeURIComponent(nconf.get('merchant_key')) + '&' +
                    'return_url' + '=' + encodeURIComponent(nconf.get('return_url')) + '&' +
                    'cancel_url' + '=' + encodeURIComponent(nconf.get('cancel_url')) + '&' +
                    'notify_url' + '=' + encodeURIComponent(nconf.get('notify_url')) + '&' +
                    'm_payment_id' + '=' + encodeURIComponent(order._id) + '&' +
                    'amount' + '=' + encodeURIComponent(order.total) + '&' +
                    'item_name' + '=' + encodeURIComponent(itemName) + '&' +
                    'item_description' + '=' + encodeURIComponent('Job Ads Order') + '&' +
                    'signature' + '=' + encodeURIComponent(_signature);
    return getString;
}

