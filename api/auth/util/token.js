+'use strict';

const jwt = require('jsonwebtoken');
const config = require('../../config/config');

function createToken(user) {
  //get secret key
    var secret = config.ENCR_KEY;
    // set token refresh window period to 6 hours from now.
    var refresh_ttl = new Date().getTime() + 6 * 60 * 60 * 1000;;
  // Sign the JWT
    return jwt.sign({ email: user.email, scope: user.role ,refresh_ttl: refresh_ttl},secret, { algorithm: 'HS256', expiresIn: "1h" });
}

module.exports = createToken;