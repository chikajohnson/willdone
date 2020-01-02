const express = require('express');
const programmeController = require('../controllers/programmeController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
//router.use(authController.protect);

//router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(programmeController.getAllProgramme)
  .post(programmeController.createProgramme);

router
  .route('/:id')
  .get(programmeController.getProgramme)
  .patch(programmeController.updateProgramme)
  .delete(programmeController.deleteProgramme);

module.exports = router;
