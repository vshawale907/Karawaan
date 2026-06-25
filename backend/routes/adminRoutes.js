const express = require('express');
const { getAgencies, approveAgency, rejectAgency } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized as an admin' });
  }
};

// All admin routes are protected and require admin role
router.use(protect);
router.use(isAdmin);

router.get('/agencies', getAgencies);
router.patch('/agencies/:id/approve', approveAgency);
router.patch('/agencies/:id/reject', rejectAgency);

module.exports = router;
