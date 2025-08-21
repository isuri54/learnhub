const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const PostSchema = new mongoose.Schema({
    author: {type: String, required: true},
    content: {type: String, required: true},
    likes: {type: Number, default: 0},
    comments: {type: Number, default: 0},
}, {timestamps: true});

const Post = mongoose.model("Post", PostSchema);

router.get("/", async (res, req) => {
    try {
        const posts = await Post.find().sort({crearedAt : -1});
        res.json(posts);
    } catch (err) {
        res.status(500).send("Server error");
    }
});

router.post("/", async (req, res) => {
    try {
        const {author, content} = req.body;

        const newPost = new Post({author, content});
        await newPost.save();
        res.json(newPost);
    } catch (err) {
        res.status(500).send("Server error");
    }
});

module.exports = router;