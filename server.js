require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();


app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static("uploads"));


app.get("/", (_req, res) => {
  return res.status(200).json({ message: "API fonctionnelle" });
});


app.use("/auth", require("./src/routes/auth.routes"));
app.use("/users", require("./src/routes/users.routes"));
app.use("/informations-accueil", require("./src/routes/informationsAccueil.routes"));
app.use("/posts", require("./src/routes/posts.routes"));
app.use("/comments", require("./src/routes/comments.routes"));
const PORT = process.env.API_PORT || 3000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" Connexion Mongo OK");

    app.listen(PORT, () => {
      console.log(`API démarrée sur : http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Erreur connexion Mongo :", err.message);
    process.exit(1);
  }
}

start();