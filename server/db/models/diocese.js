const crypto = require('crypto');
const Joi = require('joi');
const randomString = require('randomstring');
const mongoose = require("mongoose");

const dioceseSchema = new mongoose.Schema({
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
    state: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 100
    },
    country: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    isArchDiocese: {
        type: Boolean,
        default: false
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


dioceseSchema.pre('save', async function (next) {
    console.log("before save");    
    next();
});

dioceseSchema.pre('save', function (next) {
    if (this.name && this.isNew) {
        this.code = this.name.substring(0, 3).toUpperCase() + "-" + randomString.generate({length: 6, charset:'alphabetic'}).toUpperCase();
    }
    next();
});

dioceseSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ disabled: true });
    next();
});

const Diocese = mongoose.model("diocese", dioceseSchema);

function validateDiocese(diocese) {
    const schema = {
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        code: Joi.string()
            .min(3)
            .max(50),
        state: Joi.string()
            .min(3)
            .max(50)
            .required(),
        country: Joi.string().max(15).min(6).required(),
        description: Joi.string()
            .min(10)
            .required(),
        disabled: Joi.boolean(),
        isArchDiocese: Joi.boolean()
    };

    return Joi.validate(diocese, schema, { allowUnknown: true });
}

function isValidObjectId(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) === true;
}

exports.Diocese = Diocese;
exports.validate = validateDiocese;
exports.isValidObjectId = isValidObjectId;
