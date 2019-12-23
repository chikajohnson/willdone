const Joi = require('joi');
const randomString = require('randomstring');
const mongoose = require("mongoose");

const pastoralTeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    title: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    },
    phoneNumber: {
        type: String,
        minlength: 6,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
    },
    parish: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
    },
    disabled: {
        type: Boolean,
        default: false
    }
});


pastoralTeamSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

pastoralTeamSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ disabled: true });
    next();
});

const PastoralTeam = mongoose.model("pastoralTeam", pastoralTeamSchema);

function validatePastoralTeam(pastoralTeam) {
    const schema = {
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        title: Joi.string()
            .min(3)
            .max(100),
        phoneNumber: Joi.string()
            .min(6)
            .max(20),
        email: Joi.string()
            .email()
            .required(),
        parish: Joi.string()
            .required(),
        category: Joi.string()
            .required(),
        disabled: Joi.boolean()
    };

    return Joi.validate(pastoralTeam, schema, { allowUnknown: true });
}

function isValidObjectId(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) === true;
}

exports.PastoralTeam = PastoralTeam;
exports.validate = validatePastoralTeam;
exports.isValidObjectId = isValidObjectId;
