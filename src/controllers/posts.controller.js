const PostsService = require("../services/posts.service"); // pas PostsController

exports.createPost = async (req, res) => {
  const { author, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const result = await PostsService.Create({ author, content, image });
  return res.status(result.statusCode).json(result);
};

exports.getAllPosts = async (req, res) => {
  const result = await PostsService.GetAll();
  return res.status(result.statusCode).json(result);
};

exports.getOnePost = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: true, message: "Paramètre invalide", statusCode: 400 });

  const result = await PostsService.GetOne(id);
  return res.status(result.statusCode).json(result);
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: true, message: "Paramètre invalide", statusCode: 400 });

  const { content } = req.body;
  const result = await PostsService.UpdateOne(id, { content });
  return res.status(result.statusCode).json(result);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: true, message: "Paramètre invalide", statusCode: 400 });

  const result = await PostsService.DeleteOne(id);
  return res.status(result.statusCode).json(result);
};
