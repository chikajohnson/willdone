const Joi = require('joi');
const mongoose = require('mongoose');

const schoolTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {timestamps: true});

const SchoolType = mongoose.model('SchoolTypes', schoolTypeSchema);

function validateSchoolType(type) {
  const schema = {
    name: Joi.string().required(),
    description: Joi.string().required()
  };

  return Joi.validate(type, schema);
}

exports.schoolTypeSchema = schoolTypeSchema;
exports.SchoolType = SchoolType; 
exports.validate = validateSchoolType;