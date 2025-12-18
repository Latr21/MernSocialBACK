require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/auth", require("./src/routes/auth.routes"));
app.use("/informations-accueil", require("./src/routes/informationsAccueil.routes"));

const PORT = process.env.API_PORT || 3000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connecté");

    app.listen(PORT, () => {
      console.log(`✅ API démarrée sur : http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erreur MongoDB:", err.message);
    process.exit(1);
  }
}

start();