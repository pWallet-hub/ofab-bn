// routes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/api/v1/signup', authController.signup);
router.post('/api/v1/login', authController.login);

module.exports = router;