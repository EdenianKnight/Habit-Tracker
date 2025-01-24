// In-memory storage for guest habits
const guestHabits = new Map();

// Provide a warning about data loss for guest users
exports.guestWarning = (req, res) => {
    res.status(200).json({
        warning: "You'll lose your habit data if you leave the page. To save it, please sign up.",
    });
};

// Create a new habit for guest user
exports.createGuestHabit = (req, res) => {
    try {
        const habitId = Date.now().toString(); // Simple ID generation
        const newHabit = {
            id: habitId,
            ...req.body,
            createdAt: new Date()
        };
        
        guestHabits.set(habitId, newHabit);
        
        res.status(201).json(newHabit);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create habit' });
    }
};

// Get all habits for guest user
exports.getGuestHabits = (req, res) => {
    try {
        const habits = Array.from(guestHabits.values());
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch habits' });
    }
};

// Delete a habit for guest user
exports.deleteGuestHabit = (req, res) => {
    try {
        const { id } = req.params;
        
        if (!guestHabits.has(id)) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        
        guestHabits.delete(id);
        res.status(200).json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete habit' });
    }
};