const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: [true, 'Company Name is required'], trim: true },
    founderName: { type: String, required: [true, 'Owner Name is required'], trim: true },
    founderContact: { type: String, required: [true, 'Owner Contact is required'], trim: true },
    salesHeadName: { type: String, required: [true, 'Operation Head Name is required'], trim: true },
    salesHeadContact: { type: String, required: [true, 'Operation Head Contact is required'], trim: true },
    agentName: { type: String, trim: true, default: '' },
    clientName: { type: String, trim: true, default: '' },
    clientContact: { type: String, trim: true, default: '' },
    clientEmail: { type: String, trim: true, default: '' },
    association: { type: String, trim: true, default: '' },
    email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
    password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
    role: { type: String, enum: ['admin', 'agent'], default: 'agent' },
    promoting: { type: String, trim: true },
    topDestinations: { type: String, trim: true },
    destinationCount: { type: Number, default: null },
    preferences: { type: String, trim: true },
    support: { type: [String], default: [] },
    partnershipType: { type: String, trim: true },
    timeline: { type: String, trim: true },
    communication: { type: [String], default: [] },
    avatar: { type: String, default: '' },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    approvalDate: { type: Date, default: null },
    rejectionDate: { type: Date, default: null },
    actionByAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    rejectionReason: { type: String, trim: true, default: '' },
    documents: [{ type: String }], // Array of file paths
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  if (!this.avatar && this.founderName) {
    this.avatar = this.founderName.substring(0, 2).toUpperCase();
  }
  next();
});

// Compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
