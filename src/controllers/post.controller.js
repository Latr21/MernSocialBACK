const postService = require("../services/posts.service");

async function createPost(req, res) {
  const authorId = req.user.id; 
  const result = await postService.createPost(authorId, req.body);

  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.status(result.status).json(result.data);
}

async function getPosts(req, res) {
  const result = await postService.getPosts();

  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.status(result.status).json(result.data);
}

async function getPostById(req, res) {
  const { id } = req.params;
  const result = await postService.getPostById(id);

  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.status(result.status).json(result.data);
}

async function updatePost(req, res) {
  const { id } = req.params;
  const userId = req.user.id; 
  const result = await postService.updatePost(id, userId, req.body);

  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.status(result.status).json(result.data);
}

async function deletePost(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  const result = await postService.deletePost(id, userId);

  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.status(result.status).json(result.data);
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
