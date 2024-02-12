'use strict';

const JWT = require('./../../services/auth/jwt');
const bcrypt = require('bcrypt');

const { ERROR, STATUS_CODE} = require('./../../utils/constants');

const db = require('./../../services/db/mongoDB');
const config = require('./../../config/config');
const uri = config.DB.URL;

module.exports = {
  async login(authData) {
    const client = await db(uri);

    try {
      if (!authData.email) {
        throw new Error(ERROR.INCORRECT_DATA_LOGIN_ACCESS);
      }
      await client.connect();

      const user = await client.db("crustbackupapi").collection("users").findOne({email: authData.email});
      
      if (!user) {
        throw new Error(ERROR.INCORRECT_DATA_LOGIN_ACCESS);
      }
      const match = bcrypt.compareSync(authData.password, user.password); 
      if( match ){
        const token = JWT.createToken(user); 
        const data = {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            created_at: user.created_at
          },
          token: token
        }
        return { statusCode: STATUS_CODE.SUCCESS, data};
        
      } else  throw new Error(ERROR.INCORRECT_DATA_LOGIN_ACCESS);   
      
    } catch (error) {
      return { statusCode: STATUS_CODE.BAD_REQUEST, error: error.message };
    }
    finally {
      await client.close();
    }
  }
};
