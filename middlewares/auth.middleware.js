// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'my_super_secret_key_123'; 


exports.verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];


  try {
    const decoded = jwt.verify(token, JWT_SECRET); 
    
    req.user = decoded; 
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
