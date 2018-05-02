'use strict';

const Path = require('path');
const Hapi = require('hapi');
const corsHeaders = require('hapi-cors-headers');
const Db = require('./config/db');
const config = require('./config/config');
const nconf = require('nconf');



var secret = config.ENCR_KEY;
const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../ui')
            }
        }
    }
});

server.connection({ port: 3000 });
/*
var options = {
    reporters: [{
        reporter: require('good-file'),
        events: { error: '*' },
        config: './jobmix.log'
    }]
};
*/
server.register(require('hapi-auth-jwt'), (err) => {
    // We are giving the strategy a name of 'jwt'
    server.auth.strategy('jwt', 'jwt', 'required', {
        key: secret,
        verifyOptions: { algorithms: ['HS256'] }
    });
});

// load multiple plugins ,require('./admin'),require('./auth'),require('./cvFiles'),require('./attachmentFiles')
server.register([require('inert'), require('hapi-io'), require('good'), require('./admin'), require('./auth'), require('./cvFiles'),
    require('./attachmentFiles'), require('./jobAdverts'), require('./jobApplications'), require('./jobSeekers'),
    require('./orders'), require('./recruiters'), require('./resumes'), require('./ui'), require('./questionnaires')], (err) => {
    if (err) {
        console.error('Failed to load a plugin:', err);
    }
});

server.ext('onPreResponse', corsHeaders);

server.start(() => {
    console.log('Server running at:', server.info.uri);
});