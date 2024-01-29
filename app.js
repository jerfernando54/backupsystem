var express = require('express');

bodyParser = require("body-parser"),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const SWAGGER_CONFIG = require('./services/documentation/swagger')

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Middleware
const check = require('./microServices/auth')


// ROUTES //
var indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
const pagesRouter = require('./routes/pages');

const API = '/api/v1';

var app = express();

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

app.get('/', (req, res) => {
  res.send(`CRUST BACKUP API'S RUNNING`);
})

module.exports = app;
