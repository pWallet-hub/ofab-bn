// models/SuccessStory.js
const mongoose = require('mongoose');

const SuccessStorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  story: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

SuccessStorySchema.pre('save', function (next) {
  if (this.isModified('title') || this.isModified('content')) {
    this.updatedAt = Date.now();
  }
  next();
})

module.exports = mongoose.model('SuccessStory', SuccessStorySchema);