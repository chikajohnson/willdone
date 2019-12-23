const _ = require("lodash");
const { Diocese, validate, isValidObjectId } = require("../db/models/diocese");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
    });

    let diocese = await Diocese.findOne({ name: new RegExp(`^${req.body.name}$`, 'i')});
    if (diocese) return res.status(400).json({
        status: 'error',
        message: `Diocese '${req.body.name.toUpperCase()}' has already been created.`,
    });
    
    diocese = new Diocese(req.body);
    await diocese.save();

    res.status(201).json({
        status: 'success',
        message: "Diocese successfully created"
    });
});

router.get("/", async (req, res) => {
    const dioceses = await Diocese.find().sort("name");
    res.status(201).json({
        status: 'success',
        count: dioceses.length,
        data: dioceses
    });
});


router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
    });

    if (!isValidObjectId(req.params.id)) return res.status(400).json({ status: 'error', message: "invalid diocese id supplied" });

    const diocese = await Diocese.findByIdAndUpdate(
        req.params.id,
        {
            state: req.body.state,
            country: req.body.country,
            isArchDiocese: req.body.isArchDiocese,
            description: req.body.description
        },
        { new: true }
    );

    if (!diocese)
        return res.status(404).json({ status: "error", message: "The diocese with the given ID was not found." });
    delete diocese.password
    res.status(201).json({
        status: 'success',
        message: "Diocese successfully updated",
        data: diocese
    });
});

router.delete("/:id", async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).json({ status: 'error', message: "invalid diocese id supplied" });
    const diocese = await Diocese.findByIdAndRemove(req.params.id);

    if (!diocese)
        return res.status(404).json({ status: 'error', message: "invalid diocese id supplied" });

    res.send(diocese);
});

router.get("/:id", async (req, res) => {

    if (!isValidObjectId(req.params.id)) return res.status(400).json({ status: 'error', message: "invalid diocese id supplied" });
    const diocese = await Diocese.findById(req.params.id).select("-__v");

    if (!diocese)
        return res.status(404).json({ status: 'error', message: "invalid diocese id supplied" });
    res.send(diocese);
});


module.exports = router;
