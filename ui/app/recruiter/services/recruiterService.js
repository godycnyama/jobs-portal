var recruiterServiceModule = angular.module('recruiterServiceModule', []);

recruiterServiceModule.factory('RecruiterService', [ function () {
    var message = '';
    var recruiter = {};
    return {
        SetRecruiter: function (_recruiter) {
            recruiter = _recruiter;
        },
        GetRecruiter: function () {
            return recruiter;;
        },
        SetMessage: function (_message) {
            message =_message;
        },
        GetMessage: function () {
            return message;
        }
    }
}]);

