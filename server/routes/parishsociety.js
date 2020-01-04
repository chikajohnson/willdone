const express = require('express');
const parishSocietyController = require('../controllers/parishSocietyController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
//router.use(authController.protect);

//router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(parishSocietyController.getAllParishSocieties)
  .post(parishSocietyController.createParishSociety);

router
  .route('/:id')
  .get(parishSocietyController.getParishSociety)
  .patch(parishSocietyController.getParishSociety)
  .delete(parishSocietyController.deleteParishSociety);

module.exports = router;
