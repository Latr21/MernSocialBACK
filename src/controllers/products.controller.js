const productsService = require("../services/products.service");

exports.CreateProduct = async (req, res) => {
  const { label, description, price } = req.body;

  const result = await productsService.Create({
    label,
    description,
    price,
  });

  return res.status(result.statusCode).json(result);
};

exports.GetOneProduct = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).json({
      error: true,
      message: "Paramètre invalide",
      statusCode: 400,
    });
  }

  const result = await productsService.GetOne(+id);

  return res.status(result.statusCode).json(result);
};

exports.GetAllProducts = async (req, res) => {
  const result = await productsService.GetAll();

  return res.status(result.statusCode).json(result);
};

exports.UpdateOneProduct = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).json({
      error: true,
      message: "Paramètre invalide",
      statusCode: 400,
    });
  }

  const { label, description, price, stock } = req.body;

  const result = await productsService.UpdateOne(+id, {
    label,
    description,
    price,
    stock,
  });

  return res.status(result.statusCode).json(result);
};

exports.DeleteOneProduct = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).json({
      error: true,
      message: "Paramètre invalide",
      statusCode: 400,
    });
  }

  const result = await productsService.DeleteOne(+id);

  return res.status(result.statusCode).json(result);
};
