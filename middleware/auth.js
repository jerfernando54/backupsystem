const jwt = require('jwt-simple');
const moment = require('moment');
const {ERROR, STATUS_CODE, AUTH} = require('../utils/constants')

const libJWT = require('../services/auth/jwt');
const SECRET = libJWT.SECRET

exports.auth = (req, res, next) => {
  const {authorization} = req.headers;

  if(!authorization){
    return res.status(STATUS_CODE.UNAUTHORIZED).json({error: AUTH.NO_AUTHENTICATION_HEADER});
  }
  
  const token = req.headers.authorization.replace(/['"]+/g, '')
  
  try {
    if (!/^Bearer /.test(token)) {
      throw new Error(AUTH.INVALID_TOKEN_FORMAT);
    }

    const tokenWithoutBearer = token.replace(/^Bearer /, '');
    const payload = jwt.decode(tokenWithoutBearer, SECRET);
    
    if(payload.exp <= moment.unix()) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({error: AUTH.EXPIRED_TOKEN});
    }
    
    next();
  } catch(err) {
    return res.status(STATUS_CODE.UNAUTHORIZED).json({error: AUTH.INVALID_TOKEN});
  }
}

