const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

// IMPORT ROUTES
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64dbdef8d6fd25731d91428c3',
  };

  next();
});

// ROUTES METHODS
app.use('/users', users);
app.use('/cards', cards);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
