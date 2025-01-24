/**
 * Error Handler Utility
 * Provides a centralized mechanism to handle errors across the application.
 */

/**
 * Global Error Handling Middleware
 * @param {Object} err - The error object.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[Error]: ${err.message}`);

    const statusCode = err.statusCode || 500; // Default to 500 if no statusCode is provided.
    const response = {
        success: false,
        message: err.message || 'Internal Server Error',
    };

    // Include stack trace in development mode
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

module.exports = errorHandler;
