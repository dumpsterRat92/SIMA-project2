const router = require('express').Router();
const withAuth = require('../utils/auth');
const Gametype = require('../models/Gametype');


router.get('/', withAuth, async (req, res) => {
    try {
        const gametype = await Gametype.findAll();
        const gametypes = gametype.map((gametype) => 
        gametype.get({ plain: true })
        )

        console.log('gameroutes leg')
        res.render('home', {
            gametypes,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });


module.exports = router;