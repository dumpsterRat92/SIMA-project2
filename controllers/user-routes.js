const router = require('express').Router();
const { User } = require('../models');

//Create new user

router.post('/', async (req, res) => {
    try {
        const UserData = await User.create ({
            email: req.body.email,
            password: req.body.password,
        });

        req.session.userId = UserData.id;
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(UserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Login user

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            res.status(400).json({ message: 'No user found with this email address' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }
        req.session.userId = userData.id;
        req.session.save(() => {
            req.session.loggedIn = true;
            
            res
             .status(200)
             .json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }  
});
// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  