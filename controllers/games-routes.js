const router = require('express').Router();
const { Game, Gametype, Tag, Gametag } = require('../models');
const withAuth = require('../utils/auth');

router.post('/new', withAuth, async (req, res) => {
    try{
        const GametypeID = await Gametype.create({
                name: req.body.gametype
        })
        const newTags = await Tag.create({
                name: req.body.tags
        })
        const newGame = await Game.create ({
            name: req.body.name,
            minplayers: req.body.minplayers,
            maxplayers: req.body.maxplayers,
            gametype_id: GametypeID.id,
            user_id: req.session.userId
        })
        const newGameTag = await Gametag.create ({
            game_id: newGame.id,
            tag_id: newTags.id
        })
        res.status(200).json({newGame, newTags, newGameTag, message: 'Game created successfully'})
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try{
        const game = await Game.findByPk(req.params.id);

        if(!game){
            return res.status(404).json({error: 'Game not found'});
        }

        await game.destroy();
        res.json({ message: 'Game deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

module.exports = router;