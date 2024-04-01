// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String }, // New field for image
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PostSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isModified('content')) {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Post', PostSchema);