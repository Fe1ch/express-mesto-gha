const User = require('../models/user');
const {
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  handleDefaultError,
} = require('../utils/constants');

// GET ALL USERS
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleDefaultError(err, res));
};

// GET USER
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(STATUS_NOT_FOUND).send({
          message: 'Пользователя с указанным _id не существует',
        });
      } else if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: 'Переданы некорректные данные.',
        });
      } else {
        handleDefaultError(err, res);
      }
    });
};

// POST CREATE USER
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
        return;
      }
      handleDefaultError(err, res);
    });
};

// PATCH UPDATE USER INFO
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((updateData) => {
      res.send(updateData);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(STATUS_NOT_FOUND).send({
          message: 'Пользователь по указанному _id не найден.',
        });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
        return;
      }
      handleDefaultError(err, res);
    });
};

// PATCH UPDATE USER INFO AVATAR
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, avatar, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then(() => {
      res.send(req.body);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(STATUS_NOT_FOUND).send({
          message: 'Пользователь по указанному _id не найден.',
        });
        return;
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
        return;
      }
      handleDefaultError(err, res);
    });
};
