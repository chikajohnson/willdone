
const Parish = require('../db/models/parish');
const factory = require('./handlerFactory');

exports.createParish = factory.createOne(Parish);

exports.getParish = factory.getOne(Parish);
exports.getAllParish = factory.getAll(Parish);
exports.updateParish = factory.updateOne(Parish);
exports.deleteParish = factory.deleteOne(Parish);
