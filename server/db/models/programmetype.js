const Joi = require('joi');
const mongoose = require("mongoose");

const programmeTypeSchema = new mongoose.Schema({
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


programmeTypeSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

programmeTypeSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ disabled: true });
    next();
});

const ProgrammeType = mongoose.model("programmeType", programmeTypeSchema);

function validateProgrammeType(programmeType) {
    const schema = {
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        description: Joi.string()
            .required(),
        disabled: Joi.boolean()
    };

    return Joi.validate(programmeType, schema, { allowUnknown: true });
}

function isValidObjectId(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) === true;
}

exports.ProgrammeType = ProgrammeType;
exports.validate = validateProgrammeType;
exports.isValidObjectId = isValidObjectId;
