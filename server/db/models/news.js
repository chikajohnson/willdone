const Joi = require('joi');
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    narration: {
        type: String,
        required: true,
        minlength: 10,
    },
    isAnnouncement: {
        type: Boolean,
        required: true,
        default: false
    },
    source: {
        type: String
    },
    start: {
        type: Date
    },

    end: {
        type: Date
    },
    media: {
        type: String
    },
    parish: {
        type: String,
        required: true
    },

    disabled: {
        type: Boolean,
        default: false
    }
});


newsSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

newsSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ disabled: true });
    next();
});

const News = mongoose.model("news", newsSchema);

function validateNews(news) {
    const schema = {
        title: Joi.string()
            .min(2)
            .max(50)
            .required(),
        narration: Joi.string()
            .min(10)
            .required(),
        isAnnouncement: Joi.bool(),
        source: Joi.string(),
        start: Joi.date(),
        end: Joi.date(),
        media: Joi.string(),
        parish: Joi.string()
            .required(),

        disabled: Joi.boolean()
    };

    return Joi.validate(news, schema, { allowUnknown: true });
}

function isValidObjectId(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) === true;
}

exports.News = News;
exports.validate = validateNews;
exports.isValidObjectId = isValidObjectId;
