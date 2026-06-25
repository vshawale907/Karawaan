const jwt = require('jsonwebtoken');

/**
 * Middleware: Verify JWT token and attach user to req.user
 */
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
    }
    return res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};

/**
 * Middleware: Restrict route to admin role only
 */
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
  }
  next();
};

/**
 * Middleware: Restrict route to agent role only
 */
const agentOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'agent') {
    return res.status(403).json({ success: false, message: 'Access denied. Agents only.' });
  }
  next();
};

module.exports = { protect, adminOnly, agentOnly };
