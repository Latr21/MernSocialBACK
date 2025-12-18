const express = require("express");
const router = express.Router();

const controller = require("../controllers/informationsAccueil.controller");
const validateWithJoi = require("../middlewares/validation.middleware");
const upload = require("../middlewares/uploadInformationAccueil.middleware");

const {
  createInformationAccueilSchema,
  updateInformationAccueilSchema,
} = require("../dtos/informationsAccueil.dtos");

router.post(
  "/",
  upload.single("image"),
  validateWithJoi(createInformationAccueilSchema),
  controller.CreateInformationAccueil
);

router.get("/", controller.GetAllInformationsAccueil);
router.get("/:id", controller.GetOneInformationAccueil);

router.patch(
  "/:id",
  upload.single("image"),
  validateWithJoi(updateInformationAccueilSchema),
  controller.UpdateOneInformationAccueil
);

router.delete("/:id", controller.DeleteOneInformationAccueil);

module.exports = router;