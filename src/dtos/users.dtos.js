const Joi = require("joi");

const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  bio: Joi.string().max(300).allow(""),
  avatarUrl: Joi.string().uri().allow(""),
});

module.exports = {
  updateProfileSchema,
};
