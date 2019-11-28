const { Country, validate} = require("../db/models/country");
const validateObjectId = require('../middleware/validateObjectId');
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const countries = await Country.find()
    .sort("name");
  res.send(countries);
});

router.post("/",  async (req, res) => {

  console.log(req.body)
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if coutry name or code already exists
  const nameExisits = await Country.findOne({name: req.body.name});
  if(nameExisits)   return res.status(400).send(`country ${req.body.name} already exists`);

  
  const country = new Country({
    name: req.body.name,
    code: req.body.code,
    states: req.body.states
  });
   await country.save();
  res.send(country);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const country = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      states: req.body.states
    },
    { new: true }
  );

  if (!country)
    return res.status(404).send("The country with the given ID was not found.");

  res.send(country);
});

router.delete("/:id",  async (req, res) => {
  const country = await Country.findByIdAndRemove(req.params.id);

  if (!country)
    return res.status(404).send("The country with the given ID was not found.");

  res.send(country);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const country = await Country.findById(req.params.id).select("-__v");

  if (!country)
    return res.status(404).send("The country with the given ID was not found.");
  res.send(country);
});

module.exports = router;
