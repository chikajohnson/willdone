const Joi = require('joi');
const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SchoolTypes',
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Countries',
        required: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'States',
    },
    color: {
        primary: {
            type: String,
        },
        secondary: {
            type: String,
        }
    },
    setting: new mongoose.Schema({
        ca: {
            type: Number,
            required: true
        },
        examScore: {
            type: Number,
            required: true
        },
        passMark: {
            type: Number,
            required: true
        },
        showResultPosition: {
            type: Boolean,
            required: true,
            default: false
        },
        enableRollNoForStudents: {
            type: Boolean,
            required: true,
            default: false
        }
    })
});

const School = mongoose.model('schools', schoolSchema);

function validateSchool(school) {
    const schema = {
        name: Joi.string().required(),
        code: Joi.string().max(10).required(),
        type: Joi.string().required(),
        phoneNumber: Joi.number().required(),
        email: Joi.string().required(),
        website: Joi.string(),
        address: Joi.string().required(),
        photograph: Joi.string(),
        state: Joi.string(),
        country: Joi.string().required(),
        color: Joi.object({
            primary: Joi.string(),
            secondary: Joi.string()
        }),
        setting: Joi.object({
            ca: Joi.number().required(),
            examScore: Joi.number().required(),
            passMark: Joi.number().required(),
            showResultPosition: Joi.bool().required(),
            enableRollNoForStudents: Joi.bool().required()
        })
    };

    return Joi.validate(school, schema, { allowUnknown: true });
}

exports.schoolSchema = schoolSchema;
exports.School = School;
exports.validate = validateSchool;