const bcrypt = require('bcrypt');
const UserModel  = require('./model');
const mongoose = require('mongoose')
const { ERROR, SUCCESS, STATUS_CODE} = require('./../../utils/constants')

module.exports = {
  async addUser(userData) {
    try {
      const {password} = userData
      userData.password = await bcrypt.hash(password, 10)

      const user = new UserModel(userData)
      await user.save();
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
    }
  },

  async getUsers() {
    try {
      const users = await UserModel.find({},{password:false, __v: false})
      return {status: STATUS_CODE.SUCCESS, users}
    }catch(err) {
      return {status: STATUS_CODE.BAD_REQUEST, error: err.message}
    }
  },

  async getUserById(userID) {
    try {
      if (!userID) {
        throw new Error(ERROR.INVALID_USER_ID);
      }
      if (!mongoose.isValidObjectId(userID)) {
        throw new Error(ERROR.USER_NOT_FOUND);
      }
      const user = await UserModel.findById(userID, { password: false, __v: false });
    
      return { status: STATUS_CODE.SUCCESS, user };

    } catch (err) {
      return { status: STATUS_CODE.BAD_REQUEST, error: err.message };
    }
  }
}