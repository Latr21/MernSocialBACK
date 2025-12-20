const Posts = require("../models/post.model");

async function getUserPosts(userId) {
  try {
<<<<<<< HEAD
    const posts = await Posts.find({ author: userId }).sort({ createdAt: -1 });
    return { error: false, message: "posts recuperes", data: { posts }, statusCode: 200 };
  } catch (error) {
    return { error: true, message: error.message || "erreur interne", statusCode: 500 };
  }
}
=======
    const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });
>>>>>>> feature/profile-friends

async function createPost({ author, content, image }) {
  try {
    const existant = await Posts.findOne({ content });
    if (existant) return { error: true, message: "un post identique existe deja", statusCode: 400 };

    const newPost = new Posts({ author: author.trim(), content: content.trim(), image });
    await newPost.save();

    return { error: false, message: "post cree avec succes", data: newPost, statusCode: 201 };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
}

async function getAllPosts() {
  try {
    const posts = await Posts.find().sort({ createdAt: -1 });
    return { error: false, message: "posts recuperes avec succes", data: posts, statusCode: 200 };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
}

async function getOnePost(id) {
  try {
    const post = await Posts.findById(id);
    return {
<<<<<<< HEAD
      error: !post,
      message: post ? "post recupere avec succes" : "post n'existe pas",
      data: post || null,
      statusCode: post ? 200 : 404,
    };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
}

async function updatePost(id, { content }) {
  try {
    const post = await Posts.findById(id);
    if (!post) return { error: true, message: "post n'existe pas", statusCode: 404 };

    const updatedPost = await Posts.findByIdAndUpdate(id, { content: content ?? post.content }, { new: true });
    return { error: false, message: "post mis a jour avec succes", data: updatedPost, statusCode: 200 };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
}

async function deletePost(id) {
  try {
    const post = await Posts.findById(id);
    if (!post) return { error: true, message: "post n'existe pas", statusCode: 404 };

    await Posts.findByIdAndDelete(id);
    return { error: false, message: "post supprime avec succes", statusCode: 200 };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
=======
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
>>>>>>> feature/profile-friends
  }
}

module.exports = {
  getUserPosts,
<<<<<<< HEAD
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost
=======
>>>>>>> feature/profile-friends
};
