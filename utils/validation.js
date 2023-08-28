const { Joi, celebrate } = require('celebrate');
const { URL_REGEX } = require('./constants');

function validateSignin() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }),
  })
}

function validateSignup() {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30).alphanum(),
      about: Joi.string().min(2).max(30).alphanum(),
      avatar: Joi.string().pattern(URL_REGEX),
    }),
  })
}

function validateNewCard() {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(URL_REGEX),
    }),
  })
}

function validateDeleteCard() {
  return celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  })
}

function validateLikeCard() {
  return celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  })
}

function validateDislikeCard() {
  return celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  })
}

function validateGetUser() {
  return celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  })
}

function validateUserInfo() {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  })
}

function validateUserAvatar() {
  return celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(URL_REGEX),
    }),
  })
}

module.exports = {
  validateSignin,
  validateSignup,
  validateNewCard,
  validateGetUser,
  validateUserInfo,
  validateLikeCard,
  validateUserAvatar,
  validateDeleteCard,
  validateDislikeCard,
}
