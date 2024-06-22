const { getDb } = require('../../db');
const Post = require('../models/post');
const mongodb = require('mongodb');
const cloudinary = require('cloudinary').v2;


//COMMENT


exports.create = async (req, res) => {
  try {
    const db = getDb();
    const postsCollection = db.collection('posts');

    const mainPhotoResult = await cloudinary.uploader.upload(req.files.mainPhoto[0].path);
    //const otherPhotoResults = await Promise.all(req.files.otherPhotos.map(file => cloudinary.uploader.upload(file.path)));

    const post = new Post({
      title: req.body.title,
      author: req.body.author,
      publicationDate: req.body.publicationDate,
      link: req.body.link,
      activitySource: req.body.activitySource,
      articleSummary: req.body.articleSummary,
      mainPhoto: mainPhotoResult.secure_url,
    });

    await postsCollection.insertOne(post);
    console.log('Post created:', post);
    res.status(201).send(post);
  } catch (error) {
    console.log('Error message:', error.message);
    console.log('Error stack:', error.stack);
    res.status(500).send({ error: 'An error occurred while creating the post.' });
  }
};


exports.update = async (req, res) => {
  try {
    const db = getDb();
    const postsCollection = db.collection('posts');

    const post = await postsCollection.findOne({ _id: new mongodb.ObjectId(req.params.id) });
    if (!post) {
      return res.status(404).send();
    }

    await postsCollection.updateOne({ _id: new mongodb.ObjectId(req.params.id) }, { $set: req.body });

    const updatedPost = await postsCollection.findOne({ _id: new mongodb.ObjectId(req.params.id) });

    res.send(updatedPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.get = async (req, res) => {
  try {
    const db = getDb();
    const postsCollection = db.collection('posts');

    const post = await postsCollection.findOne({ _id: new mongodb.ObjectId(req.params.id) });

    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const db = getDb();
    const postsCollection = db.collection('posts');

    const posts = await postsCollection.find({}).toArray();
    res.send(posts);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const db = getDb();
    const postsCollection = db.collection('posts');

    const result = await postsCollection.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).send();
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};