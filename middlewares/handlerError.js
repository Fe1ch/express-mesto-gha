const { STATUS_INTERNAL_SERVER_ERROR } = require('../utils/constants')

module.exports = (err, req, res, next) => {
  const { status = STATUS_INTERNAL_SERVER_ERROR, message } = err;
  res.status(status).send({
    message: status === STATUS_INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : message,
  });
  next();
};
