/**
 * Auth Middleware
 * Handles authentication for protected routes using JWT
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Secret key from environment variables

/**
 * Middleware to authenticate users.
 * Ensures a valid JWT token is provided in the Authorization header.
 *
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @param {Function} next - The next middleware function
 */
const authenticate = (req, res, next) => {
    // Retrieve the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing or invalid.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token
    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or route
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authenticate;
