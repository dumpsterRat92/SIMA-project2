const { Gametype } = require('../models');

const gametypeData = [
  {
    name: 'Card',
  },
  {
    name: 'Board',
  },
  {
    name: 'Party',
  },
  {
    name: 'Puzzle',
  },
  {
    name: 'Video',
  }
];

const seedGametypes = () => Gametype.bulkCreate(gametypeData);

module.exports = seedGametypes;