const router = require('express').Router();

// IMPORT CONTROLLERS
const {
  getAllUsers,
  getUser,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const { validateGetUser, validateUserInfo, validateUserAvatar } = require('../utils/validation')

router.get('/', getAllUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validateGetUser(), getUser);
router.patch('/me', validateUserInfo(), updateProfile);
router.patch('/me/avatar', validateUserAvatar(), updateAvatar);

module.exports = router;
