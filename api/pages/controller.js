const dao = require('./dao');

module.exports = {
  async saveBackup(file) {
    let pages = [];
    const today = new Date();
    const yesterday = new Date(today);
    const set = file.response.set;
    
    //saving in database only modifyed pages 
    yesterday.setDate(today.getDate() - 1);
    for (const page of set){
      const updatedAt = new Date(page.updatedAt);
      if (updatedAt >= yesterday){
        pages.push(page);
      }
    }
    
    if(pages.length === 0){
      return 'There are no changes';
    }
    const res = await dao.saveBackup(pages, file);
    return res;
  },

  async getBackups() {
    const backups = await dao.getBackups();
    return backups;
  },

  async downloadBackup(filename) {
    if (!filename) return "File name must be not empty";
    const backup = await dao.downloadBackup(filename);
    return backup;
  }
}



