const db = require('../config/database');

const User = {
    create: (username, email, hashedPassword, callback) => {
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hashedPassword], callback);
    },
};

module.exports = User;
