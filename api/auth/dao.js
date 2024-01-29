const JWT = require('./../../services/auth/jwt');
const { ERROR, STATUS_CODE} = require('./../../utils/constants');

module.exports = {
  async login(authData) {
    try {
      if (!authData.username) {
        throw new Error(ERROR.INCORRECT_DATA_LOGIN_ACCESS);
      }

      const token = JWT.createToken(authData);
      const data = {
        user: authData,
        token: token
      };
      
      return { statusCode: STATUS_CODE.SUCCESS, data };

    } catch (error) {
      return { statusCode: STATUS_CODE.BAD_REQUEST, error: error.message };
    }
  }
};
