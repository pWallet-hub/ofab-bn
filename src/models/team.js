// models/Team.js
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  picture: { type: String },
  role: { type: String, required: true, enum: ['Board of Directors', 'Assistant Directors', 'Worker'] },
  description: { type: String }
});

TeamSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isModified('content')) {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Team', TeamSchema);