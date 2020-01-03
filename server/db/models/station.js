const randomString = require('randomstring');
const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "station name is required"]
    },
    code: {
        type: String
    },
    parish: {
        type: String
    },
    emails: [String],
    phoneNumbers: [String],
    address: {
        type: String,
        required: [true, "station address is required"]
    },
    logo: {
        type: String,
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
    latitude: {
        type: Number,
        required: false
    },
    longititude: {
        type: Number,
        required: false
    },
    town: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    active: {
        type: Boolean,
        default: true
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });


stationSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

stationSchema.pre('save', function (next) {
    if (this.name && this.isNew) {
        this.code = this.name.substring(0, 3).toUpperCase() + "-" + randomString.generate({ length: 6, charset: 'alphabetic' }).toUpperCase();
    }
    next();
});

stationSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ active: true });
    next();
});

const Station = mongoose.model("Station", stationSchema);

module.exports = Station;