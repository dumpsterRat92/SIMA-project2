const router = require('express').Router();
const { Game, Gametype, Tag, Gametag } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

router.get(`/pick`, withAuth, async (req, res) => {
    try{
        const {type, tag, playerCount} = req.query;
        const userId = req.session.userId;
        let whereList = {};
        var games='';
        if(userId){
            whereList.user_id = userId;
        }
        if(playerCount){
            whereList.minplayers = {
                [Op.lte]: playerCount
            }
            whereList.maxplayers = {
                [Op.gte]: playerCount
            }
        }
        if(type&&tag) {
            games = await Game.findAll({
                where: whereList,
                include: [
                    { 
                        model: Gametype,
                        attributes: ['name'],
                        where: {name: type}
                    }, {
                        model: Tag,
                        attributes: ['name'],
                        where: {name: tag}
                    }
                ]
            });
        } else if(type){
            games = await Game.findAll({
                where: whereList,
                include: [
                    { 
                        model: Gametype,
                        attributes: ['name'],
                        where: {name: type}
                    }, {
                        model: Tag,
                        attributes: ['name']
                    }
                ]
            });
        } else if(tag){
            games = await Game.findAll({
                where: whereList,
                include: [
                    { 
                        model: Gametype,
                        attributes: ['name']
                    }, {
                        model: Tag,
                        attributes: ['name'],
                        where: {name: tag}
                    }
                ]
            });
        } else {
            games = await Game.findAll({
                where: whereList,
                include: [
                    { 
                        model: Gametype,
                        attributes: ['name']
                    }, {
                        model: Tag,
                        attributes: ['name']
                    }
                ]
            });
        }
        
        if(games){
            var games2 = games.map((game) => {
                return game.get({ plain: true });
            });
            
            res.status(200).json(games2)
        } else {
            res.status(404).json({ message: 'None of your games match your criteria' })
        }
        
        
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

router.post('/new', withAuth, async (req, res) => {
    try{
        var GametypeID = await Gametype.findOne({
            where: {name: req.body.gametype} 
        })
        if (!GametypeID){
            GametypeID = await Gametype.create({
                name: req.body.gametype
            })
        }
        var newTags = await Tag.findOne({
            where: {name: req.body.tags} 
        })
        if (!newTags){
            newTags = await Tag.create({
                name: req.body.tags
            })
        }
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