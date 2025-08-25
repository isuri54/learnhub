const express = require("express");
const Group = require("../models/group");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const {userId} = req.query;
        const groups = await Group.find({
            $or: [{ createdBy: userId }, { members: userId }],
        });
        res.json(groups);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, userId } = req.body;
        const newGroup = new Group ({
            name,
            createdBy: userId,
            members: [userId],
        });
        await newGroup.save();
        res.json(newGroup);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;