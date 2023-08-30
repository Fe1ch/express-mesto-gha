const NotFoundError = require('../utils/errors/NotFoundError');

module.exports.notFound = (req, res, next) => {
  next(new NotFoundError('Указан несуществующий URL'));
};
