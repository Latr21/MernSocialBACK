const userService = require("../services/users.service");
const Post = require("../models/post.model");

async function getProfile(req, res) {
  const { id } = req.params;
  const result = await userService.getProfile(id);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
}

async function updateProfile(req, res) {
  const userId = req.user.id; // vient du middleware d’auth
  const result = await userService.updateProfile(userId, req.body);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
}

async function getUserPosts(userId) {
  try {
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 }); 

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

async function getFollowers(req, res) {
  const { id } = req.params;
  const result = await userService.getFollowers(id);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
}

async function getFollowing(req, res) {
  const { id } = req.params;
  const result = await userService.getFollowing(id);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
}

async function followUser(req, res) {
  const currentUserId = req.user.id;
  const { id: targetUserId } = req.params;
  const result = await userService.followUser(currentUserId, targetUserId);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
}

async function unfollowUser(req, res) {
  const currentUserId = req.user.id;
  const { id: targetUserId } = req.params;
  const result = await userService.unfollowUser(currentUserId, targetUserId);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
}

module.exports = {
  getProfile,
  updateProfile,
  getUserPosts,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
};
