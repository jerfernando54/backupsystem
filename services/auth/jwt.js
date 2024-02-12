const jwt = require('jwt-simple');
const moment = require('moment');
const CONFIG = require('../../config/config');

const SECRET = CONFIG.JWTSECRET.toString();

const createToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    created_at: user.created_at,
    iat: moment().unix(),
    exp: moment().add(2, 'Days').unix()
  }

  const token = jwt.encode(payload, SECRET);
  return token
}

module.exports = {
  SECRET,
  createToken
}