const router = require('express').Router();
const withAuth = require('../utils/auth');
const Gametype = require('../models/Gametype');
const Tag = require('../models/Tag');


router.get('/', withAuth, async (req, res) => {
    try {
        const gametype = await Gametype.findAll();
        const tag = await Tag.findAll();
        console.log(gametype);
        console.log(tag);
        const gametypes = gametype.map((gametype) => 
        gametype.get({ plain: true })
        );
        const tags = tag.map((tag) => 
        tag.get({ plain: true })
        );
        console.log(gametypes);
        console.log(tags);

        console.log('gameroutes leg')
        res.render('home', {
            gametypes,
            tags,
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