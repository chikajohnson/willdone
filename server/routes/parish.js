const _ = require("lodash");
const { Parish, validate, isValidObjectId } = require("../db/models/parish");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
    });

    let parish = await Parish.findOne({ name: new RegExp(`^${req.body.name}$`, 'i') });
    if (parish) return res.status(400).json({
        status: 'error',
        message: `Parish '${req.body.name.toUpperCase()}' has already been created.`,
    });

    parish = new Parish(req.body);
    await parish.save();

    res.status(201).json({
        status: 'success',
        message: "Parish successfully created"
    });
});

router.get("/", async (req, res) => {
    const parishes = await Parish.find().sort("name");
    res.status(201).json({
        status: 'success',
        count: parishes.length,
        data: parishes
    });
});


router.get("/", async (req, res) => {
    const parishes = await Parish.find().sort("name");
    res.status(201).json({
        status: 'success',
        count: parishes.length,
        data: parishes
    });
});

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
    });

    if (!isValidObjectId(req.params.id)) return res.status(400).json({ status: 'error', message: "invalid parish id supplied" });

    const parish = await Parish.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            emails: req.body.emails,
            phoneNumbers: req.body.phoneNumbers,
            address: req.body.description,
            postalAddress: req.body.postalAddress,
            website: req.body.website,
            logo: req.body.logo,
            pictures: req.body.pictures,
            slogan: req.body.slogan,
            accountNo: req.body.accountNo,
            feastDay: req.body.feastDay,
            patronSaint: req.body.patronSaint,
            parishDay: req.body.parishDay,
            missionStatement: req.body.missionStatement,
            latitude: req.body.latitude,
            longititude: req.body.longititude,
            town: req.body.town,
            state: req.body.state,
            denary: req.body.denary,
            diocese: req.body.diocese,
            disabled: req.body.diocese
        },
        { new: true }
    );

    if (!parish)
        return res.status(404).json({ status: "error", message: "The parish with the given ID was not found." });
    delete parish.password
    res.status(201).json({
        status: 'success',
        message: "Parish successfully updated",
        data: parish
    });
});

router.delete("/:id", async (req, res) => {
    if (!isValidObjectId(req.params.id)) return res.status(400).json({ status: 'error', message: "invalid parish id supplied" });
    const parish = await Parish.findByIdAndRemove(req.params.id);

    if (!parish)
        return res.status(404).json({ status: 'error', message: "invalid parish id supplied" });

    res.send(parish);
});

router.get("/:id", async (req, res) => {

    if (!isValidObjectId(req.params.id)) return res.status(400).json({ status: 'error', message: "invalid parish id supplied" });
    const parish = await Parish.findById(req.params.id).select("-__v");

    if (!parish)
        return res.status(404).json({ status: 'error', message: "invalid parish id supplied" });
    res.send(parish);
});


module.exports = router;
