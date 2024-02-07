const express = require('express');
const router = express.Router();
const axios = require('axios');

const config = require('./../config/config')

const {STATUS} = require('./../utils/constants')

router.post('/', async (req, res) => {
  const {userID, password} = req.body;

  const AUTH_URL = config.AUTH.URL;
  const requestData = {
    grant_type: 'client_credentials',
    scope: 'profile api'
  }

  const authHeaders = {
    Authorization: `Basic ${Buffer.from(`${userID}:${password}`).toString('base64')}`
  }

  try {
    await axios.post(AUTH_URL, null, { params: requestData, headers: authHeaders })
    .then(async (response) => {
      res.status(STATUS.SUCCESS).send({
        access_token: response.data.access_token
      })
    })
  }
  catch(error) {
    const error_message = error.response.data.error
    const error_status = error.response.status
    res.status(error_status).send({error: error_message})
  }

})

module.exports = router;