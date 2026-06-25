const Survey = require('../models/Survey');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Karawaan Trails & Safaris" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (err) {
    console.error('Survey email error:', err.message);
    return false;
  }
};

/**
 * GET /api/surveys
 * Admin only — all survey submissions with pagination
 */
const getAllSurveys = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;

    let filter = {};
    if (status && status !== 'all') filter.status = status;

    const total = await Survey.countDocuments(filter);
    const surveys = await Survey.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      surveys,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Get surveys error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching surveys.', error: error.message });
  }
};

/**
 * POST /api/surveys
 * Public — anyone can submit a B2B survey
 */
const createSurvey = async (req, res) => {
  try {
    const {
      companyName, location, contactPerson, mobile, email,
      experience, paxHandled, segments, supportNeeded,
      partnershipType, timeline, communication,
    } = req.body;

    if (!companyName || !contactPerson) {
      return res.status(400).json({ success: false, message: 'Company name and contact person are required.' });
    }

    const survey = await Survey.create({
      companyName, location, contactPerson, mobile, email,
      experience, paxHandled,
      segments: Array.isArray(segments) ? segments : [],
      supportNeeded: Array.isArray(supportNeeded) ? supportNeeded : [],
      partnershipType, timeline, communication,
      submittedBy: req.user?.id || null,
    });

    // Email admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
        <h2 style="color:#c9a84c;">📋 New B2B Survey — ${survey.surveyId}</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;width:40%;">Company</td><td style="color:#fff;font-weight:600;">${companyName}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Contact Person</td><td style="color:#fff;">${contactPerson}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Location</td><td style="color:#fff;">${location || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Mobile</td><td style="color:#fff;">${mobile || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Email</td><td style="color:#fff;">${email || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Experience</td><td style="color:#fff;">${experience || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Pax Handled</td><td style="color:#fff;">${paxHandled || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Segments</td><td style="color:#fff;">${segments?.join(', ') || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Partnership Type</td><td style="color:#c9a84c;font-weight:600;">${partnershipType || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Timeline</td><td style="color:#fff;">${timeline || '—'}</td></tr>
        </table>
      </div>
    `;
    await sendEmail(adminEmail, `New B2B Survey: ${companyName} — Karawaan`, adminHtml);

    // Acknowledgement to partner
    if (email) {
      const partnerHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
          <h2 style="color:#c9a84c;">Thank You, ${contactPerson}!</h2>
          <p style="color:#ffffffb0;">We've received your B2B partnership survey from <strong>${companyName}</strong>.</p>
          <p style="color:#ffffffb0;">Our team will review your profile and reach out within 2–3 business days.</p>
          <p style="color:#ffffff60;font-size:12px;margin-top:24px;">— Karawaan Trails & Safaris</p>
        </div>
      `;
      await sendEmail(email, 'Thank You for Your B2B Survey — Karawaan', partnerHtml);
    }

    res.status(201).json({ success: true, message: 'Survey submitted successfully.', survey });
  } catch (error) {
    console.error('Create survey error:', error);
    res.status(500).json({ success: false, message: 'Server error submitting survey.', error: error.message });
  }
};

/**
 * PATCH /api/surveys/:id
 * Admin only — update survey status
 */
const updateSurveyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const survey = await Survey.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!survey) return res.status(404).json({ success: false, message: 'Survey not found.' });
    res.status(200).json({ success: true, survey });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

module.exports = { getAllSurveys, createSurvey, updateSurveyStatus };
