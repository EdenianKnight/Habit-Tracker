const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'knight',
    password: '#6EdeniaKnight9#',
    database: 'SmallSteps'
});

// Test connection
connection.connect((err) => {
    if (err) {
        console.error('Connection failed:', err.message);
    } else {
        console.log('Connected to MySQL database successfully!');
    }
    // Close connection after test
    connection.end();
});
