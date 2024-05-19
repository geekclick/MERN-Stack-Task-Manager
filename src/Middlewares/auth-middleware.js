const jwt = require('jsonwebtoken');
require("dotenv").config();

const authMiddleware = () => async (req, res, next) => {
    // Extract JWT token from request headers
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log(token)
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        // Verify JWT token
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: 'Unauthorized: Token expired' });
                } else {
                    return res.status(403).json({ error: 'Forbidden: Invalid token' });
                }
            }

            // Extract user information from decoded token
            req.user = decodedToken;
            console.log(req)

            // Continue to the next middleware or route handler
            next();
        });
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = authMiddleware;
