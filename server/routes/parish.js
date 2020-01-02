const express = require('express');
const parishController = require('../controllers/parishController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
//router.use(authController.protect);

//router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(parishController.getAllParish)
  .post(parishController.createParish);

router
  .route('/:id')
  .get(parishController.getParish)
  .patch(parishController.updateParish)
  .delete(parishController.deleteParish);

module.exports = router;
