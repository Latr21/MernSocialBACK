const PostsService = require("../services/posts.service");

async function getAllPosts(req, res) {
  try {
    const result = await PostsService.getAllPosts();
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("erreur getAllPosts:", error);
    return res.status(500).json({ error: true, message: error.message });
  }
}

async function getOnePost(req, res) {
  const result = await PostsService.getOnePost(req.params.id);
  return res.status(result.statusCode).json(result);
}

async function createPost(req, res) {
  try {
    const { author, content } = req.body;
    const image = req.file ? req.file.filename : null;

    const result = await PostsService.createPost({
      author,
      content,
      image,
    });

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("controller createPost error:", error);
    return res.status(500).json({ error: true, message: "erreur interne" });
  }
}

async function updatePost(req, res) {
  const result = await PostsService.updatePost(req.params.id, req.body);
  return res.status(result.statusCode).json(result);
}

async function deletePost(req, res) {
  const result = await PostsService.deletePost(req.params.id);
  return res.status(result.statusCode).json(result);
}

module.exports = {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
};
