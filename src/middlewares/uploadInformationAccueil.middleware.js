const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/informations-accueil");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Image non supportée"), false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 Mo
});