const { School, validate} = require("../db/models/school");
const validateObjectId = require('../middleware/validateObjectId');
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const schools = await School.find().sort("name");
  res.send(schools);
});

router.post("/",  async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if school already exists
  const schoolExisits = await School.findOne({email: req.body.email});
  console.log(schoolExisits);
  if(schoolExisits)   return res.status(400).send(`School with email '${req.body.email}' already exists`);

  const school = new School({
    name: req.body.name,   
    code:req.body.code,
    type:req.body.type,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    website: req.body.website,
    address: req.body.address,
    photograph: req.body.photograph,
    state: req.body.state,
    country: req.body.country,
    color:req.body.color,
    setting: req.body.setting
  });
  await school.save();
  res.send(school);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const school = await Movie.findByIdAndUpdate(
    req.params.id, {
      name: req.body.name,   
      type:req.body.type,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      website: req.body.website,
      address: req.body.address,
      photograph: req.body.photograph,
      state: req.body.state,
      country: req.body.country,
      color:req.body.color,
      setting: req.body.setting
    }, {
      new: true
    }
  );

  if (!school)
    return res.status(404).send("The school with the given ID was not found.");

  res.send(school);
});

router.delete("/:id",  async (req, res) => {
  const school = await School.findByIdAndRemove(req.params.id);

  if (!school)
    return res.status(404).send("The school with the given ID was not found.");

  res.send(school);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const school = await School.findById(req.params.id).select("-__v");

  if (!school)
    return res.status(404).send("The school with the given ID was not found.");
  res.send(school);
});

module.exports = router;
