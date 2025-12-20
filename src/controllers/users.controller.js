const userService = require("../services/users.service");

async function getProfile(req, res) {
  const { id } = req.params;
  const result = await userService.getProfile(id);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
}

async function updateProfile(req, res) {
  const userId = req.user.id;
  const result = await userService.updateProfile(userId, req.body);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
}

async function getUserPosts(req, res) {
  const { id } = req.params;
  const result = await userService.getUserPosts(id);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
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

async function createUser(req, res) {
  const result = await userService.createUser(req.body);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
}

async function getUsers(req, res) {
  const result = await userService.getUsers();
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
}

async function getUserById(req, res) {
  const { id } = req.params;
  const result = await userService.getUserById(id);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const result = await userService.updateUser(id, req.body);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  return res.status(result.status).json(result.data);
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const result = await userService.deleteUser(id);
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
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
