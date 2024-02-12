'use strict';
const express = require('express');
const cron = require('node-cron');
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const scriptBackup = require('./public/javascripts/backup'); 
const SWAGGER_CONFIG = require('./services/documentation/swagger')

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// ROUTES //
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const pagesRouter = require('./routes/pages');

const API = '/api/v1';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const specs = swaggerJsdoc(SWAGGER_CONFIG);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use(API, indexRouter);
app.use(API, authRouter);
app.use(API, usersRouter);
app.use(API, pagesRouter);

cron.schedule('* * * * *', async () => {
  await scriptBackup.getBackup();
}, {
  schedule: true,
  timezone: "Europe/Madrid"
});

app.get('/', async (req, res) => {
  await scriptBackup.sendEmail();
  res.send(`Server backup is running`);
});

module.exports = app;
