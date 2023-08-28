const { STATUS_NOT_FOUND } = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = STATUS_NOT_FOUND; // 404
  }
}
module.exports = NotFoundError;
