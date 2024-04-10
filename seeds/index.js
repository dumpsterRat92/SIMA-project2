const sequelize = require('../config/connection');
const seedGametypes = require('./gametypeSeeds');
const seedUsers = require('./userSeeds');
const tagSeeds = require('./tagseeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedGametypes();

    await seedUsers();

    await tagSeeds();

    process.exit(0);
};

seedAll();