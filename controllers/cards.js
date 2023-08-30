const Card = require('../models/card');
const { STATUS_SUCCESS, STATUS_CREATED } = require('../utils/constants');
const ForbiddenError = require('../utils/errors/ForbiddenError');

// GET ALL CARDS
module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(STATUS_SUCCESS).send(cards))
    .catch(next);
};

// POST CREATE CARD
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CREATED).send(card))
    .catch(next);
};

// DELETE CARD
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      const owner = card.owner.toString();
      if (owner !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить карточку другого пользователя');
      } else {
        Card.findByIdAndDelete(req.params.cardId)
          .then(() => {
            res.status(STATUS_SUCCESS).send({ message: `Карточка ${card} удалена` });
          })
          .catch(next);
      }
    })
    .catch(next);
};

// PUT LIKE CARD
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((newData) => res.status(STATUS_SUCCESS).send(newData))
    .catch(next);
};

// DELETE LIKE CARD
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((newData) => res.status(STATUS_SUCCESS).send(newData))
    .catch(next);
};
