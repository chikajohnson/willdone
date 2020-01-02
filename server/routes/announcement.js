const express = require('express');
const announcementController = require('../controllers/announcementController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
//router.use(authController.protect);

//router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(announcementController.getAllAnnouncement)
  .post(announcementController.createAnnouncement);

router
  .route('/:id')
  .get(announcementController.getAnnouncement)
  .patch(announcementController.updateAnnouncement)
  .delete(announcementController.deleteAnnouncement);

module.exports = router;
