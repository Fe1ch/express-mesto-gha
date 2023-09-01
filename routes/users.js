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

router.get('/users', getAllUsers);
router.get('/users/me', getUserInfo);
router.get('/users/:userId', validateGetUser, getUser);
router.patch('/users/me', validateUserInfo, updateProfile);
router.patch('/users/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
