const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    // Auto-generated ID like KRW-2026-001
    inquiryId: { type: String, unique: true },

    // Agent info
    agentName: { type: String, required: true, trim: true },
    agentEmail: { type: String, trim: true, lowercase: true },
    agencyName: { type: String, trim: true },
    phone: { type: String, trim: true },

    // Client & trip info
    clientName: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    dateFrom: { type: String },
    dateTo: { type: String },
    budget: { type: String },
    travelers: { type: mongoose.Schema.Types.Mixed }, // can be number or string
    requirements: { type: String, default: '' },
    fileName: { type: String, default: '' }, // passport scan filename

    // Admin management
    status: {
      type: String,
      enum: ['new', 'pending', 'approved', 'rejected', 'in-progress', 'follow-up', 'closed'],
      default: 'new',
    },
    partner: { type: String, default: null },
    followUpDate: { type: String, default: null },

    // Reference to agent user
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

// Auto-generate inquiryId before saving
inquirySchema.pre('save', async function (next) {
  if (this.inquiryId) return next();
  const count = await mongoose.model('Inquiry').countDocuments();
  const year = new Date().getFullYear();
  this.inquiryId = `KRW-${year}-${String(count + 1).padStart(3, '0')}`;
  next();
});

// Index for fast queries
inquirySchema.index({ status: 1 });
inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ agentEmail: 1 });
inquirySchema.index({ destination: 1 });

module.exports = mongoose.model('Inquiry', inquirySchema);
