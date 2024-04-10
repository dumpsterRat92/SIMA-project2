const sequelize = require('../config/connection');
const seedGametypes = require('./gametypeSeeds');
const seedUsers = require('./userSeeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedGametypes();

    await seedUsers();

    process.exit(0);
};

seedAll();