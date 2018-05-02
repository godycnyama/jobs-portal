'use strict';

const Boom = require('boom');
const User = require('../../models/mongodbModels/user');
const config = require('../../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nconf = require('nconf');
const ms = require('ms');


function verifyUniqueUser(request, reply) {
    console.log('Search for unique user');
  // Find an entry from the database that
  // matches either the email or username
  User.findOne({email: request.payload.username}, (err, user) => {
      if (err) {
         return reply(Boom.badRequest('An error occured while creating user,try again!'));
      }
     // Check whether the email
    // is already taken and error out if so
    if (user) {
        if (user.email === request.payload.username) {
           return reply(Boom.badRequest('Email '+ request.payload.username + ' is already registered!'));
      }
    }
    // If everything checks out, send the payload through
    // to the route handler
    return reply(request.payload);
  });
}

function verifyCredentials(request, reply) {
  
  const password = request.payload.password;
  
  // Find an entry from the database that
  // matches the email
  User.findOne({ email: request.payload.email }, (err, user) => {
    if (err) {
          return reply(Boom.badRequest(err));
    }
    if (!user) {
        return reply(Boom.badRequest('Incorrect email!'));
    }
    if (user) {
      bcrypt.compare(password, user.password, (err, isValid) => {
          if (isValid) {
              var currentTime = new Date().getTime();
              if (user.passwordTemporary === true && currentTime > user.passwordTemporaryTTL) {
                  return reply(Boom.unauthorized('Expired temporary password,please reset your password again!'));
              }
         return reply(user);
        }
        else {
         return reply(Boom.badRequest('Incorrect password!'));
        }
      });
    } 
  });
}

function refreshToken(request, reply) {
    //get secret key
    var secret = config.ENCR_KEY;
    jwt.verify(request.headers.authorization, secret, function (err, decoded) {
        if (err) {
           return reply(Boom.unauthorized('Please log in!'));
        } else {
            var currentTime = new Date().getTime();
            //if refresh token time window has not expired,refresh the existing token,otherwise reply with unathorized( user must log in again)
            if (currentTime < decoded.refresh_ttl) {            
                var token = jwt.sign({ email: decoded.email, scope: decoded.scope, refresh_ttl: decoded.refresh_ttl },secret, { algorithm: 'HS256', expiresIn: "1h" });
               return reply(token);//pass token to the route handler
            } else {
               return reply(Boom.unauthorized('Please log in!'));
            }
        }
    })
    
}

module.exports = {
  verifyUniqueUser: verifyUniqueUser,
  verifyCredentials: verifyCredentials,
  refreshToken: refreshToken
}