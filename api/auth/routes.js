const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { ERROR, SUSCCESS, STATUS_CODE } = require('./../../utils/constants')
const response = require('./../../utils/response')

router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const data = await controller.login(req.body)
    response.successResponse(res, data, data.statusCode)
  }catch(error) {
    response.errorResponse(res, ERROR.INTERNAL_ERROR, STATUS_CODE.INTERNAL_ERROR_CODE)
  }
})


module.exports = router;


