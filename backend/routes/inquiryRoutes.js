const express = require('express');
const { getAllInquiries, createInquiry, updateInquiry, deleteInquiry } = require('../controllers/inquiryController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Both admin and agent can GET (agents see only their own — handled in controller)
router.get('/', protect, getAllInquiries);

// Any logged-in user can submit an inquiry
router.post('/', protect, createInquiry);

// Admin only — update or delete
router.patch('/:id', protect, adminOnly, updateInquiry);
router.delete('/:id', protect, adminOnly, deleteInquiry);

module.exports = router;
