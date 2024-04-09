const router = require('express').Router();
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        res.render('home', {
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