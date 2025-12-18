const mongoose = require("mongoose");
const service = require("../services/informationsAccueil.service");

const reponseIdInvalide = (res) =>
  res.status(400).json({
    error: true,
    message: "Paramètre invalide",
    statusCode: 400,
  });

exports.CreateInformationAccueil = async (req, res) => {
  const { titre, description } = req.body;

  const image_url = req.file
    ? `/uploads/informations-accueil/${req.file.filename}`
    : null;

  const result = await service.Create({
    titre,
    description,
    image_url,
  });

  return res.status(result.statusCode).json(result);
};

exports.GetAllInformationsAccueil = async (_req, res) => {
  const result = await service.GetAll();
  return res.status(result.statusCode).json(result);
};

exports.GetOneInformationAccueil = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return reponseIdInvalide(res);

  const result = await service.GetOne(id);
  return res.status(result.statusCode).json(result);
};

exports.UpdateOneInformationAccueil = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return reponseIdInvalide(res);

  const image_url = req.file
    ? `/uploads/informations-accueil/${req.file.filename}`
    : undefined; // pas de fichier => ne change pas l'image

  const payload = {
    ...req.body,
    ...(image_url !== undefined ? { image_url } : {}),
  };

  const result = await service.UpdateOne(id, payload);
  return res.status(result.statusCode).json(result);
};

exports.DeleteOneInformationAccueil = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return reponseIdInvalide(res);

  const result = await service.DeleteOne(id);
  return res.status(result.statusCode).json(result);
};