const router = require('express').Router();

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const notFoundRoutes = require('./notFound');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateSignin, validateSignup } = require('../utils/validation');

router.post('/signin', validateSignin(), login);

router.post('/signup', validateSignup(), createUser);

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);
router.use('/*', notFoundRoutes);

module.exports = router;