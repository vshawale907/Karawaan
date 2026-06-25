const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Generate a real JWT signed by the server secret
 */
const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.founderName,
      companyName: user.companyName,
      founderContact: user.founderContact,
      salesHeadName: user.salesHeadName,
      salesHeadContact: user.salesHeadContact,
      association: user.association,
      avatar: user.avatar,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

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
    console.error('Registration email error:', err.message);
    return false;
  }
};

/**
 * POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { 
      companyName, founderName, founderContact, salesHeadName, salesHeadContact, association, 
      email, password,
      agentName, clientName, clientContact, clientEmail,
      promoting, topDestinations, destinationCount, preferences, support, partnershipType, timeline, communication
    } = req.body;

    if (!companyName || !founderName || !founderContact || !salesHeadName || !salesHeadContact || !email || !password) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
    }

    // Check if email already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    let supportArray = [];
    if (support) {
      try { supportArray = JSON.parse(support); } catch(e) { supportArray = support.split(','); }
    }
    
    let commArray = [];
    if (communication) {
      try { commArray = JSON.parse(communication); } catch(e) { commArray = communication.split(','); }
    }

    const documentPaths = req.files ? req.files.map(f => f.path) : [];

    const user = await User.create({
      companyName,
      founderName,
      founderContact,
      salesHeadName,
      salesHeadContact,
      agentName: agentName || '',
      clientName: clientName || '',
      clientContact: clientContact || '',
      clientEmail: clientEmail || '',
      association: association || '',
      email,
      password,
      role: 'agent', // Always force agent role for registrations
      status: 'Pending',
      promoting: promoting || '',
      topDestinations: topDestinations || '',
      destinationCount: destinationCount ? Number(destinationCount) : null,
      preferences: preferences || '',
      support: supportArray,
      partnershipType: partnershipType || '',
      timeline: timeline || '',
      communication: commArray,
      documents: documentPaths
    });

    // Send emails
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
        <h2 style="color:#c9a84c;">📋 New Partner Registration</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;width:40%;">Travel Agency</td><td style="color:#fff;font-weight:600;">${companyName}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Travel Agent Name</td><td style="color:#fff;">${agentName || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Operation Head Name</td><td style="color:#fff;">${salesHeadName}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Operation Head Contact</td><td style="color:#fff;">${salesHeadContact}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Owner Name</td><td style="color:#fff;">${founderName}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Owner Contact</td><td style="color:#fff;">${founderContact}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Client Name</td><td style="color:#fff;">${clientName || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Client Contact</td><td style="color:#fff;">${clientContact || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Client Email</td><td style="color:#fff;">${clientEmail || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Email</td><td style="color:#fff;">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Association</td><td style="color:#fff;">${association || '—'}</td></tr>
        </table>
        
        <h3 style="color:#c9a84c;margin-top:24px;">Survey Answers</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;width:40%;">Promoting</td><td style="color:#fff;">${promoting || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Preferences</td><td style="color:#fff;">${preferences || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Support Needed</td><td style="color:#fff;">${Array.isArray(support) ? support.join(', ') : (support || '—')}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Partnership Type</td><td style="color:#c9a84c;font-weight:600;">${partnershipType || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Timeline</td><td style="color:#fff;">${timeline || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#ffffff60;font-size:12px;">Communication</td><td style="color:#fff;">${communication || '—'}</td></tr>
        </table>
      </div>
    `;
    await sendEmail(adminEmail, `New Registration: ${companyName} — Karawaan`, adminHtml);

    const partnerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
        <h2 style="color:#c9a84c;">Registration Received — Pending Approval</h2>
        <p style="color:#ffffffb0;">We have successfully received your registration for <strong>${companyName}</strong>.</p>
        <p style="color:#ffffffb0;">Your account is currently under review by our administration team. You will be notified via email once your account has been approved and activated.</p>
        <p style="color:#ffffff60;font-size:12px;margin-top:24px;">— Karawaan Trails & Safaris</p>
      </div>
    `;
    await sendEmail(email, 'Registration Received — Karawaan', partnerHtml);

    res.status(201).json({
      success: true,
      message: 'Account created successfully. Your registration is pending approval.',
      user: {
        id: user._id,
        name: user.founderName,
        email: user.email,
        role: user.role,
        status: user.status,
        companyName: user.companyName,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.', error: error.message });
  }
};

/**
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Include password field (it's select: false by default)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Your account has been deactivated.' });
    }

    if (user.role !== 'admin' && user.status === 'Pending') {
      return res.status(403).json({ success: false, message: 'Your registration is pending approval. Please wait for the administrator to review your account.' });
    }

    if (user.role !== 'admin' && user.status === 'Rejected') {
      return res.status(403).json({ success: false, message: 'Your registration was rejected. Please contact the administrator for further assistance.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = signToken(user);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.founderName,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        founderContact: user.founderContact,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.', error: error.message });
  }
};

/**
 * GET /api/auth/me
 * Returns current logged-in user profile
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

/**
 * POST /api/auth/forgot-password
 * Sends a password reset email
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    // Always respond with success for security (don't reveal if user exists)
    if (!user) {
      return res.status(200).json({ success: true, message: 'If an account exists with this email, a reset link has been sent.' });
    }

    // Generate a temporary reset token (valid 1 hour)
    const resetToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const resetHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
        <h2 style="color:#c9a84c;">Password Reset Request</h2>
        <p style="color:#ffffffb0;">We received a request to reset your password for <strong>${user.companyName || user.email}</strong>.</p>
        <p style="color:#ffffffb0;">Click the button below to reset your password. This link will expire in 1 hour.</p>
        <div style="text-align:center;margin:24px 0;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}" style="background:#c9a84c;color:#0a0a0a;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Reset Password</a>
        </div>
        <p style="color:#ffffff60;font-size:12px;margin-top:24px;">If you didn't request this, you can safely ignore this email.</p>
        <p style="color:#ffffff60;font-size:12px;">— Karawaan Trails & Safaris</p>
      </div>
    `;
    await sendEmail(email, 'Password Reset — Karawaan', resetHtml);

    res.status(200).json({ success: true, message: 'If an account exists with this email, a reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

module.exports = { register, login, getMe, forgotPassword };
