// routes/comments.js
const express = require('express');
const router = express.Router();
const Comment = require("../models/Comment");

// POST a new comment
router.post("/", async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET comments by postId
router.get("/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a comment
router.delete("/:id", async (req, res) => {
    const { username } = req.body; 
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json("Comment not found");
        }
        if (comment.username === username) { 
            try {
                await Comment.deleteOne({ _id: req.params.id });
                res.status(200).json("Comment has been deleted");
            } catch (err) {
                res.status(500).json({ error: "Failed to delete comment", details: err.message });
            }
        } else {
            res.status(401).json("You can delete only your comment");
        }
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
});


// UPDATE a comment
router.put("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.username === req.body.username) {
            try {
                const updatedComment = await Comment.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                res.status(200).json(updatedComment);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your comment");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
