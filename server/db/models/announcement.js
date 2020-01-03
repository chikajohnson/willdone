const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    narration: {
        type: String,
        required: [true, "announcement narration is required"]
    },
    sourceType: {
        type: String,
        enum: ["diocese", "parish, society"],
        default: "parish"
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
        required: [true, "parish is required"]
    },

    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
    }
},
{
  toJSON: {virtuals : true},
  toObject: {virtuals : true}
});


announcementSchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

announcementSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ disabled: true });
    next();
});

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
