// Load environment variables from .env file
require('dotenv').config();

// Import required dependencies
const express = require('express');
const cors = require('cors');
const db = require('./config/database');

// Initialize express application
const app = express();

// --- Middleware Configuration ---
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// --- Environment Variables ---
// Set port from environment variables or use 5000 as default
const PORT = process.env.PORT || 5000;

// --- Routes ---
// Test route to verify server is running
app.get('/', (req, res) => {
    res.send('HabiTraqa Backend is Running!');
});

// Health check endpoint for monitoring
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        database: db.state === 'authenticated' ? 'connected' : 'disconnected'
    });
});

// --- Error Handling Middleware ---
// Global error handler for unhandled errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// --- Server Initialization ---
// Start the server and listen for requests
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});
