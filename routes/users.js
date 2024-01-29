const express = require('express');
const router = express.Router();

const userRoute = require('./../api/users/routes');

router.use('/user', userRoute);

module.exports = router;
