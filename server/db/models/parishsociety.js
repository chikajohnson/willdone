const Joi = require('joi');
const mongoose = require("mongoose");

const parishSocietySchema = new mongoose.Schema({
    society: {
        type: String,
        required: true
    },
    parish: {
        type: String,
        required: true
    },
    meeting: {
        type: Object,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
});


parishSocietySchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

parishSocietySchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ disabled: true });
    next();
});

const ParishSociety = mongoose.model("parishSociety", parishSocietySchema);

function validateSociety(parishSociety) {
    const schema = {
        society: Joi.string()
            .required(),
        parish: Joi.string()
            .required(),
        meeting: Joi.object()
            .required(),
        disabled: Joi.boolean()
    };

    return Joi.validate(parishSociety, schema, { allowUnknown: true });
}

function isValidObjectId(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) === true;
}

exports.ParishSociety = ParishSociety;
exports.validate = validateSociety;
exports.isValidObjectId = isValidObjectId;
