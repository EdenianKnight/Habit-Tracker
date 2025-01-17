const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const db = require('../config/database');  // Changed from '../db/connection' to match project structure

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create(username, email, hashedPassword, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user', error: err.message });
            }
            res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username, email: user.email },
        });
    });
};

const getProfile = async (req, res) => {
    try {
        const [rows] = await db.promise().query(
            'SELECT id, username, email, created_at FROM users WHERE id = ?',
            [req.user.id]
        );
        
        if (!rows.length) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        res.json({ user: rows[0] });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user profile.', error: err.message });
    }
};

module.exports = { registerUser, loginUser, getProfile };