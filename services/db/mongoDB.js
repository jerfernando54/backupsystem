const db  = require('mongoose');

db.promise = global.Promise;

async function connect(url) {
  await db.connect(url, {
  }).then(() => {
    console.log(`Database's connected successfully`);
  }).catch((err) => {
    console.error(`Connection failed, caused by: ${err}`)
  })
}

module.exports = connect;