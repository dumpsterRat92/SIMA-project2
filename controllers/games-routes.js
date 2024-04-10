const router = require('express').Router();
const { Game } = require('../models');
const Gametype = require('../models/Gametype');


router.post('/new', async (req, res) => {
    try{
        const GametypeID = await Gametype.findOne({
            where: {
                name: req.body.gametype
            }
        })
        const newGame = await Game.create ({
            name: req.body.name,
            minplayers: req.body.minplayers,
            maxplayers: req.body.maxplayers,
            gametype_id: GametypeID.id,
            user_id: req.body.id
        })
        res.status(200).json({newGame, message: 'Game created successfully'})
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
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