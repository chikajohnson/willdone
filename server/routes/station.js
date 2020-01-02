const express = require('express');
const stationController = require('../controllers/stationController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
//router.use(authController.protect);

//router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(stationController.getAllStation)
  .post(stationController.createStation);

router
  .route('/:id')
  .get(stationController.getStation)
  .patch(stationController.updateStation)
  .delete(stationController.deleteStation);

module.exports = router;
