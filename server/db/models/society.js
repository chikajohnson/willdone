const mongoose = require("mongoose");
const modelObj  = require('./allModels');

const societySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "society name is required"]
    },
    description: {
        type: String,
        required: [true, "Describe this society"]
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


societySchema.pre('save', async function (next) {
    console.log("before save");
    next();
});

societySchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ active: true });
    next();
});

const Society = mongoose.model(modelObj.society, societySchema);

module.exports = Society;
