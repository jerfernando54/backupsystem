const CONFIG = require('./../../config/config');
const db = require('./../../services/db/mongoDB');
const { ERROR } = require('./../../utils/constants');

const fs = require('fs').promises;
const path = require('path');

const DB_URI = CONFIG.DB.URL;
const today = new Date();

const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

let filename = `backup_${day}-${month}-${year}.json`;
let backupDir = path.join(__dirname, '../../public', 'backups');
const backupPath = path.join(__dirname, '../../public', 'backups', filename);

module.exports = {
  async saveBackup(pages, file) {
    
    const client = await db(DB_URI);

    const backup = {
      created_at: new Date(),
      file: pages
    }

    try {
      await client.db("crustbackupapi").collection("pages").insertOne(backup);

      fs.readdir(backupDir, (err, files) => {
        if (err) {
          console.log(`Error reading directory`);
          return;
        }
        
        if (files.length >= 6) {
          let oldestFile = files[0];
          let oldestDate = fs.statSync(path.join(backupDir, oldestFile)).mtime;
          files.forEach((file) => {
            const fileDate = fs.statSync(path.join(backupDir, file)).mtime;
            if (fileDate < oldestDate) {
              oldestDate = fileDate;
              oldestFile = file;
            }
          });
      
          fs.unlink(path.join(backupDir, oldestFile), (err) => {
            if (err) {
            console.error(`Error deleting oldest file: ${err}`);
            } else {
            console.log(`Oldest file (${oldestFile}) deleted.`);
            }
          });
        }
      });

      const backupfile = JSON.stringify(file, null, 2);
      fs.writeFile(backupPath, backupfile, (err) => {
        if (err) {
          console.log(`Error saving local backup`);
        }
      });

      return 'Backup saved.';
    }
    catch(e){
      return ERROR.INTERNAL_ERROR
    }
  },

  async getBackups() {
    const client = await db(DB_URI);
    try {
      const data = await fs.readdir(backupDir);
      return data;
    }catch (e) {
      return ERROR.INTERNAL_ERROR;
    }
    finally {
      await client.close();
    }
  },

  async downloadBackup(filename) {
    try {
      const filePath = path.join(backupDir, filename);
      try {
        await fs.access(filePath);
      } catch (error) {
        throw new Error(`Backup doesn't exist`);
      }
      const fileContent = await fs.readFile(filePath)
      
      return fileContent;
    }catch (e) {
      return ERROR.INTERNAL_ERROR;
    }
  }
}



