const router = require('express').Router();

// IMPORT CONTROLLERS
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateNewCard,
  validateDeleteCard,
  validateLikeCard,
  validateDislikeCard,
} = require('../utils/validation');

// GET ALL CARDS
router.get('/', getAllCards)

router.post('/', validateNewCard(), createCard)

router.delete('/:cardId', validateDeleteCard(), deleteCard)

router.put('/:cardId/likes', validateLikeCard(), likeCard)

router.delete('/:cardId/likes', validateDislikeCard(), dislikeCard)

module.exports = router;
