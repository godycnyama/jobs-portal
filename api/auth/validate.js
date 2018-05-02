var JWT = require('jsonwebtoken');
var Session = require('./models/mongodbModels/session');

var validateFunc = function (decoded, request, callback) {
    var decodedToken = JWT.decode(request.headers.authorization)
    Session.findOne({ sessionID: decodedToken.sessionID }, function (err, session) {
        if (err) {
            return callback(sessionError, false);
        }
        else {
            if (session) {
                return callback(sessionError, true);
            }
            else {
                return callback(sessionError, false);
            }
        }
    });
};

module.exports = validateFunc;

exports.auth = {  
   validate: function (decoded, request, callback) {
 
    // do your checks to see if the person is valid 
    if (!people[decoded.id]) {
      return callback(null, false);
    }
    else {
      return callback(null, true);
    }
  },
  token: JWT.sign(people[1], secret)
}
