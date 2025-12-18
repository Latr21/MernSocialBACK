const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const validateWithJoi = require("../middlewares/validation.middleware");
const authenticate = require("../middlewares/authenticate.middleware");
const { createProductSchema, updateProductSchema } = require("../dtos/products.dtos");

// Utilisation du middleware Joi pour la vérification de données
router.post('/', authenticate, validateWithJoi(createProductSchema), productsController.CreateProduct);
router.get('/', productsController.GetAllProducts);
router.get('/:id', productsController.GetOneProduct);
router.patch('/:id', authenticate, validateWithJoi(updateProductSchema), productsController.UpdateOneProduct);
router.delete('/:id', authenticate, productsController.DeleteOneProduct);

module.exports = router;