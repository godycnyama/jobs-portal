"use strict";
var Hapi = require('hapi');
//var validate = require('.serverAPI/auth/validate')
  //  Routes = require('./routes/routes');
  //Nconf = require('./config/config');

//var NODE_ENV = Nconf.get('NODE_ENV');
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;

//var secret ="dgdhjkkakwrteyuuwhhwdj"
//For older version of hapi.js
//var server = Hapi.createServer(app.config.server.host, app.config.server.port, {cors: true});

var server = new Hapi.Server();

server.connection({ port: port });

server.register([require('hapi-auth-jwt2'), require('./auth'),
    require('./files'), require('./jobAdverts'),
    require('./jobApplications'), require('./jobSeekers'),
    require('./jobSeekers'), require('./recruiters'), require('./ui'),
  /*  require('./serverAPI/orders'), require('./serverAPI/payments'), require('./serverAPI/questionnaire')*/]), function (err) {
        if(err){
            console.error('Failed to load plugin:', err);
        }
        
    };

// see: http://hapijs.com/api#serverauthschemename-scheme
//server.auth.strategy('jwt', 'jwt',
//{
//    key: secret, validateFunc: validate,
//    verifyOptions: { ignoreExpiration: true }
//});

//server.auth.default('jwt');

//server.route(Routes.endpoints);

server.start(function () {
  console.log('Server started ', server.info.uri);
});