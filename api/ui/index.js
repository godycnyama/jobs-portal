'use strict';
var UIController = require('./uiController');
exports.register = function (server, options, next) {

    server.route([
	{
        method: 'GET',
        path: '/{params*}',
        config: UIController.getUI
	}       
    ]);
    // return index.html for everything else
    server.ext('onPostHandler', (request, reply) => {
        const response = request.response;
        if (response.isBoom && response.output.statusCode === 404) {
            return reply.file('index.html');
        }
        return reply.continue();
    });
    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};