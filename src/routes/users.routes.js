const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");
const authenticate = require("../middlewares/authenticate.middleware");
const validate = require("../middlewares/validation.middleware");
const { updateProfileSchema } = require("../dtos/users.dtos");
const auth = require("../middlewares/auth.middleware");


// profil public avec posts

router.get("/:id/profile", usersController.getProfile);
router.get("/:id/posts", usersController.getUserPosts);

// édition de profil

router.patch(
  "/me/profile",
  authenticate,
  validate(updateProfileSchema),
  usersController.updateProfile
);

// followers / following

router.get("/:id/followers", usersController.getFollowers);
router.get("/:id/following", usersController.getFollowing);

// follow / unfollow

router.post("/:id/follow", authenticate, usersController.followUser);
router.delete("/:id/follow", authenticate, usersController.unfollowUser);

router.get("/me", auth, (req, res) => {
  return res.status(200).json({
    error: false,
    message: "Profil récupéré",
    data: { user: req.user },
    statusCode: 200,
  });
});

module.exports = router;
