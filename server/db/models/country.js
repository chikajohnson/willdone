const Joi = require('joi');
const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    code: {
        type: String,
        required: true,
        maxlength: 5,
        unique: true
    },
    states: [new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        code: {
            type: String,
            required: true,
            maxlength: 5,
            unique: true
        }
    })]
});

const Country = mongoose.model('Countries', countrySchema);

function validateCountry(country) {
    const schema = {
        name: Joi.string().required(),
        code: Joi.string().max(4).required(),
        states:Joi.array().required(false)
    };

    return Joi.validate(country, schema, {allowUnknown: true});
}

exports.countrySchema = countrySchema;
exports.Country = Country;
exports.validate = validateCountry;