
const ParishSociety = require('../db/models/parishsociety');
const factory = require('./handlerFactory');

exports.createParishSociety = factory.createOne(ParishSociety);

exports.getParishSociety = factory.getOne(ParishSociety);
exports.getAllParishSocieties = factory.getAll(ParishSociety);
exports.updateParishSociety = factory.updateOne(ParishSociety);
exports.deleteParishSociety = factory.deleteOne(ParishSociety);
