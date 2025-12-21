const Posts = require("../models/post.model");

/**
 * Récupérer tous les posts d’un utilisateur
 */
async function getUserPosts(userId) {
  try {
    const posts = await Posts.find({ author: userId }).sort({ createdAt: -1 });
    return {
      error: false,
      message: "posts utilisateur récupérés avec succès",
      data: posts,
      statusCode: 200,
    };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
}

/**
 * Créer un post
 */
async function createPost({ author, content, image }) {
  try {
    const existant = await Posts.findOne({ content });
    if (existant) {
      return {
        error: true,
        message: "un post identique existe déjà",
        statusCode: 400,
      };
    }

    const newPost = new Posts({
      author: author.trim(),
      content: content.trim(),
      image,
    });

    await newPost.save();

    return {
      error: false,
      message: "post créé avec succès",
      data: newPost,
      statusCode: 201,
    };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
}

/**
 * Récupérer tous les posts
 */
async function getAllPosts() {
  try {
    const posts = await Posts.find().sort({ createdAt: -1 });
    return {
      error: false,
      message: "posts récupérés avec succès",
      data: posts,
      statusCode: 200,
    };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
}

/**
 * Récupérer un post par ID
 */
async function getOnePost(id) {
  try {
    const post = await Posts.findById(id);
    if (!post) {
      return {
        error: true,
        message: "post introuvable",
        statusCode: 404,
      };
    }

    return {
      error: false,
      message: "post récupéré avec succès",
      data: post,
      statusCode: 200,
    };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
}

/**
 * Mettre à jour un post
 */
async function updateOne(id, data) {
  try {
    const post = await Posts.findByIdAndUpdate(id, data, { new: true });
    if (!post) {
      return {
        error: true,
        message: "post introuvable",
        statusCode: 404,
      };
    }

    return {
      error: false,
      message: "post mis à jour avec succès",
      data: post,
      statusCode: 200,
    };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
}

/**
 * Supprimer un post
 */
async function deleteOne(id) {
  try {
    const post = await Posts.findByIdAndDelete(id);
    if (!post) {
      return {
        error: true,
        message: "post introuvable",
        statusCode: 404,
      };
    }

    return {
      error: false,
      message: "post supprimé avec succès",
      statusCode: 200,
    };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
}

module.exports = {
  getUserPosts,
  createPost,
  getAllPosts,
  getOnePost,
  updateOne,
  deleteOne,
};
