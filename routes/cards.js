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
router.get('/cards', getAllCards)

router.post('/cards', validateNewCard, createCard)

router.delete('/cards/:cardId', validateDeleteCard, deleteCard)

router.put('/cards/:cardId/likes', validateLikeCard, likeCard)

router.delete('/cards/:cardId/likes', validateDislikeCard, dislikeCard)

module.exports = router;
