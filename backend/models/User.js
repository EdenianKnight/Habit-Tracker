const db = require('../config/database');

const User = {
    create: (username, email, hashedPassword, callback) => {
        console.log('Creating user:', username, email); // Debugging statement
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error creating user:', err); // Debugging statement
            } else {
                console.log('User created successfully:', result); // Debugging statement
            }
            callback(err, result);
        });
    },

    findByEmail: (email, callback) => {
        console.log('Finding user by email:', email); // Debugging statement
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, result) => {
            if (err) {
                console.error('Error finding user:', err); // Debugging statement
            } else {
                console.log('User found:', result); // Debugging statement
            }
            callback(err, result);
        });
    }
};

module.exports = User;