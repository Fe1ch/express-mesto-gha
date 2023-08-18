const router = require('express').Router();

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const notFoundRoutes = require('./notFound');

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.use('/*', notFoundRoutes);

module.exports = router;
