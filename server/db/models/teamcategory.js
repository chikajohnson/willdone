const Joi = require('joi');
const randomString = require('randomstring');
const mongoose = require("mongoose");

const teamCategorySchema = new mongoose.Schema({
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


teamCategorySchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

teamCategorySchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ disabled: true });
    next();
});

const TeamCategory = mongoose.model("teamCategory", teamCategorySchema);

function validateTeamCategory(teamCategory) {
    const schema = {
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        description: Joi.string()
            .required(),
        disabled: Joi.boolean()
    };

    return Joi.validate(teamCategory, schema, { allowUnknown: true });
}

function isValidObjectId(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) === true;
}

exports.TeamCategory = TeamCategory;
exports.validate = validateTeamCategory;
exports.isValidObjectId = isValidObjectId;
