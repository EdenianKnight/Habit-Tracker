// Import the database configuration
const db = require('../config/database');

// Create a new habit
exports.createHabit = async (req, res) => {
    const userId = req.user.id; // Extract user ID from JWT payload
    const { title, description, frequency } = req.body;

    try {
	await db.promise().query(
	    'INSERT INTO habits (user_id, title, description, frequency) VALUES (?, ?, ?, ?)',
	    [userId, title, description, frequency]
	);

	res.status(201).json({ message: 'Habit created successfully' });
    } catch (err) {
	res.status(500).json({ error: 'Error creating habit', details: err.message });
    }
};

// Get all habits for the authenticated user
exports.getHabits = async (req, res) => {
    const userId = req.user.id;

    try {
	const [habits] = await db.promise().query('SELECT * FROM habits WHERE user_id = ?', [userId]);
	res.status(200).json(habits);
    } catch (err) {
	res.status(500).json({ error: 'Error fetching habits', details: err.message });
    }
};

// Update a habit
exports.updateHabit = async (req, res) => {
    const userId = req.user.id;
    const habitId = req.params.id;
    const { title, description, frequency } = req.body;

    try {
	const [result] = await db.promise().query(
	    'UPDATE habits SET title = ?, description = ?, frequency = ? WHERE id = ? AND user_id = ?',
	    [title, description, frequency, habitId, userId]
	);

	if (result.affectedRows === 0) {
	    return res.status(404).json({ error: 'Habit not found or not authorized' });
	}

	res.status(200).json({ message: 'Habit updated successfully' });
    } catch (err) {
	res.status(500).json({ error: 'Error updating habit', details: err.message });
    }
};

// Delete a habit
exports.deleteHabit = async (req, res) => {
    const userId = req.user.id;
    const habitId = req.params.id;

    try {
	const [result] = await db.promise().query(
	    'DELETE FROM habits WHERE id = ? AND user_id = ?',
	    [habitId, userId]
	);

	if (result.affectedRows === 0) {
	    return res.status(404).json({ error: 'Habit not found or not authorized' });
	}

	res.status(200).json({ message: 'Habit deleted successfully' });
    } catch (err) {
	res.status(500).json({ error: 'Error deleting habit', details: err.message });
    }
};
