const { SchoolType, validate} = require("../db/models/schoolType");
const validateObjectId = require('../middleware/validateObjectId');
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const schoolTypes = await SchoolType.find().sort("name");
  res.send(schoolTypes);
});

router.post("/",  async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if school type already exists
  const schoolTypeExisits = await SchoolType.findOne({name: req.body.name});
  if(schoolTypeExisits)   return res.status(400).send(`SchoolType '${req.body.name}' already exists`);

  const schoolType = new SchoolType({
    name: req.body.name,
    description: req.body.description,
  });
  await schoolType.save();
  res.send(schoolType);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const schoolType = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description
    },
    { new: true }
  );

  if (!schoolType)
    return res.status(404).send("The schoolType with the given ID was not found.");

  res.send(schoolType);
});

router.delete("/:id",  async (req, res) => {
  const schoolType = await SchoolType.findByIdAndRemove(req.params.id);

  if (!schoolType)
    return res.status(404).send("The schoolType with the given ID was not found.");

  res.send(schoolType);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const schoolType = await SchoolType.findById(req.params.id).select("-__v");

  if (!schoolType)
    return res.status(404).send("The schoolType with the given ID was not found.");
  res.send(schoolType);
});

module.exports = router;
