const bcrypt = require('bcrypt');
// const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const { ERROR, SUCCESS, STATUS_CODE} = require('./../../utils/constants')

const db = require('./../../services/db/mongoDB');
const config = require('./../../config/config');
const uri = config.DB.URL;

module.exports = {
  async addUser(userData) {
    const client = await db(uri);
    const {password} = userData
    try {
      userData.password = await bcrypt.hash(password, 10);
      userData.created_at = new Date();
      await client.db("crustbackupapi").collection("users").insertOne(userData);
      
      return {status: STATUS_CODE.CREATED, message: SUCCESS.USER_CREATED};

    } catch(err) {
      if (err.code === STATUS_CODE.DUPLICATED) {
        if (err.keyPattern.email) {
          return { status: STATUS_CODE.BAD_REQUEST, error: ERROR.EMAIL_EXIST };
        } else if (err.keyPattern.username) {
          return { status: STATUS_CODE.BAD_REQUEST, error: ERROR.USER_EXIST };
        }
      }
      return {status: STATUS_CODE.BAD_REQUEST, error: ERROR.INTERNAL_ERROR}
    } finally {
      await client.close();
    }
  },

  async getUsers() {
    const client = await db(uri);
    try {
      const users = await client.db("crustbackupapi").collection("users").find({}, { projection: { password: 0 } }).toArray();
      return {status: STATUS_CODE.SUCCESS, users}
    }catch(err) {
      return {status: STATUS_CODE.BAD_REQUEST, error: err.message}
    }finally{
      await client.close();
    }
  },

  async getUserByID(userId) {
    const client = await db(uri);
    try {
      if (!userId) {
        throw new Error(ERROR.INVALID_USER_ID);
      }
      
      const objectId = new ObjectId(userId);
      
      (await client).connect();
      const user = await client.db("crustbackupapi").collection("users").findOne({ _id: objectId }, { projection: { password: 0 } });
    
      return { status: STATUS_CODE.SUCCESS, user };

    } catch (err) {
      return { status: STATUS_CODE.BAD_REQUEST, error: err.message };
    } finally {
      await client.close();
    }
  }
}