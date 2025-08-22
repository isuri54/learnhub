const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const UserSchema = new mongoose.Schema({
    name: String,
    avatar: String,
});

const User = mongoose.model("User", UserSchema);

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send("Server error");
    }
});

module.exports = router;