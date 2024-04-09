const router = require('express').Router();

const gameRoutes = require('./games-routes.js');
const userRoutes = require('./user-routes.js');
const homeRoutes = require('./home-routes.js')

router.use('/user', userRoutes);
router.use('/user/game', gameRoutes);
router.use('/', homeRoutes);

module.exports = router;