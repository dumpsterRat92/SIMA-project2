const { User } = require('../models');

const userData = [
    {
        email: 'test1@test1.com',
        password: 'password1'
    },
    {
        email: 'test2@test2.com',
        password: 'password2'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;