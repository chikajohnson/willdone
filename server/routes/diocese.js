const express = require('express');
const dioceseController = require('../controllers/dioceseController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
//router.use(authController.protect);

//router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(dioceseController.getAllDiocese)
  .post(dioceseController.createDiocese);

router
  .route('/:id')
  .get(dioceseController.getDiocese)
  .patch(dioceseController.updateDiocese)
  .delete(dioceseController.deleteDiocese);

module.exports = router;
