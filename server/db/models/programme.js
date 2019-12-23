const Joi = require('joi');
const mongoose = require("mongoose");

const programmeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    isPeriodic: {
        type: Boolean,
        required: true,
        default: false
    },
    start: {
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: true
    },
    language: {
        type: String,
        required: true,
        default: "English"
    },
    officiatedBy: {
        type: String,
        required: true
    },
    parish: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    disabled: {
        type: Boolean,
        default: false
    }
});


programmeSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

programmeSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ disabled: true });
    next();
});

const Programme = mongoose.model("programme", programmeSchema);

function validateProgramme(programme) {
    const schema = {
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        isPeriodic: Joi.bool(),
        start: Joi.date()
            .required(),
        end: Joi.date()
            .required(),
        language: Joi.string(),
        officiatedBy: Joi.string()
            .required(),
        parish: Joi.string()
            .required(),
        description: Joi.string()
            .min(10)
            .required(),
        disabled: Joi.boolean(),
        diocese: Joi.string().required()
    };

    return Joi.validate(programme, schema, { allowUnknown: true });
}

function isValidObjectId(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) === true;
}

exports.Programme = Programme;
exports.validate = validateProgramme;
exports.isValidObjectId = isValidObjectId;
