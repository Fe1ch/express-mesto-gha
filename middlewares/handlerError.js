const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;
const {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_CONFLICT,
  STATUS_INTERNAL_SERVER_ERROR,
} = require('../utils/constants');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

module.exports = ((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors)
      // С помощью Object.values(err.errors) мы получаем массив значений этих ошибок.
      .map((error) => error.message)
      // Применяем к каждой ошибке в массиве, чтобы извлечь только сообщения об ошибках
      .join(' ');
    // объединяем все сообщения об ошибках в строку, разделяя их пробелами.
    return res.status(STATUS_BAD_REQUEST).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(STATUS_NOT_FOUND).send({
      message: 'В базе данных не найден документ с таким ID',
    });
  }
  if (err instanceof CastError) {
    return res.status(STATUS_BAD_REQUEST).send({
      message: `Передан некорректный ID: ${err.value}`,
    });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err instanceof ForbiddenError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err.code === 11000) {
    return res.status(STATUS_CONFLICT).send({
      message: 'Указанный email уже зарегистрирован. Пожалуйста используйте другой email',
    });
  }
  res.status(STATUS_INTERNAL_SERVER_ERROR).send({
    message: 'На сервере произошла ошибка',
  });
  return next();
});
