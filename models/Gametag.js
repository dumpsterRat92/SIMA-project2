const { Model, DataTypes} = require('sequelize');
const Sequelize = require('../config/config');
class Gametag extends Model {}

Gametag.init (
    {
        id: {
            type: DataTypes.INTEGER,
        },
        game_id : {
            type: DataTypes.INTEGER,
            references: {
                model: 'game',
                key: 'id'
            },
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tag',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'game_tag',
    }
);

module.exports = Gametag;