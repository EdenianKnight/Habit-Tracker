/**
 * Habit Model
 * Defines the schema and model for habits in the application.
 */

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Habit extends Model {}

Habit.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            comment: 'Primary key for the Habit table (UUID format).',
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
            comment: 'Foreign key referencing the User who owns this habit.',
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100],
            },
            comment: 'Title or name of the habit.',
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Optional description of the habit.',
        },
        frequency: {
            type: DataTypes.ENUM('daily', 'weekly', 'monthly'),
            allowNull: false,
            comment: 'The frequency with which the habit should be performed.',
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment: 'Tracks whether the habit has been completed for the current period.',
        },
    },
    {
        sequelize,
        modelName: 'Habit',
        tableName: 'habits',
        timestamps: true, // Adds createdAt and updatedAt columns
        paranoid: true, // Enables soft deletion with a deletedAt column
        indexes: [
            {
                fields: ['userId', 'frequency'],
            },
        ],
    }
);

module.exports = Habit;
