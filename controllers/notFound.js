const NotFoundError = require('../utils/errors/NotFoundError');

const notFound = (req, res, next) => {
  next(new NotFoundError('Указан несуществующий URL'));
};

module.exports = { notFound };
