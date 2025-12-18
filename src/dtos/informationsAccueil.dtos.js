const Joi = require("joi");

exports.createInformationAccueilSchema = Joi.object({
  titre: Joi.string().trim().min(2).required(),
  description: Joi.string().trim().min(2).required()
});

exports.updateInformationAccueilSchema = Joi.object({
  titre: Joi.string().trim().min(2).optional(),
  description: Joi.string().trim().min(2).optional()
});