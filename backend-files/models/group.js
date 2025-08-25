const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastActivity: { type: String, default: ""},
}, {timestamps: true});

module.exports = mongoose.model("Group", groupSchema);