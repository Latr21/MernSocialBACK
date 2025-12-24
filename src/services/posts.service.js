const Posts = require("../../models/Posts")

async function getUserPosts(userId) {
  try {
    const posts = await Posts.find({ author: userId }).sort({ createdAt: -1 })
    return { error: false, message: "posts recuperes", data: { posts }, statusCode: 200 }
  } catch (error) {
    return { error: true, message: error.message || "erreur interne", statusCode: 500 }
  }
}

async function createPost({ author, content, image }) {
  try {
    console.log("creation du post", { author, content, image })
    if (!author || !content) return { error: true, message: "author ou content manquant", statusCode: 400 }

    const existant = await Posts.findOne({ content })
    if (existant) return { error: true, message: "post identique existe deja", statusCode: 400 }
    const postData = { 
      author: author.trim(), 
      content: content.trim(), 
      image: image ?? null 
    };
  const newPost = new Posts(postData);
    await newPost.save()
    console.log("post sauve", newPost)

    return { error: false, message: "post cree avec succes", data: newPost, statusCode: 201 }
  } catch (error) {
    console.error("erreur createPost service", error)
    return { error: true, message: error.message, statusCode: 500 }
  }
}

async function getAllPosts() {
  try {
    const posts = await Posts.find().sort({ createdAt: -1 })
    return { error: false, message: "posts recuperes", data: posts, statusCode: 200 }
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 }
  }
}

async function getOnePost(id) {
  try {
    const post = await Posts.findById(id)
    return { error: !post, message: post ? "post recupere" : "post n existe pas", data: post || null, statusCode: post ? 200 : 404 }
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 }
  }
}

async function updatePost(id, { content }) {
  try {
    const post = await Posts.findById(id)
    if (!post) return { error: true, message: "post n existe pas", statusCode: 404 }

    const updatedPost = await Posts.findByIdAndUpdate(id, { content: content ?? post.content }, { new: true })
    return { error: false, message: "post mis a jour", data: updatedPost, statusCode: 200 }
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 }
  }
}

async function deletePost(id) {
  try {
    const post = await Posts.findById(id)
    if (!post) return { error: true, message: "post n existe pas", statusCode: 404 }

    await Posts.findByIdAndDelete(id)
    return { error: false, message: "post supprime", statusCode: 200 }
  } catch (error) {
    return { error: true, message: error.message, statusCode: 500 }
  }
}

module.exports = {
  getUserPosts,
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost
}
