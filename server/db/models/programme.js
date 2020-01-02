const mongoose = require("mongoose");

const programmeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "programme name is required"]
    },
    isPeriodic: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        enum: ["diocese", "parish, society"],
        default: "parish"
    },
    start: {
        type: Date,
        required: [true, "start time is required"]
    },

    end: {
        type: Date,
        required: [true, "specify when the programme ends"]
    },
    attendance: {
        men: {
            type: Number,
            default: 0
        },
        women: {
            type: Number,
            default: 0
        },
        boys: {
            type: Number,
            default: 0
        },
        girls: {
            type: Number,
            default: 0
        },
        children: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        }
    },
    language: {
        type: String,
        default: "English"
    },
    officiatedBy: {
        type: String,
        required: false
    },
    parish: {
        type: String,
        required: [true, "parish is required"]
    },
   society:{
    type: String
   },
    description: {
        type: String,
        required: [true, "briefly describe this programme"],
    },
    active: {
        type: Boolean,
        default: true
    }
});


programmeSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

programmeSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ active: true });
    next();
});

const Programme = mongoose.model("Programme", programmeSchema);

module.exports = Programme;
