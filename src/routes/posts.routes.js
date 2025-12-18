const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const PostsController = require("../controllers/posts.controller");
const commentsRoutes = require("./comments.routes");

router.get("/", PostsController.getAllPosts);
router.get("/:id", PostsController.getOnePost);
router.post("/", upload.single("image"), PostsController.createPost);
router.patch("/:id", PostsController.updatePost);
router.delete("/:id", PostsController.deletePost);

router.use("/:postId/comments", commentsRoutes);

module.exports = router;
