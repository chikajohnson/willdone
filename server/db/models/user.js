const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  otherNames: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 100
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 15,
    unique: true
  },
  photo: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: true,
    enum: ["female", "male"],
  },
  placeOfBirth: {
    type: String,
    required: true,
  },
  parish: {
    type: String,
    required: true,
  },
  station: {
    type: String,
    required: false,
  },
  diocessse: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: false,
    select: false
  },
  type: {
    type: String,
    enum: ["clergy", "lay", "sponsor", "school", "admin", "globalAdmin"],
    default: "admin"
  }
});


userSchema.pre('save', async function (next) {
  console.log("about to save");

  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      type: this.type
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

userSchema.methods.generateActivationCode = function () {
  //generate 6 character random code
  const code = crypto.randomBytes(6).toString();
  return code;
};

const User = mongoose.model("users", userSchema);

function validateUser(user) {
  const schema = {
    title: Joi.string()
      .min(2)
      .max(50)
      .required(),
    firstName: Joi.string()
      .min(2)
      .max(50)
      .required(),
    lastName: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    phoneNumber: Joi.string().max(15).min(6).required(),
    placeOfBirth: Joi.string()
      .min(2)
      .max(50)
      .required(),
    parish: Joi.string()
      .min(2)
      .max(50)
      .required(),
    gender: Joi.string()
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
    // type: Joi.string().valid(["teacher", "student", "sponsor", "schoolAdmin", "admin", "globalAdmin"])

  };

  return Joi.validate(user, schema, { allowUnknown: true });
}

exports.User = User;
exports.validate = validateUser;
