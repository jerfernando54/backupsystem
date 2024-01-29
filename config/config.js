require('dotenv').config()

const CONFIG = {
  APP: {
    PORT: process.env.APP_PORT || 3000,
    HOST: process.env.APP_HOST || 'http://localhost'
  },

  AUTH: {
    USER: process.env.ID,
    PASSWORD: process.env.PASSWORD
  },

  DB: {
    URL: process.env.MONGO_DB_URL
  },

  JWTSECRET: {
    SECRET: process.env.JWT_SECRET
  }
}

module.exports = CONFIG