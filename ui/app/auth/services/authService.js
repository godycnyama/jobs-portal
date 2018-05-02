"use strict";

var authServiceModule = angular.module('authServiceModule', []);

authServiceModule.factory('Auth', ['store',function (store) {
    
    var access_token = null;
    var message = '';
    var title = '';
    var role = '';
    var loggedIn = false;
    return {
        isJobSeeker: function () {
            if (store.get('role') == 'jobseeker') {
                return true;
            }
            return false;
        },
        isRecruiter: function () {
            if (store.get('role') == 'recruiter') {
                return true;
            }
            return false;
        },
        isAdmin: function () {
            if (store.get('role') == 'admin') {
                return true;
            }
            return false;
        },
        SetIdentity: function (_identity) {
            store.set('identity', _identity);
            console.log(store.get('indentity'));
        },
        GetIdentity: function () {           
            return store.get('indentity');
        },
        SetToken: function (token) {
            store.set('access_token', token);           
        },
        ResetToken: function () {
          var identity =  store.get('indentity');
          identity.id_token = '';
          store.set('identity', identity);
          return
        },
        GetToken: function () {
            return store.get('access_token');
           // var identity = store.get('indentity');
           // return identity.id_token;
        },
        GetUserEmail: function () {
            return store.get('userEmail');
        },
        GetUserID: function () {
            return store.get('userID');
        },
        SetMessage: function (_message) {
            message = _message;
        },
        GetMessage: function () {
           return message;
        },
        SetTitle: function (_title) {
            title = _title;
        },
        GetTitle: function () {
           return title;
        },
        SetRole: function (_role) {
            role = _role;
        },
        GetRole: function () {
            return role;
        },
        ResetLoggedIn: function () {           
            var identity = store.get('indentity');
            identity.loggedIn = false;
            store.set('identity', identity);
            return
        },
        GetLoggedIn: function () {          
            var identity = store.get('indentity');
            return identity.loggedIn;
        },
        GetName: function () {
            var identity = store.get('indentity');
            return identity.name;
        }
    }
}]);