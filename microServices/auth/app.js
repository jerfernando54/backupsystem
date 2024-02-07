const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const checkIPs = require('./middleware/allowedIPs')
const {MESSAGES} = require('./utils/constants')

const API = '/api/v1';
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkIPs.allowOnlySpecificIPs);

app.use(API, authRouter);

app.get('/', (req, res) => {
  res.status(200).send(MESSAGES.SERVER_UP)
})

module.exports = app;