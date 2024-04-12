// controllers/SuccessStoryController.js
const { getDb } = require('../../db');
const SuccessStory = require('../models/SuccessStory');
const mongodb = require('mongodb');
const cloudinary = require('cloudinary').v2;



exports.create = async (req, res) => {
  try {
    const db = getDb();
    const successStoriesCollection = db.collection('successStories');

    const imageUrlResult = await cloudinary.uploader.upload(req.file.path);

    const successStory = new SuccessStory({
      name: req.body.name,
      story: req.body.story,
      imageUrl: imageUrlResult.secure_url,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    await successStoriesCollection.insertOne(successStory);
    res.status(201).send(successStory);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const successStories = await SuccessStory.find();
    res.status(200).send(successStories);
  } catch (error) {
    res.status(500).send(error);
  }
};