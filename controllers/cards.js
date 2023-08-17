const Card = require('../models/card');
const {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  handleDefaultError,
} = require('../utils/constants');

// GET ALL CARDS
module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(STATUS_SUCCESS).send(cards))
    .catch((err) => handleDefaultError(err, res));
};

// POST CREATE CARD
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
        return;
      }
      handleDefaultError(err, res);
    });
};

// DELETE CARD
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then(() => res.status(STATUS_SUCCESS).send({ message: 'Карточка успешно удалена' }))
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(STATUS_NOT_FOUND).send({
          message: 'Передан несуществующий _id карточки.',
        });
      } else if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: 'Некорректно указан _id карточки.',
        });
      } else {
        handleDefaultError(err, res);
      }
    });
};

// PUT LIKE CARD
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((newData) => res.status(STATUS_SUCCESS).send(newData))
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(STATUS_NOT_FOUND).send({
          message: 'Передан несуществующий _id карточки.',
        });
      } else if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      } else {
        handleDefaultError(err, res);
      }
    });
};

// DELETE LIKE CARD
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((newData) => res.status(STATUS_SUCCESS).send(newData))
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(STATUS_NOT_FOUND).send({
          message: 'Передан несуществующий _id карточки.',
        });
      } else if (err.name === 'CastError') {
        res.status(STATUS_BAD_REQUEST).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      } else {
        handleDefaultError(err, res);
      }
    });
};
