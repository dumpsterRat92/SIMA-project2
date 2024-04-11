const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Game, Gametype, Tag, Gametag } = require('../models');


router.get('/', withAuth, async (req, res) => {
    try {
        
        const tag = await Tag.findAll();
        const game = await Game.findAll();
        const gametype = await Gametype.findAll();

        
        console.log(game)
        

        const games = game.map((game) => {
            const tag = getGametag(game);
            const type = getGametype(game);
            game.get({ plain: true });
            game.tag_name = tag;
            game.gametype_name = type;
        });
        const gametypes = gametype.map((gametype) => 
        gametype.get({ plain: true }
        ));
        const tags = tag.map((tag) => 
        tag.get({ plain: true }
        ));

        console.log(game);

        console.log('gameroutes leg')
        res.render('home', {
            gametypes,
            tags,
            games,
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


const getGametag = async (games) => {
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
    const type = await Gametype.findOne({
        where: {
            id: games.gametype_id
        }
    });
    const types = type.get({ plain: true });
    return types
}
module.exports = router;