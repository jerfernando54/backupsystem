const express = require('express');
const router = express.Router();

const pageRouter = require('./../api/pages/routes');

router.use('/backup', pageRouter);

module.exports = router;