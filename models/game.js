// Import the necessary parts of the sequelize package and the database connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define a class Game that extends Model from Sequelize
class Game extends Model {}

// Initialize the Game model with its structure and configurations
Game.init(
    {
        // Define the attributes of the model
        id: {
            type: DataTypes.INTEGER,  // Data type is integer
            allowNull: false,         // This field cannot be empty
            primaryKey: true,         // This field is the primary key
            autoIncrement: true,      // This field will auto increment
        },
        name: {
            type: DataTypes.STRING,  // Data type is string
            allowNull: false,         // This field cannot be empty
        },
        minplayers: {
            type: DataTypes.INTEGER, // Data type is integer
            allowNull: false,         // This field cannot be empty
        },
        maxplayers: {
            type: DataTypes.INTEGER, // Data type is integer
            allowNull: false,         // This field cannot be empty
        },
        gametype_id: {
            type: DataTypes.INTEGER, // Data type is integer
            allowNull: false,         // This field cannot be empty
            references: {             // This sets a foreign key relationship
                model: 'gametype',    // Refers to the 'gametype' table
                key: 'id',            // Refers to the 'id' field in the 'gametype' table
            },
        },
        user_id: {
            type: DataTypes.INTEGER, // Data type is integer
            allowNull: false,         // This field cannot be empty
            references: {             // This sets a foreign key relationship
                model: 'user',        // Refers to the 'user' table
                key: 'id',            // Refers to the 'id' field in the 'user' table
            },
        }
    },
    {
        sequelize,                   // Pass the connection instance
        timestamps: false,           // Do not automatically create timestamp fields
        freezeTableName: true,       // Do not change the table name
        underscored: true,           // Use underscores instead of camelCasing
        modelName: 'game'            // Define the name of the model
    }
);

// Export the Game model for use in other parts of the application
module.exports = Game;
