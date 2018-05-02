'use strict';

const Boom = require('boom');
const JobSeeker = require('../../models/mongodbModels/jobSeeker');


function verifyUniqueJobSeeker(request, reply) {
    console.log('Search for unique jobSeeker');
  // Find an entry from the database that
  // matches either the email or username
  JobSeeker.findOne({email: request.params.email}, (err, jobSeeker) => {
      if (err) {
         return reply(Boom.badRequest('An error occured while creating job seeker,try again!'));
      }
     // Check whether the email
    // is already taken and error out if so
    if (jobSeeker) {
        if (jobSeeker.email === request.params.email) {
           return reply(Boom.badRequest('Job seeker already added!'));
      }
    }
    // If everything checks out, send the payload through
    // to the route handler
    return reply(request.payload);
  });
}
