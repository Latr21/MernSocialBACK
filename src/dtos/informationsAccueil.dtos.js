const Joi = require("joi");

exports.createInformationAccueilSchema = Joi.object({
  titre: Joi.string().trim().required(),
  description: Joi.string().trim().required()
});

exports.updateInformationAccueilSchema = Joi.object({
  titre: Joi.string().trim().optional(),
  description: Joi.string().trim().optional()
});