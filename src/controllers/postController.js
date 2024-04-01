// controllers/PostController.js
const { getDb } = require('../../db');
const Post = require('../models/post');
const mongodb = require('mongodb');


exports.create = async (req, res) => {
  try {
    const db = getDb();
    const postsCollection = db.collection('posts');

    const post = new Post(req.body);
    await postsCollection.insertOne(post);
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
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

    const post = await postsCollection.aggregate([
      { $match: { _id: new mongodb.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: '$author' },
      { $project: { 'author.password': 0 } }
    ]).toArray();

    if (!post.length) {
      return res.status(404).send();
    }
    res.send(post[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const db = getDb();
    const postsCollection = db.collection('posts');

    const posts = await postsCollection.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: '$author' },
      { $project: { 'author.password': 0 } }
    ]).toArray();

    res.send(posts);
  } catch (error) {
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