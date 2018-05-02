'use strict';

const Boom = require('boom');
const Recruiter = require('../../models/mongodbModels/recruiter');


function verifyUniqueRecruiter(request, reply) {
    console.log('Search for unique recruiter');
  // Find an entry from the database that
  // matches either the email or username
  Recruiter.findOne({userID: request.params.userID}, (err, recruiter) => {
      if (err) {
         return reply(Boom.badRequest('An error occured while creating recruiter details,try again!'));
      }
     // Check whether the userID
    // is already taken and error out if so
    if (recruiter) {
        if (recruiter.userID === request.params.userID) {
           return reply(Boom.badRequest('Recruiter details already added!'));
      }
    }
    // If everything checks out, send the payload through
    // to the route handler
    return reply(request.payload);
  });
}
