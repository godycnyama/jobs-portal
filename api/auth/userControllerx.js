"use strict";
var Joi = require('joi');
var JWT = require('jsonwebtoken');
var aguid = require('aguid');
var nconf = require('nconf');
var User = require('../models/mongodbModels/user');
var JobSeeker = require('../models/mongodbModels/jobSeeker');
var Recruiter = require('../models/mongodbModels/recruiter');
var Session = require('../models/mongodbModels/session');
//nconf.env().file({ file: '/config/config.json'});



exports.signUpJobSeeker = {
    validate: {
        payload: {
            email: Joi.string().email().required().trim().min(1).max(50),
            password: Joi.string().required().trim().min(1).max(50),
            passwordRecoveryQuestion: Joi.string().alphanum().required().trim().min(1).max(50),
            passwordRecoveryQuestionAnswer: Joi.string().alphanum().required().trim().min(1).max(50),
            isJobSeeker: Joi.boolean().required(),
            keepSignedIn: Joi.boolean().required()
        }
    },
    handler: function (request, reply) {
        User.findOne({ email: request.payload.email}, function (err, user) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for user,try again")); 
            } else {
                if (user) {
                    reply({ message: "User"+ request.payload.email + "already exists,please register with a different email!" });
                } else {
                    var userModel = new User({
                        email: request.payload.email,
                        password: request.payload.password,
                        passwordRecoveryQuestion: request.payload.passwordRecoveryQuestion,
                        passwordRecoveryQuestionAnswer: request.passwordRecoveryQuestionAnswer,
                        isJobSeeker: request.payload.isJobSeeker,
                        keepSignedIn: request.payload.keepSignedIn
                    });
                    userModel.save(function (err, user1) {
                        if (err) {
                            return reply(Boom.badRequest("An error occured while creating user,try again"));
                        } else {
                            
                            var token = '';
                            var session = new Session();
                            session.sessionID = aguid();
                            session.email = user.email;
                            session.valid = true;
                            session.expiry = new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes
                            session.save(function (err, session) {
                                if (err) {
                                    return reply(Boom.badRequest("An error occured while logging in,try again"));
                                }
                                else {
                                     token = JWT.sign(JSON.stringify(session), process.env.JWT_SECRET);
                                }
                            })
                            
                                var jobSeeker = new JobSeeker();
                                jobSeeker.username = user1.email;
                                jobSeeker.save(function (err, jobSeeker1) {
                                    if (err) {
                                        return reply({ message: "User succesfully created,log in to continue!" }).code(201); // message: "User succesfully created!"
                                    } else {
                                        return reply(jobSeeker1).code(201).header("Authorization", token);
                                    }
                                })
                            
                            
                        }
              
                    })
                }
            }
        });

    }
};

exports.signUpRecruiter = {
    validate: {
        payload: {
            email: Joi.string().email().required().trim().min(1).max(50),
            password: Joi.string().required().trim().min(1).max(50),
            passwordRecoveryQuestion: Joi.string().alphanum().required().trim().min(1).max(50),
            passwordRecoveryQuestionAnswer: Joi.string().alphanum().required().trim().min(1).max(50),
            isJobSeeker: Joi.boolean().required(),
            keepSignedIn: Joi.boolean().required(),
            companyName: Joi.string().alphanum().required().trim().min(1).max(50),
            recruiterType: Joi.string().alphanum().required(),
            contactPerson: Joi.string().alphanum().required().trim().min(1).max(150),
            physicalAddress: Joi.string().alphanum().required().trim().min(1).max(50),
            postalAddress: Joi.string().alphanum().required().trim().min(1).max(50),
            town: Joi.string().alphanum().required().trim().min(1).max(50),
            country: Joi.string().alphanum().required().trim().min(1).max(50),
            tel: Joi.string().alphanum().required().trim().min(1).max(50),
            fax: Joi.string().alphanum().required().trim().min(1).max(50),
            website: Joi.string().alphanum().required().trim().min(1).max(50),
            logo: Joi.string(),           
        }
    },
    handler: function (request, reply) {
        User.findOne({ email: request.payload.email }, function (err, user) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for user,try again"));
            } else {
                if (user) {
                    reply({ message: "User" + request.payload.email + "already exists,please register with a different email!" });
                } else {
                    var userModel = new User({
                        email: request.payload.email,
                        password: request.payload.password,
                        passwordRecoveryQuestion: request.payload.passwordRecoveryQuestion,
                        passwordRecoveryQuestionAnswer: request.passwordRecoveryQuestionAnswer,
                        isJobSeeker: request.payload.isJobSeeker,
                        keepSignedIn: request.payload.keepSignedIn
                    });
                    userModel.save(function (err, user1) {
                        if (err) {
                            return reply(Boom.badRequest("An error occured while creating user,try again"));
                        } else {

                            var token = '';
                            var session = new Session();
                            session.sessionID = aguid();
                            session.email = user.email;
                            session.valid = true;
                            session.expiry = new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes
                            session.save(function (err, session) {
                                if (err) {
                                    return reply(Boom.badRequest("An error occured while logging in,try again"));
                                }
                                else {
                                    token = JWT.sign(JSON.stringify(session), process.env.JWT_SECRET);
                                }
                            });
                            
                                var recruiter = new Recruiter();
                                recruiter.email = request.payload.email;
                                recruiter.companyName = request.payload.companyName;
                                recruiter.recruiterType = request.payload.recruiterType;
                                recruiter.contactPerson = request.payload.contactPerson;
                                recruiter.physicalAddress = request.payload.physicalAddress;
                                recruiter.postalAddress = request.payload.postalAddress;
                                recruiter.town = request.payload.town;
                                recruiter.country = request.payload.country;
                                recruiter.tel = request.payload.tel;
                                recruiter.fax = request.payload.fax;
                                recruiter.website = request.payload.website;
                                recruiter.logo = request.payload.logo;
                                recruiter.save(function (err, recruiter1) {
                                    if (err) {
                                        return reply({ message: "User succesfully created,log in to continue!" }).code(201);
                                    } else {
                                        return reply(recruiter1).code(201).header("Authorization", token);
                                    }
                                })
                            

                        }

                    })
                }
            }
        });

    }
};

exports.changePassword = {
    validate: {
        payload: {
            email: Joi.string().email().required().trim().min(1).max(50),
            oldPassword: Joi.string().required().trim().min(1).max(50),
            newPassword: Joi.string().required().trim().min(1).max(50),
            passwordRecoveryQuestion: Joi.string().alphanum().required().trim().min(1).max(50),
            passwordRecoveryQuestionAnswer: Joi.string().alphanum().required().trim().min(1).max(50),
            keepSignedIn: Joi.boolean().required()
        }
    },
    handler: function (request, reply) {
        User.findOne({ email: request.payload.email}, function (err, user) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for user,try again"));
            } else {
                if (user) {
                    if (user.password === request.payload.oldPassword) {
                        user.password = request.payload.newPassword;
                        user.passwordRecoveryQuestion = request.payload.passwordRecoveryQuestion;
                        user.passwordRecoveryQuestionAnswer = request.payload.passwordRecoveryQuestionAnswer;
                        user.save(function (err, user1) {
                            if (err) {
                                return reply(Boom.badRequest("An error occured while updating password,try again"));
                            } else {
                                var token = '';
                                var session = new Session();
                                session.sessionID = aguid();
                                session.email = user.email;
                                session.valid = true;
                                session.expiry = new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes
                                session.save(function (err, session) {
                                    if (err) {
                                        return reply({ message: "Password successfully changed,log in to continue!" }).code(401);
                                    }
                                    else {
                                        token = JWT.sign(JSON.stringify(session), process.env.JWT_SECRET);
                                        return reply({ message: "Password successfully changed,user logged!" }).header("Authorization", token);
                                    }
                                })

                            }
                        })
                    } else {
                        return reply(Boom.badRequest("Old password incorrect,please provide correct password!"));
                    }
                  
                } else {
                    return reply(Boom.badRequest("User" + request.payload.email + "could not be found!"));
                }
            }
        });

    }
};

exports.resetPassword = {
    validate: {
        payload: {
            email: Joi.string().email().required().trim().min(1).max(50),
            newPassword: Joi.string().required().trim().min(1).max(50),
            passwordRecoveryQuestionAnswer: Joi.string().alphanum().required().trim().min(1).max(50),
            keepSignedIn: Joi.boolean().required()
        }
    },
    handler: function (request, reply) {
        User.findOne({ email: request.payload.email, password: request.payload.password }, function (err, user) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for user,try again"));
            } else {
                if (user) {
                    if(user.passwordRecoveryQuestionAnswer !== request.payload.passwordRecoveryQuestionAnswer){
                        return reply(Boom.badRequest("Incorrect password recovery question answer"));
                    } else {
                        user.password = request.payload.newPassword;
                        user.keepSignedIn = request.payload.keepSignedIn;
                        user.save(function (err, user1) {
                            if (err) {
                                return reply(Boom.badRequest("An error occured while updating password,try again"));
                            } else {
                                reply({ message: "Password successfully changed!" });
                                var token = '';
                                var session = new Session();
                                session.sessionID = aguid();
                                session.email = user.email;
                                session.valid = true;
                                session.expiry = new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes
                                session.save(function (err, session) {
                                    if (err) {
                                        return reply({ message: "Password changed successfully,log in to continue!" }).code(401);
                                    }
                                    else {
                                        token = JWT.sign(JSON.stringify(session), process.env.JWT_SECRET);
                                       return reply({ message: "Password changed successfully,user logged in!" }).header("Authorization", token);
                                    }
                                })
                            }
                        })
                    }                   
                } 
            }
        });

    }
};

exports.signIn = {
    validate: {
        payload: {
            email: Joi.string().email().required().trim().min(1).max(50),
            password: Joi.string().required().trim().min(1).max(50),
            keepSignedIn: Joi.boolean().required()
        }
    },
    handler: function (request, reply) {
        User.findOne({ email: request.payload.email, password: request.payload.password }, function (err, user) {
            if (err) {
                return reply(Boom.badRequest("An error occured while searching for user,try again"));
            } else {
                if (user) {
                    var token = '';
                    var session = new Session();
                    session.sessionID = aguid();
                    session.email = user.email;
                    session.valid = true;
                    session.expiry = new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes
                    session.save(function (err, session) {
                        if (err) {
                            return reply(Boom.badRequest("An error occured while logging in ,try again"));
                        }
                        else {
                           token = JWT.sign(JSON.stringify(session), process.env.JWT_SECRET);
                           return reply({ message: "Successfully logged in!" }).header("Authorization", token);
                        }
                    });                  

                } else {
                   return reply({ message: "Incorrect email/password!" });

                }
            }
        });

    }
};

exports.signOut = {
    validate: {
        payload: {
            token: Joi.string().required().trim()
        }
    },
    handler: function (request, reply) {
        var decodedToken = JWT.decode(request.payload.token)
        Session.findOne({ sessionID: decodedToken.sessionID }, function (err, session) {
            if (err) {
                return reply(Boom.badRequest("An error occured while signing out,try again"));
            } else {
                if (session) {                                                           
                    session.remove();
                    reply({ message: "Successfully signed out!" });                                        
                } else {
                  return reply(Boom.badRequest("An error occured while signing out,try again"));

                }
            }
        });

    }
};
