// This file holds authentication-related configurations
module.exports = {
    // JWT_SECRET is used for signing and verifying JWT tokens
    JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret-key-here',
    // JWT_EXPIRY defines how long the token will be valid (e.g., 1 hour)
    JWT_EXPIRY: '1h'
};
