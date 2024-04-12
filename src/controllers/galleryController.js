// controllers/GalleryController.js
const { getDb } = require('../../db');
const Gallery = require('../models/Gallery');
const mongodb = require('mongodb');
const cloudinary = require('cloudinary').v2;


exports.create = async (req, res) => {
  try {
    const db = getDb();
    const galleriesCollection = db.collection('galleries');

    const image = await cloudinary.uploader.upload(req.file.path);

    const gallery = {
      title: req.body.title,
      description: req.body.description,
      images: image.secure_url, // array of image URLs
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await galleriesCollection.insertOne(gallery);
    res.status(201).send(gallery);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const db = getDb();
    const galleriesCollection = db.collection('galleries');

    const galleries = await galleriesCollection.find().toArray();
    const allImages = galleries.flatMap(gallery => gallery.images);

    res.status(200).send(allImages);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).send();
    }
    res.status(200).send(gallery);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const db = getDb();
    const galleriesCollection = db.collection('galleries');

    const result = await galleriesCollection.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).send();
    }

    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};


