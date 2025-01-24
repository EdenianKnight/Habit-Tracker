// Import necessary modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const authConfig = require('../config/auth');

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
	// Check if the email is already in use
	const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
	if (existingUser.length) {
	    return res.status(400).json({ error: 'Email already in use' });
	}

	// Hash the password for security
	const hashedPassword = await bcrypt.hash(password, 10);

	// Insert the new user into the database
	await db.promise().query(
	    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
	    [username, email, hashedPassword]
	);

	res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
	res.status(500).json({ error: 'Error registering user', details: err.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
	// Check if the user exists
	const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
	const user = users[0];
	if (!user) {
	    return res.status(404).json({ error: 'User not found' });
	}

	// Compare the provided password with the stored hash
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
	    return res.status(401).json({ error: 'Invalid credentials' });
	}

	// Generate a JWT
	const token = jwt.sign({ id: user.id }, authConfig.JWT_SECRET, { expiresIn: authConfig.JWT_EXPIRY });
	res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
	res.status(500).json({ error: 'Error logging in', details: err.message });
    }
};

// Retrieve the profile of the authenticated user
exports.getProfile = async (req, res) => {
    const userId = req.user.id; // Extract user ID from JWT payload

    try {
	const [users] = await db.promise().query('SELECT id, username, email FROM users WHERE id = ?', [userId]);
	const user = users[0];
	if (!user) {
	    return res.status(404).json({ error: 'User not found' });
	}

	res.status(200).json(user);
    } catch (err) {
	res.status(500).json({ error: 'Error fetching user profile', details: err.message });
    }
};
