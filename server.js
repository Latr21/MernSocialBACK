require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  return res.status(200).json({
    message: "API fonctionnelle",
  });
});

app.use("/auth", require("./src/routes/auth.routes"));
app.use("/users", require("./src/routes/users.routes"));

const PORT = process.env.API_PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connexion Mongo OK");
    app.listen(PORT, () => {
      console.log(`API démarrée sur : http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur connexion Mongo :", err);
  });
