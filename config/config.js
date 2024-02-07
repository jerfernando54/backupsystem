require('dotenv').config()

const CONFIG = {
  APP: {
    PORT: process.env.APP_PORT || 3000,
    HOST: process.env.APP_HOST || 'http://localhost'
  },

  AUTH: {
    USER: process.env.AUTH_USER_ID,
    PASSWORD: process.env.AUTH_PASSWORD,
    URL: process.env.AUTH_URL
  },

  

  DB: {
    URL: process.env.MONGO_DB_URL
  },

  JWTSECRET: {
    SECRET: process.env.JWT_SECRET
  },

  TOKEN: {
    USER_TOKEN: process.env.TOKEN
  },

  BASE: {
    URL: process.env.URL
  }
}

module.exports = CONFIG