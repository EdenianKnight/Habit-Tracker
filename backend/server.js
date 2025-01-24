/**
 * Small Steps Backend Server
 * Initializes and starts the backend server, connecting all necessary middleware and routes.
 */

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./utils/errorHandler');

// Load environment variables first
dotenv.config();

// Import database connection
const db = require('./config/database');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');
const guestRoutes = require('./routes/guestRoutes');

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Update the CORS middleware in server.js
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Update this to match your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
//app.use(cors()); // Enable Cross-Origin Resource Sharing

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Small Steps API',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            habits: '/api/habits',
            guest: '/api/guest'
        }
    });
});

// API Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/habits', habitRoutes); // Habit-related routes
app.use('/api/guest', guestRoutes); // Guest mode routes

// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

//tests
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend connection successful!' });
});