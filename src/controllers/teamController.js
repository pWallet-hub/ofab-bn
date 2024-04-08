// controllers/teamController.js
const { getDb } = require('../../db');  
const team = require('../models/team');
const cloudinary = require('cloudinary').v2;

exports.create = async (req, res) => {
  try {
    const db = getDb();
    const teamsCollection = db.collection('teams');

    const pictureResult = await cloudinary.uploader.upload(req.file.path);

    const teamMember = {
      name: req.body.name,
      role: req.body.role,
      description: req.body.description,
      picture: pictureResult.secure_url, // this is the link to the picture stored in Cloudinary
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await teamsCollection.insertOne(teamMember);
    res.status(201).send(teamMember);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const db = getDb();
    const teamsCollection = db.collection('teams');

    const teams = await teamsCollection.find().toArray();
    res.status(200).send(teams);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const db = getDb();
    const teamsCollection = db.collection('teams');

    const team = await teamsCollection.findOne({ _id: new mongodb.ObjectId(req.params.id) });
    if (!team) {
      return res.status(404).send();
    }
    res.status(200).send(team);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const db = getDb();
    const teamsCollection = db.collection('teams');

    const result = await teamsCollection.updateOne({ _id: new mongodb.ObjectId(req.params.id) }, { $set: req.body });
    if (result.matchedCount === 0) {
      return res.status(404).send();
    }
    const updatedTeam = await teamsCollection.findOne({ _id: new mongodb.ObjectId(req.params.id) });
    res.status(200).send(updatedTeam);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const db = getDb();
    const teamsCollection = db.collection('teams');

    const result = await teamsCollection.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).send();
    }
    res.status(200).send({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};