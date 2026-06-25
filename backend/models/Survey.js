const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema(
  {
    // Auto-generated ID like KAR-PARTNER-2026-001
    surveyId: { type: String, unique: true },

    // Partner agency details
    companyName: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    contactPerson: { type: String, required: true, trim: true },
    mobile: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },

    // Survey answers
    experience: { type: String },
    paxHandled: { type: String },
    segments: { type: [String], default: [] },
    supportNeeded: { type: [String], default: [] },
    partnershipType: { type: String },
    timeline: { type: String },
    communication: { type: String },

    // Admin management
    status: {
      type: String,
      enum: ['New Lead', 'Potential Partner', 'Active Partner', 'Rejected'],
      default: 'New Lead',
    },

    // Reference to the user who submitted (if logged in)
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

// Auto-generate surveyId
surveySchema.pre('save', async function (next) {
  if (this.surveyId) return next();
  const count = await mongoose.model('Survey').countDocuments();
  const year = new Date().getFullYear();
  this.surveyId = `KAR-PARTNER-${year}-${String(count + 1).padStart(3, '0')}`;
  next();
});

surveySchema.index({ createdAt: -1 });
surveySchema.index({ status: 1 });

module.exports = mongoose.model('Survey', surveySchema);
