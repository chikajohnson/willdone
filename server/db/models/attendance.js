const Joi = require('joi');
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
    },
    parish: {
        type: String,
        required: true
    },
    officiatedBy: {
        type: String,
    },
    eventDate: {
        type: Date,
        required: true
    },
    men: {
        type: Number,
        required: true
    },
    women: {
        type: Number,
        required: true
    },
    boys: {
        type: Number,
        required: true
    },
    girls: {
        type: Number,
        required: true
    },
    children: {
        type: Number,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
});


attendanceSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

attendanceSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ disabled: true });
    next();
});

const Attendance = mongoose.model("attendance", attendanceSchema);

function validateAttendance(attendance) {
    const schema = {
        title: Joi.string()
            .min(5)
            .max(50)
            .required(),
        type: Joi.string()
            .required(),
        description: Joi.string()
            .required(),
        parish: Joi.string()
            .required(),
        officiatedBy: Joi.string()
            .required(),
        eventDate: Joi.date()
            .required(),
        men: Joi.number()
            .required(),
        women: Joi.number()
            .required(),
        boys: Joi.number()
            .required(),
        girls: Joi.number()
            .required(),
        children: Joi.number()
            .required()
    };

    return Joi.validate(attendance, schema, { allowUnknown: true });
}

function isValidObjectId(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) === true;
}

exports.Attendance = Attendance;
exports.validate = validateAttendance;
exports.isValidObjectId = isValidObjectId;
