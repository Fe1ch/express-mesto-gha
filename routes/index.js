const router = require('express').Router();

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const signin = require('./signin');
const signup = require('./signup');
const notFound = require('./notFound');
const auth = require('../middlewares/auth');

router.use(signin);
router.use(signup);
router.use(auth);
router.use(usersRoutes);
router.use(cardsRoutes);
router.use(notFound);

module.exports = router;
