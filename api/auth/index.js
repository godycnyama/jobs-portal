'use strict';
var UserController = require('./userController');
exports.register = function (server, options, next) {

    server.route([
    {
        method: 'POST',
        path: '/api/signIn',
        config: UserController.signIn
    },
    {
        method: 'POST',
        path: '/api/signUp',
        config: UserController.signUp  
    },
    {
        method: 'POST',
        path: '/api/auth/adminSignup',
        config: UserController.adminSignup  
    },
    {
        method: 'POST',
        path: '/api/auth/jobSeekerSignup',
        config: UserController.jobSeekerSignup
    },
    {
        method: 'POST',
        path: '/api/auth/recruiterSignup',
        config: UserController.recruiterSignup
    },
    {
        method: 'POST',
        path: '/api/changePassword',
        config: UserController.changePassword
    },
    {
        method: 'POST',
        path: '/api/resetPassword',
        config: UserController.resetPassword
    },
    {
        method: 'POST',
        path: '/api/auth/resetPasswordWithQuestion',
        config: UserController.resetPasswordWithQuestion
    },
    {
        method: 'POST',
        path: '/api/changePasswordRecoveryEmail',
        config: UserController.changePasswordRecoveryEmail
    },
    {
        method: 'GET',
        path: '/api/users',
        config: UserController.getAllUsers
    },
    {
        method: 'GET',
        path: '/api/users/getUserByEmail/{email}',
        config: UserController.getUser
    },
    {
        method: 'GET',
        path: '/api/users/getUsersBy',
        config: UserController.getUsersBy
    },
    {
        method: 'DELETE',
        path: '/api/users/deleteUser',
        config: UserController.deleteUser
    },
    {
        method: 'POST',
        path: '/reDirect',
        config: UserController.reDirect
    }
    ]);

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};