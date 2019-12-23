const Joi = require('joi');
const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    description: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
});


societySchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

societySchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ disabled: true });
    next();
});

const Society = mongoose.model("society", societySchema);

function validateSociety(society) {
    const schema = {
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        description: Joi.string()
            .required(),
        disabled: Joi.boolean()
    };

    return Joi.validate(society, schema, { allowUnknown: true });
}

function isValidObjectId(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) === true;
}

exports.Society = Society;
exports.validate = validateSociety;
exports.isValidObjectId = isValidObjectId;
