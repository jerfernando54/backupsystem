require('dotenv').config()

const CONFIG = {
  APP: {
    PORT: process.env.APP_PORT || 3200,
    HOST: process.env.APP_HOST || 'http://localhost'
  },

  AUTH: {
    URL: process.env.AUTH_URL
  }
}


module.exports = CONFIG