// routes.js
const express = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const teamController = require('../controllers/teamController');
const galleryController = require('../controllers/galleryController');
const successController = require('../controllers/successController');
const capacityController = require('../controllers/capacityBuildingController');
const upload = require('../middlewires/upload');

const router = express.Router();

router.post('/api/v1/signup', authController.signup);
router.post('/api/v1/login', authController.login);

router.post('/api/v1/posts', upload.fields([{ name: 'mainPhoto', maxCount: 1 }, { name: 'otherPhotos', maxCount: 10 }]), postController.create);
router.put('/api/v1/posts/:id', postController.update);
router.get('/api/v1/posts/:id', postController.get);
router.get('/api/v1/posts', postController.getAll);
router.delete('/api/v1/posts/:id', postController.delete);


router.post('/api/v1/teams', upload.single('picture'), teamController.create);
router.get('/api/v1/teams', teamController.getAll);
router.get('/api/v1/teams/:id', teamController.getOne);
router.put('/api/v1/teams/:id', teamController.update);
router.delete('/api/v1/teams/:id', teamController.delete);

router.post('/api/v1/galleries', upload.single('images'), galleryController.create);
router.get('/api/v1/galleries', galleryController.getAll);
router.get('/api/v1/galleries/:id', galleryController.getOne);
router.delete('/api/v1/galleries/:id', galleryController.delete);

router.post('/api/v1/success-stories', upload.single('image'), successController.create);
router.get('/api/v1/success-stories', successController.getAll);

router.post('/api/v1/capacity',upload.fields([{ name: 'image', maxCount: 10 }, { name: 'cover', maxCount: 10 }]),capacityController.create);
router.get('/api/v1/capacity', capacityController.getAll);
router.get('/api/v1/capacity/:_id', capacityController.getOne);
router.delete('/api/v1/capacity/:_id', capacityController.delete);



module.exports = router;