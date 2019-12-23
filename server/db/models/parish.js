const Joi = require('joi');
const randomString = require('randomstring');
const mongoose = require("mongoose");

const parishSchema = new mongoose.Schema({
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
    emails: [String],
    phoneNumbers: [String],
    address: {
        type: String,
        required: true
    },
    postalAddress: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
    pictures: [String],
    slogan: {
        type: String,
        required: false,
        minlength: 2,
        maxlength: 100
    },
    orderInCharge: {
        type: String,
        required: false
    },
    accountNo: {
        type: Number,
        required: false
    },
    feastDay: {
        type: String,
        required: false
    },
    patronSaint: {
        type: String,
        required: false
    },
    parishDay: {
        type: String,
        required: false
    },
    missionStatement: {
        type: String,
        required: false
    },
    latitude: {
        type: Number,
        required: true
    },
    longititude: {
        type: Number,
        required: true
    },
    town: {
        type: String,
        required: false
    },
    state: {
        type: String
    },
    denary: {
        type: String,
        required: true
    },
    diocese: {
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


parishSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

parishSchema.pre('save', function (next) {
    if (this.name && this.isNew) {
        this.code = this.name.substring(0, 3).toUpperCase() + "-" + randomString.generate({ length: 6, charset: 'alphabetic' }).toUpperCase();
    }
    next();
});

parishSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ disabled: true });
    next();
});

const Parish = mongoose.model("parish", parishSchema);

function validateParish(parish) {
    const schema = {
        name: Joi.string().required().min(3),
        code: Joi.string().min(3),
        emails: Joi.array().required(),
        phoneNumbers: Joi.array().required(),
        address: Joi.string().required(),
        postalAddress: Joi.string(),
        website: Joi.string(),
        logo: Joi.string(),
        pictures: Joi.array().required(),
        slogan:  Joi.string(),
        orderInCharge: Joi.string(),
        accountNo: Joi.number(),
        feastDay:Joi.string(),
        patronSaint: Joi.string(),
        parishDay: Joi.string(),
        missionStatement: Joi.string(),
        latitude: Joi.number(),
        longititude: Joi.number(),
        town: Joi.string(),
        state: Joi.string().required(),
        denary: Joi.string().required(),
        diocese: Joi.string().required(),
        description: Joi.string().required().min(10),
        disabled: Joi.bool().required().default(false)
    };

    return Joi.validate(parish, schema, { allowUnknown: true });
}

function isValidObjectId(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) === true;
}

exports.Parish = Parish;
exports.validate = validateParish;
exports.isValidObjectId = isValidObjectId;
