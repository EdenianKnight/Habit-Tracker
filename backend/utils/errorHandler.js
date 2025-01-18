const errorHandler = (err, res) => {
    res.status(500).json({ message: 'Server error', error: err.message });
};