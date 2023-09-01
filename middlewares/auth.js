const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация 1'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'very-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация 2'));
  }

  req.user = payload;

  return next();
};
