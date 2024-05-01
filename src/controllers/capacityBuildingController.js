// controllers/CapacityBuildingController.js
const { getDb } = require('../../db');
const CapacityBuilding = require('../models/CapacityBuilding');
const mongodb = require('mongodb');
const cloudinary = require('cloudinary').v2;

exports.create = async (req, res) => {
  try {
    const db = getDb();
    const capacityBuildingCollection = db.collection('capacityBuilding');

    const images = await Promise.all(req.files['image'].map(file => cloudinary.uploader.upload(file.path)));
    const covers = await Promise.all(req.files['cover'].map(file => cloudinary.uploader.upload(file.path)));

    const imageUrls = images.map(image => image.secure_url);
    const coverUrls = covers.map(cover => cover.secure_url);

    const capacityBuilding = {
      eventName: {
        title: req.body.title,
        subTitle: req.body.subTitle
      },
      gallery: {
        photos:imageUrls  // array of photo URLs
      },
      video: {
        youtubeLink: req.body.youtubeLink
      },
      article: {
        coverPhoto: coverUrls,
        shortDescription: req.body.shortDescription,
        linkToArticle: req.body.linkToArticle
      },
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await capacityBuildingCollection.insertOne(capacityBuilding);
    res.status(201).send(capacityBuilding);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const db = getDb();
    const capacityBuildingCollection = db.collection('capacityBuilding');

    const capacityBuildingEvents = await capacityBuildingCollection.find().toArray();

    res.status(200).send(capacityBuildingEvents);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const capacityBuildingEvent = await CapacityBuilding.findById(req.params._id);
    if (!capacityBuildingEvent) {
      return res.status(404).send({ message: 'Capacity Building Event not found' });
    }
    res.status(200).send(capacityBuildingEvent);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};


exports.delete = async (req, res) => {
  try {
    const db = getDb();
    const capacityBuildingCollection = db.collection('capacityBuilding');

    if (!mongodb.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: 'Invalid id.' });
    }

    const result = await capacityBuildingCollection.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).send();
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};