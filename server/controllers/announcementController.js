
const Announcement = require('../db/models/announcement');
const factory = require('./handlerFactory');

exports.createAnnouncement = factory.createOne(Announcement);

exports.getAnnouncement = factory.getOne(Announcement);
exports.getAllAnnouncement = factory.getAll(Announcement);
exports.updateAnnouncement = factory.updateOne(Announcement);
exports.deleteAnnouncement = factory.deleteOne(Announcement);
