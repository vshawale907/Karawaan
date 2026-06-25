const User = require('../models/User');
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
    console.error('Email error:', err.message);
    return false;
  }
};

/**
 * GET /api/admin/agencies
 */
const getAgencies = async (req, res) => {
  try {
    const filter = { role: 'agent' };
    if (req.query.status) {
      filter.status = req.query.status;
    }
    // Simple text search across a few fields if ?search= is provided
    if (req.query.search) {
      const regex = new RegExp(req.query.search, 'i');
      filter.$or = [
        { companyName: regex },
        { agentName: regex },
        { email: regex },
        { founderName: regex }
      ];
    }

    const agencies = await User.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: agencies.length, data: agencies });
  } catch (error) {
    console.error('getAgencies error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

/**
 * PATCH /api/admin/agencies/:id/approve
 */
const approveAgency = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Agency not found' });
    }

    user.status = 'Approved';
    user.approvalDate = new Date();
    user.actionByAdminId = req.user.id;
    await user.save();

    const approvalHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
        <h2 style="color:#c9a84c;">Registration Approved!</h2>
        <p style="color:#ffffffb0;">Hello ${user.founderName},</p>
        <p style="color:#ffffffb0;">Good news! Your registration for <strong>${user.companyName}</strong> has been approved by our administration team.</p>
        <p style="color:#ffffffb0;">You can now log in to the B2B Partner Portal using your email address and password.</p>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" style="display:inline-block;margin-top:20px;padding:12px 24px;background-color:#c9a84c;color:#000;text-decoration:none;border-radius:6px;font-weight:bold;">Login Now</a>
        <p style="color:#ffffff60;font-size:12px;margin-top:24px;">— Karawaan Trails & Safaris</p>
      </div>
    `;
    await sendEmail(user.email, 'Your Karawaan Account is Approved', approvalHtml);

    res.status(200).json({ success: true, message: 'Agency approved successfully', data: user });
  } catch (error) {
    console.error('approveAgency error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

/**
 * PATCH /api/admin/agencies/:id/reject
 */
const rejectAgency = async (req, res) => {
  try {
    const { reason } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Agency not found' });
    }

    user.status = 'Rejected';
    user.rejectionDate = new Date();
    user.rejectionReason = reason || '';
    user.actionByAdminId = req.user.id;
    await user.save();

    const rejectionHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
        <h2 style="color:#f43f5e;">Registration Update</h2>
        <p style="color:#ffffffb0;">Hello ${user.founderName},</p>
        <p style="color:#ffffffb0;">Thank you for your interest in partnering with Karawaan Trails & Safaris. After reviewing your application for <strong>${user.companyName}</strong>, we regret to inform you that we are unable to approve your registration at this time.</p>
        ${reason ? `<p style="color:#ffffffb0;background:#ffffff10;padding:12px;border-left:4px solid #f43f5e;"><strong>Reason:</strong> ${reason}</p>` : ''}
        <p style="color:#ffffffb0;">If you have any questions, please contact our support team.</p>
        <p style="color:#ffffff60;font-size:12px;margin-top:24px;">— Karawaan Administration</p>
      </div>
    `;
    await sendEmail(user.email, 'Update on Your Karawaan Registration', rejectionHtml);

    res.status(200).json({ success: true, message: 'Agency rejected successfully', data: user });
  } catch (error) {
    console.error('rejectAgency error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAgencies,
  approveAgency,
  rejectAgency
};
