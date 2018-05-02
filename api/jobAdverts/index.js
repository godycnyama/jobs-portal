'use strict';
var JobAdMongoController = require('./mongoDBControllers/jobAdMongoController');
exports.register = function (server, options, next) {

    server.route([{
        method: 'GET',
        path: '/api/jobAds',
        config: JobAdMongoController.getAllJobAds
    },
    {
        method: 'GET',
        path: '/api/jobAds/getJobAdsBy',
        config: JobAdMongoController.getJobAdsBy
    },
    {
        method: 'GET',
        path: '/api/jobAds/getRecruiterJobAdsBy',
        config: JobAdMongoController.getRecruiterJobAdsBy
    },
    {
        method: 'GET',
        path: '/api/jobAds/jobSeekerGetJobAds',
        config: JobAdMongoController.jobSeekerGetJobAds
    },
    {
        method: 'GET',
        path: '/api/jobAds/jobAdByID/{jobAdID}',
        config: JobAdMongoController.getJobAdByID
    },
    {
        method: 'GET',
        path: '/api/jobAds/jobAdByREF/{jobAdREF}',
        config: JobAdMongoController.getJobAdByREF
    },
    {
        method: 'GET',
        path: '/api/jobAds/jobAdsByRecruiterID/{recruiterID}',
        config: JobAdMongoController.getJobAdsByRecruiterID
    },
    {
        method: 'GET',
        path: '/api/jobAds/jobAdsByPaymentStatus/{paymentStatus}',
        config: JobAdMongoController.getJobAdsByPaymentStatus
    },
    {
        method: 'POST',
        path: '/api/jobAds',
        config: JobAdMongoController.createJobAd
    },
    {
        method: 'POST',
        path: '/api/jobAds/closeJobAd',
        config: JobAdMongoController.closeJobAd
    },
    {
        method: 'POST',
        path: '/api/jobAds/closeJobAdRecruiter',
        config: JobAdMongoController.closeJobAdRecruiter
    },
    {
        method: 'POST',
        path: '/api/jobAds/markPaidJobAd',
        config: JobAdMongoController.markPaidJobAd
    },
    {
        method: 'POST',
        path: '/api/jobAds/createAndAddToCart',
        config: JobAdMongoController.createAndAddToCart
    },
    {
        method: 'PUT',
        path: '/api/jobAds/updateJobAd',
        config: JobAdMongoController.updateJobAd
    },
    {
        method: 'PUT',
        path: '/api/jobAds/updateAndAddToCart',
        config: JobAdMongoController.updateAndAddToCart
    },
    {
        method: 'DELETE',
        path: '/api/jobAds/deleteJobAdByID',
        config: JobAdMongoController.deleteJobAdByID
    },
    {
        method: 'POST',
        path: '/api/jobAds/deleteJobAdByIDRecruiter',
        config: JobAdMongoController.deleteJobAdByIDRecruiter
    },
    {
        method: 'DELETE',
        path: '/api/jobAds/deleteJobAdByREF/{jobAdREF}',
        config: JobAdMongoController.deleteJobAdByREF
    },
    {
        method: 'DELETE',
        path: '/api/jobAds/deleteAllJobAds',
        config: JobAdMongoController.deleteAllJobAds
    }]);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};