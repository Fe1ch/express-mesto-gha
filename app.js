const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const USER_ID = '64dbdef8d6fd25731d91428c3';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: USER_ID,
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
