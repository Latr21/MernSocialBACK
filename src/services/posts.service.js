const Post = require("../models/post.model");

async function getUserPosts(userId) {
  try {
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 }); // plus récent → plus ancien

    return {
      error: false,
      message: "Posts récupérés",
      data: { posts },
      statusCode: 200,
    };
  } catch (error) {
    return {
      error: true,
      message: error.message || "Erreur interne",
      statusCode: 500,
    };
  }
}

module.exports = {
  getUserPosts
};
