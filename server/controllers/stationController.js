
const Station = require('../db/models/station');
const factory = require('./handlerFactory');

exports.createStation = factory.createOne(Station);

exports.getStation = factory.getOne(Station);
exports.getAllStation = factory.getAll(Station);
exports.updateStation = factory.updateOne(Station);
exports.deleteStation = factory.deleteOne(Station);
