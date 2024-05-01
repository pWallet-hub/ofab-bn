// models/CapacityBuilding.js
const mongoose = require('mongoose');

const CapacityBuildingSchema = new mongoose.Schema({
   eventName: {
    title: { type: String, required: true },
    subTitle: { type: String, required: true }
  },
  gallery: {
    photos: [{ type: String, required: true }] // array of photo URLs
  },
  video: {
    youtubeLink: { type: String, required: true }
  },
  article: {
    coverPhoto: { type: String, required: true },
    shortDescription: { type: String, required: true },
    linkToArticle: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CapacityBuilding', CapacityBuildingSchema);