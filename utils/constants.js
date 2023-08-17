const STATUS_SUCCESS = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const handleDefaultError = (err, res) => {
  res.status(STATUS_INTERNAL_SERVER_ERROR).send({
    message: 'На сервере произошла ошибка',
  });
};

module.exports = {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  handleDefaultError,
};
