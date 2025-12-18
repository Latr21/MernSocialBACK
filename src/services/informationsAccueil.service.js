const mongoose = require("mongoose");

// Modèle Mongoose pour les infos d'accueil
const informationAccueilSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image_url: { type: String, default: null },
  },
  { timestamps: { createdAt: "cree_le", updatedAt: "modifie_le" } }
);

// Collection : informations_accueil
const InformationAccueil =
  mongoose.models.InformationAccueil ||
  mongoose.model(
    "InformationAccueil",
    informationAccueilSchema,
    "informations_accueil"
  );

// Helpers
const reponse = (error, message, statusCode, data) => ({
  error,
  message,
  statusCode,
  ...(data !== undefined ? { data } : {}),
});

// Convertit "true"/"false" (string) en boolean. Sinon, renvoie la valeur par défaut.
const parseBoolean = (value, def) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const v = value.trim().toLowerCase();
    if (v === "true") return true;
    if (v === "false") return false;
  }
  return def;
};

exports.Create = async (data) => {
  try {
    const doc = await InformationAccueil.create({
      titre: data.titre,
      description: data.description,
      image_url: data.image_url ?? null,
    });

    return reponse(false, "Information d'accueil créée.", 201, doc);
  } catch (error) {
    return reponse(true, error.message, 400);
  }
};

exports.GetAll = async () => {
  try {
    const docs = await InformationAccueil.find().sort({
      cree_le: -1,
    });

    return reponse(false, "Liste récupérée.", 200, docs);
  } catch (error) {
    return reponse(true, error.message, 500);
  }
};

exports.GetOne = async (id) => {
  try {
    const doc = await InformationAccueil.findById(id);
    if (!doc) return reponse(true, "Introuvable.", 404);

    return reponse(false, "Info récupérée.", 200, doc);
  } catch (_error) {
    // id invalide (ObjectId)
    return reponse(true, "ID invalide.", 400);
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