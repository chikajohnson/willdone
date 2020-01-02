
const Programme = require('../db/models/programme');
const factory = require('./handlerFactory');

exports.createProgramme = factory.createOne(Programme);

exports.getProgramme = factory.getOne(Programme);
exports.getAllProgramme = factory.getAll(Programme);
exports.updateProgramme = factory.updateOne(Programme);
exports.deleteProgramme = factory.deleteOne(Programme);
