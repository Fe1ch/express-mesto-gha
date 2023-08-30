const router = require('express').Router();

const { login } = require('../controllers/users');
const { validateSignin } = require('../utils/validation');

router.post('/signin', validateSignin, login);

module.exports = router;
