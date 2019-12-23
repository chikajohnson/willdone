const _ = require("lodash");
const { Deanary, validate, isValidObjectId } = require("../db/models/denary");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
    });

    let deanary = await Deanary.findOne({ name: new RegExp(`^${req.body.name}$`, 'i')});
    if (deanary) return res.status(400).json({
        status: 'error',
        message: `Deanary '${req.body.name.toUpperCase()}' has already been created.`,
    });
    
    deanary = new Deanary(req.body);
    await deanary.save();

    res.status(201).json({
        status: 'success',
        message: "Deanary successfully created"
    });
});

router.get("/", async (req, res) => {
    const deanarys = await Deanary.find().sort("name");
    res.status(201).json({
        status: 'success',
        count: deanarys.length,
        data: deanarys
    });
});


router.get("/", async (req, res) => {
    const deanarys = await Deanary.find().sort("name");
    res.status(201).json({
        status: 'success',
        count: deanarys.length,
        data: deanarys
    });
});

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
    });

    if (!isValidObjectId(req.params.id)) return res.status(400).json({ status: 'error', message: "invalid deanary id supplied" });

    const deanary = await Deanary.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description
        },
        { new: true }
    );

    if (!deanary)
        return res.status(404).json({ status: "error", message: "The deanary with the given ID was not found." });
    delete deanary.password
    res.status(201).json({
        status: 'success',
        message: "Deanary successfully updated",
        data: deanary
    });
});

router.delete("/:id", async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).json({ status: 'error', message: "invalid deanary id supplied" });
    const deanary = await Deanary.findByIdAndRemove(req.params.id);

    if (!deanary)
        return res.status(404).json({ status: 'error', message: "invalid deanary id supplied" });

    res.send(deanary);
});

router.get("/:id", async (req, res) => {

    if (!isValidObjectId(req.params.id)) return res.status(400).json({ status: 'error', message: "invalid deanary id supplied" });
    const deanary = await Deanary.findById(req.params.id).select("-__v");

    if (!deanary)
        return res.status(404).json({ status: 'error', message: "invalid deanary id supplied" });
    res.send(deanary);
});


module.exports = router;
