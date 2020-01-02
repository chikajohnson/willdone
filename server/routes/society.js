const express = require('express');
const societyController = require('../controllers/societyController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
//router.use(authController.protect);

//router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(societyController.getAllSociety)
  .post(societyController.createSociety);

router
  .route('/:id')
  .get(societyController.getSociety)
  .patch(societyController.updateSociety)
  .delete(societyController.deleteSociety);

module.exports = router;
