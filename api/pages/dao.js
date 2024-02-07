const PageModel = require('./model');
const mongoose = require('mongoose');
const CONFIG = require('./../../config/config');
const db = require('./../../services/db/mongoDB');
const { ERROR } = require('./../../utils/constants');

const DB_URI = CONFIG.DB.URL;

const connect = async (operation, data) => {
  const client = await db(DB_URI);

  try {
    await client.connect();
    let result;

    if (operation === 'backup') {
      result = await creatBackup(client, data);
    } else if(operation === 'query') {
      result = await findBackup(client, data);
    }else {
      throw new Error('Invalid operation. Plesae use backup or query.');
    }
    return result;
  } catch (e) {
    return ERROR.INTERNAL_ERROR;
  } finally {
    await client.close();
  }
}

const creatBackup = async (client, data) => {
  const result = await client.db("crustbackupapi").collection("pages").insertOne(data);
  return result;
}

const findBackup = async (client, query) => {
  const result = await client.db("crustbackupapi").collection("pages").find(query).toArray();
  return result;
}

module.exports = {
  async saveBackup(file) {
    const backup = {
      created_at: new Date(),
      file: file
    }
    try {
      const result = await connect('backup', backup);
      return 'Backup saved';
    }
    catch(e){
      return ERROR.INTERNAL_ERROR
    }
  },

  async getBackups() {
    const query = {}

    const backups = await connect('query', query);
    return backups
  },

}