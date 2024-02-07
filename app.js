const express = require('express');

bodyParser = require("body-parser"),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const SWAGGER_CONFIG = require('./services/documentation/swagger')

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Middleware
const check = require('./middleware/auth')


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

app.get('/', (req, res) => {
  res.send(`CRUST BACKUP API'S RUNNING`);
})

module.exports = app;
