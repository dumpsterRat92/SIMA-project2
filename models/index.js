// import models
const Gametype = require('./Gametype')
const Game = require('./game');
const User = require('./user');
const Tag = require('./Tag');
const Gametag = require('./Gametag');

// Game belongsTo User
Game.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Game.belongsTo(Gametype, {
  foreignKey: 'gametype_id',
  onDelete: 'CASCADE',
})

// User have many Games
User.hasMany(Game, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
// Game belongToMany Tags (through Gametag)
Game.belongsToMany(Tag, {
  through: {
    model: Gametag,
    unique: false,
  },
});

// Tags belongToMany Game (through Gametag)
Tag.belongsToMany(Game, {
  through: {
    model: Gametag,
    unique: false,
  }
});

module.exports = {
  Game,
  User,
  Tag,
  Gametag,
  Gametype
}