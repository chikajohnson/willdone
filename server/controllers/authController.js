const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { User, validate } = require('../db/models/user');
const catchAsync = require('../utility/catchAsync');
const Gmailer = require('../utility/gmailer');

const signToken = ({ id, }) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newUser = {
    title: req.body.title,
    lastName: req.body.lastName,
    firsName: req.body.firsName,
    otherNames: req.body.otherNames,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    phoneNumber: req.body.phoneNumber,
    gender: req.body.gender,
    parish: req.body.parish,
    station: req.body.station,
    diocese: req.body.diocese
  };


  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send(`User with email ${req.body.email} already exists.`);

  user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (user) return res.status(400).send(`User with phonenumber ${req.body.phoneNumber} already exists.`);

  user = new User(newUser);
  await user.save();

  createSendToken(user, 201, req, res);
});

