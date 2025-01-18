const db = require('../db/connection');

// Create a new habit
const addHabit = async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Habit name is required.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO habits (user_id, name, description) VALUES (?, ?, ?)',
            [req.user.id, name, description || null]
        );
        res.status(201).json({ message: 'Habit created successfully.', habitId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: 'Error creating habit.', error: err.message });
    }
};

// Retrieve all habits for the logged-in user
const getHabits = async (req, res) => {
    try {
        const [habits] = await db.query(
            'SELECT id, name, description, created_at FROM habits WHERE user_id = ?',
            [req.user.id]
        );
        res.json({ habits });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving habits.', error: err.message });
    }
};

// Update a habit
const updateHabit = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE habits SET name = ?, description = ? WHERE id = ? AND user_id = ?',
            [name, description, id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Habit not found or not authorized to update.' });
        }

        res.json({ message: 'Habit updated successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating habit.', error: err.message });
    }
};

// Delete a habit
const deleteHabit = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM habits WHERE id = ? AND user_id = ?',
            [id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Habit not found or not authorized to delete.' });
        }

        res.json({ message: 'Habit deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting habit.', error: err.message });
    }
};

module.exports = { addHabit, getHabits, updateHabit, deleteHabit };