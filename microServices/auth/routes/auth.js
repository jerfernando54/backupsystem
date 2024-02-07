const express = require('express');
const router = express.Router();

const authRouter = require('./../api/routes');

router.use('/auth', authRouter);

module.exports = router

