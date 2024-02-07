const express = require('express')
const axios = require('axios');
const router = express.Router();
const CONFIG = require('./../../config/config')
const { ERROR, STATUS_CODE } = require('./../../utils/constants')
const check = require('./../../middleware/auth')
const controller = require('./controller');


router.post('/', async (req, res, next) => {
  try {
    const auth_url = CONFIG.AUTH.URL;
    const userID = CONFIG.AUTH.USER;
    const password = CONFIG.AUTH.PASSWORD;
    const url = CONFIG.BASE.URL;

    const authResponse = await axios.post(auth_url, {userID, password})

    const token = authResponse.data.access_token
    await axios.get(url, {headers: { Authorization: 'Bearer '+token }})
    .then(async (item) => {
      const result = await controller.saveBackup(item.data);
      res.status(STATUS_CODE.CREATED).send(result)
    })
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_ERROR_CODE).send(ERROR.INTERNAL_ERROR);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const backups = await controller.getBackups();
    res.status(STATUS_CODE.SUCCESS).send(backups);
  }
  catch(error) {
    res.send(ERROR.INTERNAL_ERROR)
  }
});


module.exports = router;
