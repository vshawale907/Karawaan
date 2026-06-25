const express = require('express');
const { sendInquiryEmail, sendSurveyEmail } = require('../controllers/emailController');

const router = express.Router();

// POST /api/email/inquiry
router.post('/inquiry', sendInquiryEmail);

// POST /api/email/survey
router.post('/survey', sendSurveyEmail);

module.exports = router;
