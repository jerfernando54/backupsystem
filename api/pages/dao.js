const CONFIG = require('./../../config/config');
const db = require('./../../services/db/mongoDB');
const { ERROR } = require('./../../utils/constants');

const DB_URI = CONFIG.DB.URL;

module.exports = {
  async saveBackup(file) {
    const client = await db(DB_URI);
    const backup = {
      created_at: new Date(),
      file: file
    }
    try {
      await client.db("crustbackupapi").collection("pages").insertOne(backup);
      return 'Backup saved';
    }
    catch(e){
      return ERROR.INTERNAL_ERROR
    }
  },

  async getBackups() {
    const client = await db(DB_URI);
    try {
      const result = await client.db("crustbackupapi").collection("pages").find().toArray()
      return result;
    }catch (e) {
      return ERROR.INTERNAL_ERROR;
    }
    finally {
      await client.close();
    }
  }
}