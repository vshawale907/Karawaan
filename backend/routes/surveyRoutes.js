const express = require('express');
const { getAllSurveys, createSurvey, updateSurveyStatus } = require('../controllers/surveyController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Public — anyone can submit a B2B survey (no login required)
router.post('/', createSurvey);

// Admin only — view and manage surveys
router.get('/', protect, adminOnly, getAllSurveys);
router.patch('/:id', protect, adminOnly, updateSurveyStatus);

module.exports = router;
