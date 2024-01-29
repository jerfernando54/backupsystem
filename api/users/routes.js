const express = require('express');
const router = express.Router();
const controller = require('./controller')
const response = require('./../../utils/response')
const {ERROR} = require('./../../utils/constants')

const check = require('./../../middleware/auth')

router.post('/add', async (req, res, next) => {
  try {
    const {body} = req;
    const data = await controller.addUser(body);
    response.successResponse(res, data, data.statusCode)
  }
  catch(error) {
    response.errorResponse(res, ERROR.INTERNAL_ERROR)
  }
});

router.get('/', check.auth, async (req, res, next) => {
  try {
    const data = await controller.getUsers();
    response.successResponse(res, data)
  }catch(err) {
    response.errorResponse(res, ERROR.INTERNAL_ERROR)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const userID = req.params.id
    const data = await controller.getUserByID(userID)
    response.successResponse(res, data)
  } catch(err) {
    response.errorResponse(res, ERROR.INTERNAL_ERROR)
  }
})


module.exports = router