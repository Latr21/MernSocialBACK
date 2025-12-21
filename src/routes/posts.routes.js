const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const commentsRoutes = require("./comments.routes");

// List + read
router.get("/", getPosts);
router.get("/:id", getPostById);

// Create (with optional image upload)
router.post("/", authMiddleware, upload.single("image"), createPost);

// Update
router.put("/:id", authMiddleware, updatePost);

// Delete
router.delete("/:id", authMiddleware, deletePost);

// Nested comments routes (keeps postId)
router.use("/:postId/comments", commentsRoutes);

module.exports = router;
