const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Admin's Gmail address
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// Helper function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Handler for Inquiry submissions
const sendInquiryEmail = async (req, res) => {
  const { 
    agentName, agentEmail, agencyName, phone,
    clientName, destination, travelDates, budget,
    travelers, requirements 
  } = req.body;

  try {
    // 1. Email to Admin
    const adminSubject = `New Inquiry from ${agentName} (${agencyName}) - ${destination}`;
    const adminText = `
A new inquiry has been submitted by an agent.

--- AGENT DETAILS ---
Name: ${agentName}
Email: ${agentEmail}
Agency: ${agencyName}
Phone: ${phone}

--- CLIENT & TRIP DETAILS ---
Client Name: ${clientName}
Destination: ${destination}
Travel Dates: ${travelDates}
Budget: ${budget}
Travelers: ${travelers}
Special Requirements: ${requirements || 'None'}

Please review this inquiry in the admin portal.
`;
    // Replace with the actual admin email, or use the EMAIL_USER to send to yourself
    const adminEmailAddress = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    await sendEmail(adminEmailAddress, adminSubject, adminText);

    // 2. Acknowledgment Email to Agent
    const agentSubject = `Inquiry Received: ${destination}`;
    const agentText = `
Hello ${agentName},

Thank you for submitting your inquiry for ${destination}.
We have successfully received the details for your client, ${clientName}.

Our team will review the requirements and get back to you shortly.

Best Regards,
Karawaan Team
`;
    if (agentEmail) {
      await sendEmail(agentEmail, agentSubject, agentText);
    }

    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send emails', error: error.message });
  }
};

// Handler for Survey submissions
const sendSurveyEmail = async (req, res) => {
  const { name, email, agency, phone, answers } = req.body;

  try {
    // 1. Email to Admin
    const adminSubject = `New B2B Survey Submission from ${name} (${agency})`;
    
    // Format answers
    let answersText = '';
    if (answers && typeof answers === 'object') {
      Object.entries(answers).forEach(([key, value]) => {
        answersText += `${key}: ${value}\n`;
      });
    }

    const adminText = `
A new B2B survey has been completed.

--- PARTNER DETAILS ---
Name: ${name}
Email: ${email}
Agency: ${agency}
Phone: ${phone}

--- SURVEY ANSWERS ---
${answersText}

Please review this survey in the admin portal.
`;
    const adminEmailAddress = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    await sendEmail(adminEmailAddress, adminSubject, adminText);

    // 2. Acknowledgment Email to Partner
    const partnerSubject = `Thank You for Your Feedback - Karawaan`;
    const partnerText = `
Hello ${name},

Thank you for taking the time to complete our B2B survey!
Your feedback is extremely valuable to us and will help us improve our services and partnerships.

Best Regards,
Karawaan Team
`;
    if (email) {
      await sendEmail(email, partnerSubject, partnerText);
    }

    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send emails', error: error.message });
  }
};

module.exports = {
  sendInquiryEmail,
  sendSurveyEmail,
};
