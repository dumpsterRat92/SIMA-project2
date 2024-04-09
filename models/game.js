const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
class Game extends Model {}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        minplayers: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        maxplayers: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gametype_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'gametype',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        }
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'game',
    }
);

module.exports = Game;