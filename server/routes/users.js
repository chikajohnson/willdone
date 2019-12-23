const auth = require("../middleware/auth");
const _ = require("lodash");
const { User, validate, isValidObjectId } = require("../db/models/user");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send(`User '${req.body.email}' already registered.`);

  user = new User(req.body);
  // console.log("body", user);

  await user.save();

  res.status(201).json({
    status: 'success',
    message: "User successfully created"
  });
});

router.get("/", async (req, res) => {
  const users = await User.find().sort("email");
  res.status(201).json({
    status: 'success',
    count: users.length,
    data: users
  });
});


router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!isValidObjectId(req.params.id)) return res.status(400).json({ status: 'error', message: "invalid user id supplied" });

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      otherNames: req.body.otherNames,
      title: req.body.title,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      photo: req.body.photo,
      parish: req.body.parish,
      station: req.body.station,
      diocessse: req.body.diocessse,
    },
    { new: true }
  );

  if (!user)
    return res.status(404).json({ status: "error", message: "The user with the given ID was not found." });
    delete user.password
  res.status(201).json({
    status: 'success',
    message: "User successfully updated",
    data: user
  });
});

router.delete("/:id", async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(400).json({ status: 'error', message: "invalid user id supplied" });
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).json({ status: 'error', message: "invalid user id supplied" });

  res.send(user);
});

router.get("/:id", async (req, res) => {

  if (!isValidObjectId(req.params.id)) return res.status(400).json({ status: 'error', message: "invalid user id supplied" });
  const user = await User.findById(req.params.id).select("-__v");

  if (!user)
    return res.status(404).json({ status: 'error', message: "invalid user id supplied" });
  res.send(user);
});


module.exports = router;
