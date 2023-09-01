const router = require('express').Router();

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const signin = require('./signin');
const signup = require('./signup');
// const notFound = require('./notFound');
const auth = require('../middlewares/auth');

router.use('/signin', signin);
router.use('/signup', signup);
router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);
// router.use('*', notFound);

module.exports = router;
