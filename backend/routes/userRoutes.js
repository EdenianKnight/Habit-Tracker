// routes/userRoutes.js
const express = require('express');
const { check } = require('express-validator');
const authenticateToken = require('../middleware/auth');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');

const router = express.Router();

// Registration route with validation
router.post(
    '/register',
    [
        check('username', 'Username is required').notEmpty(),
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    registerUser
);

// Login route with validation
router.post(
    '/login',
    [
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Password is required').notEmpty(),
    ],
    loginUser
);

// Protected profile route
router.get('/me', authenticateToken, getProfile);

module.exports = router;