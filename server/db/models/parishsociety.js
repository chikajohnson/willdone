const mongoose = require("mongoose");

const parishSocietySchema = new mongoose.Schema({
    society: {
        type: String,
        required:  [true, "society is required"]
    },
    parish: {
        type: String,
        required: true
    },
    type:{ //wheteher parish or station
        type: String,
        default: "parish",
        enum: ["parish", "staion"]
    },
    station: {
        type: String,
    },
    diocese: {
        type: String,
        required:  [true, "diocesse is required"]
    },
    meeting: [
        {
            name: String,
            start: Number,
            end: Number,
            day: String,
            venue: String,
            duration: Number
        }
    ],
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
},
{
  toJSON: {virtuals : true},
  toObject: {virtuals : true}
});


parishSocietySchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

parishSocietySchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ active: true });
    next();
});

const ParishSociety = mongoose.model("ParishSociety", parishSocietySchema);


module.exports = ParishSociety;
