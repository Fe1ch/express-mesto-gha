require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const handlerError = require('./middlewares/handlerError');

const app = express();

const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(express.json());

app.use(router);
app.use(errors());
app.use(handlerError);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
