const { MongoClient } = require('mongodb');

async function connect(uri) {
  const client = new MongoClient(uri);
  return client;
}

module.exports = connect;