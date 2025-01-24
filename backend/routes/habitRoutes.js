/**
 * Habit Routes
 * Defines the API endpoints for habit-related operations in the application.
 */

const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
console.log('Habit Controller:', habitController);
const authMiddleware = require('../middleware/auth');
const validationMiddleware = require('../middleware/validation');

// Create a new habit
/**
 * @route POST /api/habits
 * @description Creates a new habit for the authenticated user
 * @access Private
 */
router.post(
    '/', 
    authMiddleware,
    validationMiddleware.validateHabit,
    habitController.createHabit
);

// Get all habits for the user
/**
 * @route GET /api/habits
 * @description Retrieves all habits for the authenticated user
 * @access Private
 */
router.get(
    '/', 
    authMiddleware,
    habitController.getHabits
);

// Update a specific habit
/**
 * @route PUT /api/habits/:id
 * @description Updates a specific habit for the authenticated user
 * @access Private
 */
router.put(
    '/:id', 
    authMiddleware,
    validationMiddleware.validateHabit,
    habitController.updateHabit
);

// Delete a specific habit
/**
 * @route DELETE /api/habits/:id
 * @description Deletes a specific habit for the authenticated user
 * @access Private
 */
router.delete(
    '/:id', 
    authMiddleware,
    habitController.deleteHabit
);

module.exports = router;