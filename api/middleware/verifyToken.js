const jwt = require('jsonwebtoken');

// This function will be used to verify the token in the Authorization header
const verifyToken = (req, res, next) => {
  // Check if token is provided in the Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // "Bearer <token>"
  console.log(token)
  
  // If there's no token, return a 401 Unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key (use the same secret key used when generating the token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user info (userId) to the request object
    req.user = decoded;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid or expired, return a 401 Unauthorized error
    res.status(401).json({ message: 'Invalid token or token expired' });
  }
};

module.exports = verifyToken;
