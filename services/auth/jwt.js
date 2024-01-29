const jwt = require('jwt-simple');
const moment = require('moment');
const CONFIG = require('../../config/config');

const SECRET = CONFIG.JWTSECRET.toString();

const createToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.enrol,
    iat: moment().unix(),
    exp: moment().add(3, 'Days').unix()
  }

  const token = jwt.encode(payload, SECRET);
  return token
}

module.exports = {
  SECRET,
  createToken
}