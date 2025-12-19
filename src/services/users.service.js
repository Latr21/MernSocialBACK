const User = require("../models/user.model");
// const Post = require("../models/post.model"); A décom quand post.model sera fait

async function getProfile(userId) {
  const user = await User.findById(userId).select("username email bio avatarUrl followers following createdAt");
  if (!user) {
    return { ok: false, status: 404, error: "Utilisateur introuvable" };
  }

  const followersCount = user.followers.length;
  const followingCount = user.following.length;

  return {
    ok: true,
    status: 200,
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      followersCount,
      followingCount,
      createdAt: user.createdAt,
    },
  };
}

async function updateProfile(currentUserId, payload) {
  const { username, bio, avatarUrl } = payload;

  const user = await User.findByIdAndUpdate(
    currentUserId,
    { username, bio, avatarUrl },
    { new: true }
  ).select("username bio avatarUrl");

  if (!user) {
    return { ok: false, status: 404, error: "Utilisateur introuvable, veuillez réessayer" };
  }

  return {
    ok: true,
    status: 200,
    data: {
      id: user._id,
      username: user.username,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
    },
  };
}

async function getUserPosts(userId) {
  const posts = await Post.find({ author: userId })
    .sort({ createdAt: -1 });

  return {
    ok: true,
    status: 200,
    data: posts,
  };
}

async function getFollowers(userId) {
  const user = await User.findById(userId).populate("followers", "username avatarUrl");
  if (!user) {
    return { ok: false, status: 404, error: "Utilisateur introuvable, veuillez réessayer" };
  }

  return {
    ok: true,
    status: 200,
    data: {
      count: user.followers.length,
      users: user.followers,
    },
  };
}

async function getFollowing(userId) {
  const user = await User.findById(userId).populate("following", "username avatarUrl");
  if (!user) {
    return { ok: false, status: 404, error: "Utilisateur introuvable" };
  }

  return {
    ok: true,
    status: 200,
    data: {
      count: user.following.length,
      users: user.following,
    },
  };
}

async function followUser(currentUserId, targetUserId) {
  if (currentUserId === targetUserId) {
    return { ok: false, status: 400, error: "Auto-following impossible" };
  }

  const me = await User.findById(currentUserId);
  const target = await User.findById(targetUserId);

  if (!me || !target) {
    return { ok: false, status: 404, error: "Utilisateur introuvable" };
  }

  if (!me.following.includes(target._id)) {
    me.following.push(target._id);
  }
  if (!target.followers.includes(me._id)) {
    target.followers.push(me._id);
  }

  await me.save();
  await target.save();

  return { ok: true, status: 200, data: { message: "Abonné" } };
}

async function unfollowUser(currentUserId, targetUserId) {
  const me = await User.findById(currentUserId);
  const target = await User.findById(targetUserId);

  if (!me || !target) {
    return { ok: false, status: 404, error: "Utilisateur introuvable" };
  }

  me.following = me.following.filter((id) => id.toString() !== target._id.toString());
  target.followers = target.followers.filter((id) => id.toString() !== me._id.toString());

  await me.save();
  await target.save();

  return { ok: true, status: 200, data: { message: "Désabonné" } };
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
