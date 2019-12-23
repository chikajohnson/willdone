const crypto = require('crypto');
const Joi = require('joi');
const randomString = require('randomstring');
const mongoose = require("mongoose");

const denarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    code: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    diocese: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 128
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


denarySchema.pre('save', async function (next) {
    console.log("before save");    
    next();
});

denarySchema.pre('save', function (next) {
    if (this.name && this.isNew) {
        this.code = this.name.substring(0, 3).toUpperCase() + "-" + randomString.generate({length: 6, charset:'alphabetic'}).toUpperCase();
    }
    next();
});

denarySchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ disabled: true });
    next();
});

const Denary = mongoose.model("denary", denarySchema);

function validateDenary(denary) {
    const schema = {
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        code: Joi.string()
            .min(3)
            .max(50),
        description: Joi.string()
            .min(10)
            .required(),
        disabled: Joi.boolean(),
        diocese: Joi.string().required()
    };

    return Joi.validate(denary, schema, { allowUnknown: true });
}

function isValidObjectId(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) === true;
}

exports.Denary = Denary;
exports.validate = validateDenary;
exports.isValidObjectId = isValidObjectId;
