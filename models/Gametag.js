const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
class Gametag extends Model {}

Gametag.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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