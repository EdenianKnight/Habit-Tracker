/**
 * Validation Middleware
 * Provides utility functions for validating user inputs
 */

const { body, validationResult } = require('express-validator');

/**
 * Middleware to check for validation errors in the request.
 *
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @param {Function} next - The next middleware function
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

/**
 * Validation rules for user registration.
 */
const validateRegistration = [
    body('username')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long.'),
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address.'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),
    handleValidationErrors,
];

/**
 * Validation rules for user login.
 */
const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address.'),
    body('password')
        .notEmpty()
        .withMessage('Password is required.'),
    handleValidationErrors,
];

/**
 * Validation rules for habit creation and updates.
 */
const validateHabit = [
    body('title')
        .isString()
        .isLength({ min: 1 })
        .withMessage('Title is required and must be a string.'),
    body('frequency')
        .isIn(['daily', 'weekly', 'monthly'])
        .withMessage('Frequency must be one of: daily, weekly, monthly.'),
    handleValidationErrors,
];

module.exports = {
    validateRegistration,
    validateLogin,
    validateHabit,
};
