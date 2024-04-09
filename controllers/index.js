const router = require('express').Router();

const gameRoutes = require('./games-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/user', userRoutesRoutes);
router.use('/user/game', gameRoutesRoutes);

module.exports = router;