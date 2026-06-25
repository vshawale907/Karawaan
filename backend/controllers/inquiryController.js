const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');

// Email transporter
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
  } catch (error) {
    console.error('Email error:', error.message);
    return false;
  }
};

/**
 * GET /api/inquiries
 * Admin: gets all inquiries with pagination & filters
 * Agent: gets only their own inquiries
 */
const getAllInquiries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    const search = req.query.search;

    let filter = {};

    // Agents only see their own submissions
    if (req.user.role === 'agent') {
      filter.agentEmail = req.user.email;
    }

    // Filter by status
    if (status && status !== 'all') {
      filter.status = status;
    }

    // Search by client name, destination, or agent name
    if (search) {
      filter.$or = [
        { clientName: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } },
        { agentName: { $regex: search, $options: 'i' } },
        { inquiryId: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Inquiry.countDocuments(filter);
    const inquiries = await Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      inquiries,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    });
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching inquiries.', error: error.message });
  }
};

/**
 * POST /api/inquiries
 * Create a new inquiry and send notification emails
 */
const createInquiry = async (req, res) => {
  try {
    const {
      agentName, agentEmail, agencyName, phone,
      clientName, destination, dateFrom, dateTo,
      budget, travelers, requirements, fileName,
    } = req.body;

    if (!clientName || !destination || !agentName) {
      return res.status(400).json({ success: false, message: 'Client name, destination, and agent name are required.' });
    }

    const inquiry = await Inquiry.create({
      agentName,
      agentEmail,
      agencyName,
      phone,
      clientName,
      destination,
      dateFrom,
      dateTo,
      budget,
      travelers,
      requirements,
      fileName,
      submittedBy: req.user?.id || null,
    });

    // Send notification email to admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
        <div style="border-bottom:1px solid #c9a84c33;padding-bottom:16px;margin-bottom:24px;">
          <h2 style="color:#c9a84c;margin:0;font-size:20px;">🌍 New Inquiry Received</h2>
          <p style="color:#ffffff60;margin:4px 0 0;font-size:12px;">Inquiry ID: <strong style="color:#fff">${inquiry.inquiryId}</strong></p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;width:40%;">Agent Name</td><td style="padding:8px 0;color:#fff;font-weight:600;">${agentName}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Agency</td><td style="padding:8px 0;color:#fff;">${agencyName || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Agent Email</td><td style="padding:8px 0;color:#fff;">${agentEmail || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Client Name</td><td style="padding:8px 0;color:#fff;font-weight:600;">${clientName}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Destination</td><td style="padding:8px 0;color:#c9a84c;font-weight:600;">${destination}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Travel Dates</td><td style="padding:8px 0;color:#fff;">${dateFrom || '—'} ${dateTo ? '→ ' + dateTo : ''}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Budget</td><td style="padding:8px 0;color:#fff;">${budget || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Travelers</td><td style="padding:8px 0;color:#fff;">${travelers || '—'}</td></tr>
        </table>
        ${requirements ? `<div style="margin-top:16px;padding:12px;background:#ffffff08;border-radius:8px;"><p style="color:#ffffff60;font-size:11px;margin:0 0 6px;">SPECIAL REQUIREMENTS</p><p style="color:#fff;font-size:13px;margin:0;">${requirements}</p></div>` : ''}
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #ffffff10;">
          <p style="color:#ffffff40;font-size:11px;margin:0;">Karawaan Trails & Safaris — Admin Portal</p>
        </div>
      </div>
    `;
    await sendEmail(adminEmail, `New Inquiry ${inquiry.inquiryId} — ${destination}`, adminHtml);

    // Send acknowledgement to agent
    if (agentEmail) {
      const agentHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
          <h2 style="color:#c9a84c;">✅ Inquiry Received — ${inquiry.inquiryId}</h2>
          <p style="color:#ffffffb0;">Dear ${agentName},</p>
          <p style="color:#ffffffb0;">Your inquiry for <strong style="color:#c9a84c;">${destination}</strong> (Client: ${clientName}) has been successfully received.</p>
          <p style="color:#ffffffb0;">Our team will review and respond to you shortly.</p>
          <p style="color:#ffffff60;font-size:12px;margin-top:24px;">— Karawaan Trails & Safaris Team</p>
        </div>
      `;
      await sendEmail(agentEmail, `Inquiry Received: ${destination} — Karawaan`, agentHtml);
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry created and email notifications sent.',
      inquiry,
    });
  } catch (error) {
    console.error('Create inquiry error:', error);
    res.status(500).json({ success: false, message: 'Server error creating inquiry.', error: error.message });
  }
};

/**
 * PATCH /api/inquiries/:id
 * Admin only — update status, partner, follow-up date
 */
const updateInquiry = async (req, res) => {
  try {
    const { status, partner, followUpDate } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status, partner, followUpDate },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }

    res.status(200).json({ success: true, message: 'Inquiry updated.', inquiry });
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(500).json({ success: false, message: 'Server error updating inquiry.', error: error.message });
  }
};

/**
 * DELETE /api/inquiries/:id
 * Admin only
 */
const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }
    res.status(200).json({ success: true, message: 'Inquiry deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting inquiry.', error: error.message });
  }
};

module.exports = { getAllInquiries, createInquiry, updateInquiry, deleteInquiry };
