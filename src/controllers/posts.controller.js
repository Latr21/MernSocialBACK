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

// Lire
router.get("/", getPosts);
router.get("/:id", getPostById);

// Créer (avec image optionnelle)
router.post("/", authMiddleware, upload.single("image"), createPost);

// Mettre à jour
router.put("/:id", authMiddleware, updatePost);

// Supprimer
router.delete("/:id", authMiddleware, deletePost);

// Commentaires imbriqués (conserve postId)
router.use("/:postId/comments", commentsRoutes);

module.exports = router;