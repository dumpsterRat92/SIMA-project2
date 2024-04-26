const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Game, Gametype, Tag, Gametag } = require('../models');


router.get('/', withAuth, async (req, res) => {
    try {
        
        const tag = await Tag.findAll();
        const game2 = await Game.findAll();
        const gametype = await Gametype.findAll();

        var games;
        console.log(game2);
        if (game2) {

            games = game2.map((game) => {
                return game.get({ plain: true });
            });
    
            for (let game of games) {
                console.log('houston come in')
                const tag2 = await getGametag(game);
                const type = await getGametype(game);
                game.tag = await tag2.name;
                game.gametype = await type.name;
            }
        }


        const gametypes = gametype.map((gametype) => 
        gametype.get({ plain: true }
        ));
        const tags = tag.map((tag) => 
        tag.get({ plain: true }
        ));
        if(games) {
            res.render('home', {
                gametypes,
                tags,
                games,
                loggedIn: req.session.loggedIn,
            });
        } else {
            res.render('home', {
                gametypes,
                tags,
                loggedIn: req.session.loggedIn,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/session-status', (req, res) => {
    if (req.session.loggedIn) {
        res.json({ status: 'active' });
    } else {
        res.json({ status: 'inactive' });
    }
});

router.get('/gamepad', withAuth, async (req, res) => {
    res.render('gamepad')
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });


const getGametag = async (games) => {
    console.log(games);
    const gametag = await Gametag.findOne({
        where: {
            game_id: games.id
        }
    });
    const gametags = gametag.get({ plain: true });
    const tag = await Tag.findOne({
        where: {
            id: gametags.tag_id
        }
    });
    const tags = tag.get({ plain: true});
    return tags
} 

const getGametype = async (games) => {
    console.log(games);
    const type = await Gametype.findOne({
        where: {
            id: games.gametype_id
        }
    });
    const types = type.get({ plain: true });
    return types
}

module.exports = router;