const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }, // Updated to be a String
  publicationDate: { type: String, required: true }, // Added field for publication date
  link: { type: String, required: true }, // Renamed from linkOrAppendixNo to link for clarity
  activitySource: { type: String, required: true }, // Kept as is
  articleSummary: { type: String, required: true }, // Kept as is
  mainPhoto: { type: String, required: false }, // Made optional as it's not provided in the example
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PostSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isModified('articleSummary')) {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Post', PostSchema);