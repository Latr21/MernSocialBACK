const CommentsController = require("../services/comments.service");

exports.AddComment = async (req, res) => {
  console.log("ADD COMMENT REACHED");
  console.log("params:", req.params);
  console.log("body:", req.body);
  const { postId } = req.params;
  const { author, text } = req.body;

  const result = await CommentsController.Create(postId, { author, text });
  return res.status(result.statusCode).json(result);
};

exports.UpdateComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { text } = req.body;

  const result = await CommentsController.UpdateOne(postId, commentId, { text });
  return res.status(result.statusCode).json(result);
};

exports.DeleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  const result = await CommentsController.DeleteOne(postId, commentId);
  return res.status(result.statusCode).json(result);
};
