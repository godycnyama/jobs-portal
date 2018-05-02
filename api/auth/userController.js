'use strict';

const bcrypt = require('bcryptjs');
const Boom = require('boom');
const Joi = require('joi');
const async = require('async');
const Mailgun = require('mailgun-js');
const User = require('../models/mongodbModels/user');
const JobSeeker = require('../models/mongodbModels/jobSeeker');
const Recruiter = require('../models/mongodbModels/recruiter');
const verifyUniqueUser = require('./util/userFunctions').verifyUniqueUser;
const verifyCredentials = require('./util/userFunctions').verifyCredentials;
const config = require('../config/config');
const createToken = require('./util/token');
const generatePassword = require('password-generator');


function hashPassword(password, cb) {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
}

exports.reDirect = {
    auth: false,
        handler: (request, reply) => {            
            return reply.redirect('http://localhost:3000/#/profile'); //redirect to success partial
        }
    
}

exports.signUp = {
    auth: false,
    // Before the route handler runs, verify that the user(email) is unique
    pre: [
      { method: verifyUniqueUser }
    ],
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required().trim().min(1).max(50),
            passwordRecoveryEmail: Joi.string().email(),
            role: Joi.string().alphanum().required().trim().min(1).max(50),
        }
    },
    handler: (request, reply) => {
        console.log('About to create user');
      let user = new User();
      user.email = request.payload.email;
      user.passwordRecoveryEmail = request.payload.passwordRecoveryEmail;
      user.role = request.payload.role;
      hashPassword(request.payload.password, (err, hash) => {
          if (err) {
              console.log(err);
              return reply(Boom.badRequest("An error occured while creating(hashing password) user,try again!"));
        }
        user.password = hash;
        user.save((err, user) => {
            if (err) {
                console.log(err);
              return reply(Boom.badRequest("An error occured while creating(saving user) user,try again!"));
            }
            console.log(user);
          // If the user is saved successfully, issue a JWT
          return reply({
              id_token: createToken(user),
              userID: user._id,
              userEmail: user.email,
              role: user.role,
              passwordTemporary: user.passwordTemporary,
              passwordTemporaryTTL: user.passwordTemporaryTTL,
              message: 'Your account has been created successfully!'
          }).code(201);
        });
      });
    }  
}

exports.adminSignup = {
    auth: false,
    // Before the route handler runs, verify that the user(email) is unique
    pre: [
      { method: verifyUniqueUser }
    ],
    validate: {
        payload: {
            username: Joi.string().email().required(),
            password: Joi.string().required().trim().max(50),
            securityQuestion: Joi.string().required().trim().max(100),
            securityQuestionAnswer: Joi.string().required().trim().max(50),
            passwordRecoveryEmail: Joi.string().email()
        }
    },
    handler: (request, reply) => {
        console.log('About to create user');
      let user = new User();
      user.email = request.payload.username;
      user.passwordRecoveryEmail = request.payload.passwordRecoveryEmail;
      user.role = 'admin';
      user.securityQuestion = request.payload.securityQuestion;
      user.securityQuestionAnswer = request.payload.securityQuestionAnswer;
      hashPassword(request.payload.password, (err, hash) => {
          if (err) {
              console.log(err);
              return reply(Boom.badRequest("An error occured while creating(hashing password) user,try again!"));
        }
        user.password = hash;
        user.save((err, user) => {
            if (err) {
                console.log(err);
              return reply(Boom.badRequest("An error occured while creating(saving user) user,try again!"));
            }
            console.log(user);
          // If the user is saved successfully, issue a JWT
          return reply({
              id_token: createToken(user),
              userID: user._id,
              userEmail: user.email,
              role: user.role,
              passwordTemporary: user.passwordTemporary,
              passwordTemporaryTTL: user.passwordTemporaryTTL,
              message: 'Your account has been created successfully!'
          }).code(201);
        });
      });
    }  
}

exports.recruiterSignup = {
    auth: false,
    // Before the route handler runs, verify that the user(email) is unique
    pre: [
      { method: verifyUniqueUser }
    ],
    validate: {
        payload: {
            username: Joi.string().email().required(),
            password: Joi.string().required().trim().max(50),
            securityQuestion: Joi.string().required().trim().max(100),
            securityQuestionAnswer: Joi.string().required().trim().max(50),
            passwordRecoveryEmail: Joi.string().email(),
            role: Joi.string().required().trim().max(50),
            companyName: Joi.string().required().trim().max(50),
            recruiterType: Joi.string().required().trim().max(50),
            companySector: Joi.string().required().trim().max(50),
            yearFounded: Joi.string().required().trim().max(4),
            numberOfemployees: Joi.string().required().trim().max(50),
            introduction: Joi.string().required().trim().max(500),
            physicalAddress: Joi.string().trim().max(50).allow(['', null]),
            postalAddress: Joi.string().trim().max(50).allow(['', null]),
            tel: Joi.string().trim().max(50).allow(['', null]),
            mobile: Joi.string().trim().max(50).allow(['', null]),
            email: Joi.string().email().trim().max(50).allow(['', null]),
            fax: Joi.string().trim().max(40).allow(['', null]),
            website: Joi.string().trim().max(50).allow(['', null]),
            companyLogo: Joi.string().allow(['', null])
        }
    },
    handler: (request, reply) => {
        async.waterfall([function (cb) {
            let user = new User();
            user.email = request.payload.username;
            user.passwordRecoveryEmail = request.payload.passwordRecoveryEmail;
            user.role = request.payload.role;
            user.securityQuestion = request.payload.securityQuestion;
            user.securityQuestionAnswer = request.payload.securityQuestionAnswer;
            hashPassword(request.payload.password, (err, hash) => {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                user.password = hash;
                user.save((err, user) => {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    // If the user is saved successfully, issue a JWT
                    return cb(null, {
                        id_token: createToken(user),
                        userID: user._id,
                        userEmail: user.email,
                        role: user.role,
                        passwordTemporary: user.passwordTemporary,
                        passwordTemporaryTTL: user.passwordTemporaryTTL,
                        message: 'Your account has been created successfully!'
                    });
                });
            });
        }, function (user,cb) {
            var recruiter = new Recruiter();
            recruiter.userID = user.userID;
            recruiter.companyName = request.payload.companyName; 
            recruiter.recruiterType = request.payload.recruiterType;
            recruiter.companySector = request.payload.companySector;
            recruiter.yearFounded = request.payload.yearFounded;
            recruiter.numberOfemployees = request.payload.numberOfemployees;
            recruiter.introduction = request.payload.introduction;
            recruiter.physicalAddress = request.payload.physicalAddress;
            recruiter.postalAddress = request.payload.postalAddress;
            recruiter.tel = request.payload.tel;
            recruiter.mobile = request.payload.mobile;
            recruiter.email = request.payload.email;
            recruiter.fax = request.payload.fax;
            recruiter.website = request.payload.website;
            recruiter.companyLogo = request.payload.companyLogo;
            recruiter.cvs = [];
            recruiter.save(function (err, recruiter) {
                if (err) {
                    return reply(Boom.badRequest(err))
                }
                return cb(null, user ,recruiter);
            })
        }], function (err, user,recruiter) {
            if (err) {
                return reply(Boom.badRequest(err))
            }
            return reply({ user: user, recruiter: recruiter });
        })     
    }
}

exports.jobSeekerSignup = {
    auth: false,
    // Before the route handler runs, verify that the user(email) is unique
    pre: [
      { method: verifyUniqueUser }
    ],
    validate: {
        payload: {
            username: Joi.string().email().required(),
            password: Joi.string().required().trim().max(50),
            securityQuestion: Joi.string().required().trim().max(100),
            securityQuestionAnswer: Joi.string().required().trim().max(50),
            passwordRecoveryEmail: Joi.string().email(),
            role: Joi.string().required().trim().max(50),
            firstName: Joi.string().required().trim().max(50),
            middleName: Joi.string().allow(['', null]).trim().max(50),
            lastName: Joi.string().required().trim().max(50),
            gender: Joi.string().required().trim().max(50),
            birthDate: Joi.date().required(),
            nationality: Joi.string().required().trim().max(50),
            profession: Joi.string().required().trim().max(100),
            mainQualification: Joi.string().allow(['', null]).trim().max(500),
            introduction: Joi.string().allow(['', null]).trim().max(500),
            homeTel: Joi.string().allow(['', null]).trim().max(50),
            workTel: Joi.string().allow(['', null]).trim().max(50),
            mobile: Joi.string().allow(['', null]).trim().max(50),
            address: Joi.string().required().trim().max(150),
            locationTown: Joi.string().required().trim().max(50),
            locationCountry: Joi.string().required().trim().max(50),
            linkedInProfile: Joi.string().allow(['', null]).trim().max(150),
            website: Joi.string().allow(['', null]).trim().max(150),
            professionalAffiliations: Joi.string().allow(['', null]).trim().max(500),
            noticePeriod: Joi.string().required().trim().max(50),
            requiredSalaryCurrency: Joi.string().required().trim().max(150),
            requiredMinimumSalary: Joi.string().required().trim().max(50),
            requiredMaximumSalary: Joi.string().required().trim().max(50),
            photo: Joi.string().allow(['', null]).trim(),
            preferredJobTitles: Joi.string().allow(['', null]).trim().max(500),
            preferredJobTypes: Joi.string().allow(['', null]).trim().max(500),
            preferredJobLocations: Joi.string().allow(['', null]).trim().max(500),
        }
    },
    handler: (request, reply) => {
        async.waterfall([function (cb) {
            let user = new User();
            user.email = request.payload.username;
            user.passwordRecoveryEmail = request.payload.passwordRecoveryEmail;
            user.role = request.payload.role; 
            user.securityQuestion = request.payload.securityQuestion;
            user.securityQuestionAnswer = request.payload.securityQuestionAnswer;
            hashPassword(request.payload.password, (err, hash) => {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                user.password = hash;
                user.save((err, user) => {
                    if (err) {
                        return reply(Boom.badRequest(err));
                    }
                    // If the user is saved successfully, issue a JWT
                    return cb(null, {
                        id_token: createToken(user),
                        userID: user._id,
                        userEmail: user.email,
                        role: user.role,
                        passwordTemporary: user.passwordTemporary,
                        passwordTemporaryTTL: user.passwordTemporaryTTL,
                        message: 'Your account has been created successfully!'
                    });
                });
            });
        }, function (user, cb) {
            var jobSeeker = new JobSeeker();
            jobSeeker.userID = user.userID;
            jobSeeker.email = request.payload.email;
            jobSeeker.firstName = request.payload.firstName;
            jobSeeker.middleName = request.payload.middleName;
            jobSeeker.lastName = request.payload.lastName;
            jobSeeker.gender = request.payload.gender;
            jobSeeker.birthDate = request.payload.birthDate;
            jobSeeker.nationality = request.payload.nationality;
            jobSeeker.profession = request.payload.profession;
            jobSeeker.mainQualification = request.payload.mainQualification;
            jobSeeker.introduction = request.payload.introduction;
            jobSeeker.homeTel = request.payload.homeTel;
            jobSeeker.workTel = request.payload.workTel;
            jobSeeker.mobile = request.payload.mobile;
            jobSeeker.email = request.payload.username;
            jobSeeker.address = request.payload.address;
            jobSeeker.locationTown = request.payload.locationTown;
            jobSeeker.locationCountry = request.payload.locationCountry;
            jobSeeker.linkedInProfile = request.payload.linkedInProfile;
            jobSeeker.website = request.payload.website;
            jobSeeker.professionalAffiliations = request.payload.professionalAffiliations;
            jobSeeker.noticePeriod = request.payload.noticePeriod;
            jobSeeker.requiredSalaryCurrency = request.payload.requiredSalaryCurrency;
            jobSeeker.requiredMinimumSalary = request.payload.requiredMinimumSalary;
            jobSeeker.requiredMaximumSalary = request.payload.requiredMaximumSalary;
            jobSeeker.photo = request.payload.photo;
            jobSeeker.preferredJobTitles = request.payload.preferredJobTitles;
            jobSeeker.preferredJobTypes = request.payload.preferredJobTypes;
            jobSeeker.preferredJobLocations = request.payload.preferredJobLocations;
            jobSeeker.cv.fileID = null;
            jobSeeker.cv.fileName = '';
            jobSeeker.cv.content_type = '';
            jobSeeker.save(function (err, jobSeeker) {
                if (err) {
                    return reply(Boom.badRequest(err))
                }
                return cb(null, user,jobSeeker);
            })
        }], function (err, user,jobSeeker) {
            if (err) {
                return reply(Boom.badRequest(err))
            }
            return reply({user: user,jobSeeker: jobSeeker});
        })
    }
}

exports.signIn = {
        auth: false,
        // Check the user's password against the DB
        pre: [
          { method: verifyCredentials, assign: 'user' }
        ],
        handler: (request, reply) => {
            // If the user's password is correct, we can issue a token.
            // If it was incorrect, the error will bubble up from the pre method
            return reply({
                id_token: createToken(request.pre.user),
                userID: request.pre.user._id,
                userEmail: request.pre.user.email,
                role: request.pre.user.role,
                passwordTemporary: request.pre.user.passwordTemporary,
                passwordTemporaryTTL: request.pre.user.passwordTemporaryTTL,
                message: 'You have signed in successfully!'
            });
        }
    
}

exports.changePassword = {
    auth: false,
    // Check the user's password against the DB
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: (request, reply) => {
        console.log('Hash Password')
        let user = new User(request.pre.user);
        hashPassword(request.payload.newPassword, (err, hash) => {
            if (err) {
               return reply(Boom.badRequest('An error occured while changing password,try again!'));              
            }
            user.password = hash;
            user.passwordTemporary = false;
            user.save((err, user) => {
                if (err) {
                    return reply(Boom.badRequest('An error occured while changing password,try again!'));
                }
                console.log(user)
                // If the password is changed successfully, issue a JWT
                return reply({
                    id_token: createToken(user),
                    userID: user._id,
                    userEmail: user.email,
                    role: user.role,
                    passwordTemporary: user.passwordTemporary,
                    passwordTemporaryTTL: user.passwordTemporaryTTL,
                    message: 'Password changed successfully!'
                });
            });
        });
        
    }
}

exports.changePasswordRecoveryEmail = {
    auth: false,
    // Check the user's password against the DB
    pre: [
      { method: verifyCredentials, assign: 'user' }
    ],
    handler: (request, reply) => {
        let user = new User(request.pre.user);
        user.passwordRecoveryEmail = request.payload.passwordRecoveryEmail;
        user.save((err, user) => {
            if (err) {
                return reply(Boom.badRequest('An error occured while updating password recovery information,try again!'));
            }
            // If the user security info is changed successfully, issue a JWT
            return reply({
                id_token: createToken(user),
                userID: user._id,
                userEmail: user.email,
                role: user.role,
                passwordTemporary: user.passwordTemporary,
                passwordTemporaryTTL: user.passwordTemporaryTTL,
                message: 'Password recovery info changed successfully!'
            });
        });

    }
}

exports.resetPassword = {
    auth: false,
    handler: (request, reply) => {
        async.waterfall([
            function (cb) {
                User.findOne({ email: request.payload.email }, (err, user) => {
                    if (err) {
                       return cb(new Error('An error occured while trying to recover password,try again!'))
                       // response(Boom.badRequest('An error occured while trying to recover password,try again!'));
                    }
                    if (!user) {
                       return cb(new Error('Incorrect email!'))
                    }
                    if (user) {                        
                            let password = generatePassword(10, false);
                            //send temporary password to email
                            hashPassword(password, (err, hash) => {
                                if (err) {
                                  return cb(new Error('An error occured while creating temporary password,try again!'))                                   
                                }
                                user.password = hash;
                                user.passwordTemporary = true;
                                user.save((err, user) => {
                                    if (err) {
                                        return cb(new Error('An error occured while creating temporary password,try again!'))                                     
                                    }
                                    // pass email and temporary  password  to the next function
                                   return cb(null,password,user.passwordRecoveryEmail)
                                });
                            });
                        
                    }
                });
            },
            function (password,email, cb) {
                //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
                var mailgun = new Mailgun({ apiKey: config.mailgun_key, domain: config.email_domain});
                var data = {
                    from: config.sending_email,
                    to: email,
                    subject: 'Password Recovery',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                          'Your temporary password is' + password + 'and is valid for 24Hours.Please log into your account before expiry.\n'
                };

                mailgun.messages().send(data, function (err, body) {
                    if (err) {
                        //pass error to the next function
                        return cb(err)
                    }
                    //pass password recovery email address to the next function
                  return cb(null, email)
                });
            }], function (err,email) {
            if (err) {
                return reply(Boom.badRequest(err.message));
            }
            return reply({ message: 'A temporary password has been sent to' + email + 'Please change password after logging in using the temporary password' })
        })
        

    }
};

exports.resetPasswordWithQuestion = {
    auth: false,
    validate: {
        payload: {
            username: Joi.string().email().required(),
            newPassword: Joi.string().required().trim().max(50),
            securityQuestion: Joi.string().required().trim().max(100),
            securityQuestionAnswer: Joi.string().required().trim().max(50)
        }
    },
    handler: (request, reply) => {
        User.findOne({ 'email': request.payload.username }, function (err, user) {
            if (err) {
                return reply(Boom.badRequest(err));
            }
            if (!user) {
                return reply(Boom.notFound('User not found!'));
            }
            var security_question_answer = user.securityQuestionAnswer;
            var security_question_answer0 = request.payload.securityQuestionAnswer;
            if (user.securityQuestion !== request.payload.securityQuestion) {
                return reply(Boom.badRequest('Incorrect security question!'));
            }
            if (security_question_answer.toLowerCase() !== security_question_answer0.toLowerCase()) {
                return reply(Boom.badRequest('Incorrect security question answer!'));
            }
            hashPassword(request.payload.newPassword, (err, hash) => {
                if (err) {
                    return reply(Boom.badRequest(err));
                }
                user.password = hash;
                user.save((err, user) => {
                    if (err) {            
                        return reply(Boom.badRequest(err));
                    }
                    console.log(user);
                    // If the user is saved successfully, issue a JWT
                    return reply({
                        id_token: createToken(user),
                        userID: user._id,
                        userEmail: user.email,
                        role: user.role,
                        passwordTemporary: user.passwordTemporary,
                        passwordTemporaryTTL: user.passwordTemporaryTTL,
                        message: 'Your password has been reset successfully!'
                    })
                });
            });
        });
    }
};
exports.getAllUsers = {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: function (request, reply) {
        User.find()
        // Deselect the password and version fields
            .select('-password -__v')
            .exec((err, users) => {
                if (err) {
                    throw Boom.badRequest(err);
                }
                if (!users.length) {
                    throw Boom.notFound('No users found!');
                }
               return reply(users);
            })
    }
};

exports.getUser = {
  auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
  handler: function (request, reply) {
    User.findOne({ 'email': request.params.email }, function (err, user) {
      if(err){
          throw Boom.badRequest(err);
      }
      if(!user){
          throw Boom.notFound('User not found!');
      }
    return reply(user);                
    });
  }
};

exports.deleteUser = {
  auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
  handler: function (request, reply) {
      switch(request.query.role){
          case 'recruiter':
              async.waterfall([function (cb) {
                  User.findOne({ '_id': request.query.userID }, function (err, user) {
                      var user0 = user;
                      if (err) {
                          return reply(Boom.badRequest(err.message));
                      }
                      if (!user) {
                          return reply(Boom.badRequest("Job Seeker not found!"));
                      }
                      user.remove(function (err, user1) {
                          if (err) {
                              return reply(Boom.badRequest(err.message));
                          }
                          return cb(null, user0);
                      })
                  })
              }, function (user1, cb) {
                  Recruiter.findOneAndRemove({ 'userID': user1._id }, function (err, user) {
                      if (err) {
                          return reply(Boom.badRequest(err.message));
                      }
                      return cb();
                  })
              }], function (err, result) {
                  if (err) {
                      return reply(Boom.badRequest(err.message));
                  }
                  return reply({ message: 'Recruiter deleted successfully!' });
              })
              break;
          case 'jobseeker':
              async.waterfall([function (cb) {
                  User.findOne({ '_id': request.query.userID }, function (err, user) {
                      var user0 = user;
                      if (err) {
                          return reply(Boom.badRequest(err.message));
                      }
                      if (!user) {
                          return reply(Boom.badRequest("User not found!"));
                      }
                      user.remove(function (err, user1) {
                          if (err) {
                              return reply(Boom.badRequest(err.message));
                          }
                          return cb(null, user0);
                      })
                  })
              }, function (user1, cb) {
                  JobSeeker.findOneAndRemove({ 'userID': user1._id }, function (err, jobSeeker) {
                      if (err) {
                          return reply(Boom.badRequest(err.message));
                      }
                      return cb();
                  })
              }], function (err, result) {
                  if (err) {
                      return reply(Boom.badRequest(err.message));
                  }
                  return reply({ message: 'User deleted successfully!' });
              })
              break;

      }
  }
};

exports.getUsersBy = {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    validate: {
        query: {
            searchBy: Joi.string().alphanum().required().trim().min(1).max(50),
            searchTerm: Joi.string().alphanum().trim().max(50),
            pageNo: Joi.number().integer().required(),
            perPage: Joi.number().integer().required(),
            date: Joi.date(),
            fromDate: Joi.date(),
            toDate: Joi.date()
        }
    },
    handler: function (request, reply) {
        var searchBy = request.query.searchBy;
        var date = new Date(request.query.date);
        date.setHours(0, 0, 0, 0);
        var dateFrom = new Date(request.query.dateFrom);
        dateFrom.setHours(0, 0, 0, 0);
        var dateTo = new Date(request.query.dateTo);
        dateTo.setHours(0, 0, 0, 0);
        switch (searchBy) {
            case 'All':
                User.paginate({}, {sort:{createdOn: -1}, page: request.query.pageNo, limit: request.query.perPage }, function (err, users) {
                    console.log(request.query);
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for users,try again!"));
                    }
                    if(users.total === 0){
                        return reply(Boom.notFound("No users found!"));
                    }
                    return reply({
                                data: users.docs,
                                total: users.total,
                                perPage: users.limit,
                                pageNo: users.page
                            });
                        
                });
                break;
            case 'UserID':
                User.find({ '_id': request.query.searchTerm }, function (err, user) {
                        if(err){
                            throw Boom.badRequest(err);
                        }
                        if(!user){
                            throw Boom.notFound('User not found!');
                        }
                        return reply(user);                
                });
                break;
            case 'Email':
                User.find({ 'email': request.query.searchTerm }, function (err, user) {
                        if(err){
                            throw Boom.badRequest(err);
                        }
                        if(!user){
                            throw Boom.notFound('User not found!');
                        }
                        return reply(user);                
                });
                break;
            case 'Date':
                User.populate({ createdOn: date }, { page: request.query.pageNo, limit: request.query.perPage }, function (err, users) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for users,try again!"));
                    }
                    if(!users){
                        return reply(Boom.notFound("No users found!"));
                    }
                    return reply({
                                data: users.docs,
                                total: users.total,
                                perPage: users.limit,
                                pageNo: users.page
                            });                        
                });
                break;
            case 'Date Range':
                User.populate({ createdOn: { $gt: dateFrom, $lt: dateTo } }, { page: request.query.pageNo, limit: request.query.perPage }, function (err, users) {
                    if (err) {
                        return reply(Boom.badRequest("An error occured while searching for users,try again!"));
                    }
                    if(!users){
                        return reply(Boom.notFound("No users found!"));
                    }
                    return reply({
                                data: users.docs,
                                total: users.total,
                                perPage: users.limit,
                                pageNo: users.page
                            });                  
                    
                });
                break;

        }
    }

};

