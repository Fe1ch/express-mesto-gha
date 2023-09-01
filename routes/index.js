const router = require('express').Router();

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const signin = require('./signin');
const signup = require('./signup');
// const notFound = require('./notFound');
const auth = require('../middlewares/auth');

router.use('/signin', signin);
router.use('/signup', signup);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
// router.use('*', notFound);

module.exports = router;
