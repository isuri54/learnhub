const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const MessageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    text: String,
    timestamp: {type: Date, default: Date.now},
});

const Message = mongoose.model("Message", MessageSchema);

router.get("/:userId/:receiverId", async (req, res) => {
    const {userId, receiverId} = req.params;
    try {
        const messages = await Message.find({
            $or: [
                {sender: userId, receiver: receiverId},
                {sender: receiverId, receiver: userId},
            ],
        }).sort({timestamp: 1});
        res.json(messages);
    } catch (err) {
        res.status(500).send("Server error");
    }
});

module.exports = router;