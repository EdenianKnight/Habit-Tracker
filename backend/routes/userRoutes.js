const express = require('express');
const { check } = require('express-validator');
const { registerUser } = require('../controllers/userController');

const router = express.Router();

router.post(
    '/register',
    [
        check('username', 'Username is required').notEmpty(),
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    registerUser
);

module.exports = router;
