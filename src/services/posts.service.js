const Post = require("../models/post.model");

async function getUserPosts(userId) {
  try {
    const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

    return {
      ok: true,
      status: 200,
      data: { posts },
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error.message || "Erreur interne",
    };
  }
}

module.exports = {
  getUserPosts,
};
