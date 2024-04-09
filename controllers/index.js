const router = require('express').Router();

const gameRoutes = require('./games-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/user', userRoutes);
router.use('/user/game', gameRoutes);

module.exports = router;