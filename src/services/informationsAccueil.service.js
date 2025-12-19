const mongoose = require("mongoose");


const informationAccueilSchema = new mongoose.Schema({
  titre: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  image_url: { type: String, default: null },
});



const InformationAccueil =
  mongoose.models.InformationAccueil ||
  mongoose.model(
    "InformationAccueil",
    informationAccueilSchema,
    "informations_accueil"
  );


const reponse = (error, message, statusCode, data) => ({
  error,
  message,
  statusCode,
  ...(data !== undefined ? { data } : {}),
});



exports.Create = async (data) => {
  try {
    const doc = await InformationAccueil.create({
      titre: data.titre,
      description: data.description,
      image_url: data.image_url ?? null,
    });

    return reponse(false, "Information creé.", 201, doc);
  } catch (error) {
    return reponse(true, error.message, 400);
  }
};

exports.GetAll = async () => {
  try {
    const docs = await InformationAccueil.find();
    return reponse(false, "Liste ok.", 200, docs);
  } catch (error) {
    return reponse(true, error.message, 500);
  }
};



exports.UpdateOne = async (id, data) => {
  try {
    const payload = { ...data };

    const doc = await InformationAccueil.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!doc) return reponse(true, "Introuvable.", 404);

    return reponse(false, "Information mise à jour.", 200, doc);
  } catch (_error) {
    return reponse(true, "ID invalide.", 400);
  }
};

exports.DeleteOne = async (id) => {
  try {
    const doc = await InformationAccueil.findByIdAndDelete(id);
    if (!doc) return reponse(true, "Introuvable.", 404);

    return reponse(false, "Information supprimée.", 200);
  } catch (_error) {
    return reponse(true, "ID invalide.", 400);
  }
};