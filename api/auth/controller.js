const dao = require('./dao');

module.exports = {
  async login(user) {
    res = await dao.login(user)
    return res;
  }
}
