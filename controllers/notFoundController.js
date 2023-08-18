const { STATUS_NOT_FOUND } = require('../utils/constants');

const notFoundPage = (_req, res) => res
  .status(STATUS_NOT_FOUND)
  .send({ message: 'Страница не найдена.' });

module.exports = { notFoundPage };
