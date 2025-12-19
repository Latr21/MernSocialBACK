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
const Posts = require("../../models/Posts");

exports.Create = async ({ author, content, image }) => {
  try {
    const isExists = await Posts.findOne({ content });
    if (isExists) return { error: true, message: "Un post identique existe déjà", statusCode: 400 };

    const newPostData = { author: author.trim(), content: content.trim(), image };
    const newPost = new Posts(newPostData);
    await newPost.save();

    return { error: false, message: "Post créé avec succès", data: newPost, statusCode: 201 };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
};

exports.GetAll = async () => {
  try {
    const posts = await Posts.find().sort({ createdAt: -1 });
    return { error: false, message: "Posts récupérés avec succes", data: posts, statusCode: 200 };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
};

exports.GetOne = async (id) => {
  try {
    const post = await Posts.findById(id);
    return {
      error: post ? false : true,
      message: post ? "Post récupéré avec succès." : "Post n'existe pas",
      data: post || null,
      statusCode: post ? 200 : 404,
    };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
};

exports.UpdateOne = async (id, { content }) => {
  try {
    const post = await Posts.findById(id);
    if (!post) return { error: true, message: "Post n'existe pas", statusCode: 404 };

    const updatedData = { content: content ?? post.content };
    const updatedPost = await Posts.findByIdAndUpdate(id, updatedData, { new: true });

    return { error: false, message: "Post mis à jour avec succès.", data: updatedPost, statusCode: 200 };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
};

exports.DeleteOne = async (id) => {
  try {
    const post = await Posts.findById(id);
    if (!post) return { error: true, message: "Post n'existe pas", statusCode: 404 };

    await Posts.findByIdAndDelete(id);
    return { error: false, message: "Post supprimé avec succès.", statusCode: 200 };
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 };
  }
};
