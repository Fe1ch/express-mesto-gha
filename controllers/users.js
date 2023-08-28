const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { STATUS_CREATED } = require('../utils/constants');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const NotFoundError = require('../utils/errors/NotFoundError');
const BadRequestError = require('../utils/errors/BadRequestError');
// GET ALL USERS
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// GET USER
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь с указанным _id не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

// GET USER INFO
module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  return User.findOne({ _id })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next)
};

// POST CREATE USER
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(STATUS_CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
      email: user.email,
    }))
    .catch(next);
};

// LOGIN
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequestError('Email или пароль не могут быть пустыми');

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'very-secret-key', {
        expiresIn: '7d',
      });
      return res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Неправильные почта или пароль'));
    })
    .catch(next);
};

// PATCH UPDATE USER INFO
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

// PATCH UPDATE USER INFO AVATAR
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    avatar,
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};
