const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

require('./config/passport');
const apiRouter = require('./routes/apiRouter');

const app = express();

app.use(express.json());
app.use(volleyball);
app.use(helmet());
app.use(cors({ origin: '*' }));

app.use('/api/v1', apiRouter);

app.use((error, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    message: error.message,
  });
});

module.exports = app;
