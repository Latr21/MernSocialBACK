const express = require("express");
const router = express.Router({ mergeParams: true });

const CommentsController = require("../controllers/comments.controller");

// ajouter eventuellement authenticate + validatewithjoi?
router.post("/", CommentsController.AddComment);
router.patch("/:commentId", CommentsController.UpdateComment);
router.delete("/:commentId", CommentsController.DeleteComment);

module.exports = router;