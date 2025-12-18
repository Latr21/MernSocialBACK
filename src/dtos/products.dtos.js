const Joi = require("joi");

const productSchema = {
  label: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  price: Joi.string().min(1).required(),
};

const createProductSchema = Joi.object(productSchema);

const updateProductSchema = Joi.object({
  ...productSchema,
  stock: Joi.number().required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
