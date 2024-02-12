//This is the controller class

const dao = require('./dao');

module.exports = {
  async addUser(user) {
    const responseData = await dao.addUser(user);    
    return responseData;
  },

  async getUsers() {
    const usersDao = await dao.getUsers();
    const responseData = {
      data: usersDao
    };
    return usersDao;
  },

  async getUserByID(userID) {
    const user = await dao.getUserByID(userID)
    return user;
  }
}