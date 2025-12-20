const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/post.controller"); 
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createPost);

router.get("/", getPosts);

router.get("/:id", getPostById);

router.put("/:id", authMiddleware, updatePost);

router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
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
