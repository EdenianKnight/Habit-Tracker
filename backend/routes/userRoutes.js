/**
 * User Routes
 * Defines the API endpoints for user-related operations in the application.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const validationMiddleware = require('../middleware/validation');

// User Registration Route
/**
 * @route POST /api/users/register
 * @description Registers a new user.
 * @access Public
 */
router.post(
    '/register',
    validationMiddleware.validateRegistration,
    userController.register
);

// User Login Route
/**
 * @route POST /api/users/login
 * @description Authenticates a user and returns a token.
 * @access Public
 */
router.post(
    '/login',
    validationMiddleware.validateLogin,
    userController.login
);

// Get User Profile Route
/**
 * @route GET /api/users/profile
 * @description Retrieves the authenticated user's profile.
 * @access Private
 */
router.get(
    '/profile',
    authMiddleware,
    userController.getProfile
);

module.exports = router;
