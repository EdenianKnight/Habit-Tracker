/**
 * User Model
 * Defines the schema and model for users in the HabiTraqa application.
 */

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            comment: 'Primary key for the User table (UUID format).',
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 50],
            },
            comment: 'Unique username for the user.',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            comment: 'User email address (unique).',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Hashed password for the user.',
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true, // Adds createdAt and updatedAt columns
        paranoid: true, // Enables soft deletion with a deletedAt column
        indexes: [
            {
                unique: true,
                fields: ['email', 'username'],
            },
        ],
    }
);

module.exports = User;
