const randomString = require('randomstring');
const mongoose = require("mongoose");

const dioceseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minlength: 2,
        maxlength: 50,
        unique: true
    },
    code: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    state: {
        type: String,
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
    province: {
        type: String,
        required: [true, "province is required"],
    },
    description: {
        type: String,
        required: [true, "Provide a brief profile of this diocesse"],
        minlength: 10,
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
    console.log(this);
    //this.find({ active: true });
    next();
});

const Diocese = mongoose.model("Diocese", dioceseSchema);



module.exports = Diocese;