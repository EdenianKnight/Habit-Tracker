/**
 * Guest Routes
 * Defines the API endpoints for guest-related operations in the application.
 */

const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

// Create a Habit in Guest Mode
/**
 * @route POST /api/guest/habits
 * @description Creates a new habit for a guest user (stored temporarily).
 * @access Public
 */
router.post('/habits', guestController.createGuestHabit);

// Get All Habits in Guest Mode
/**
 * @route GET /api/guest/habits
 * @description Retrieves all habits for a guest user (stored temporarily).
 * @access Public
 */
router.get('/habits', guestController.getGuestHabits);

// Delete a Habit in Guest Mode
/**
 * @route DELETE /api/guest/habits/:id
 * @description Deletes a habit by ID for a guest user (stored temporarily).
 * @access Public
 */
router.delete('/habits/:id', guestController.deleteGuestHabit);

module.exports = router;
