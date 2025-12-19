require("dotenv").config(); // var env
const express = require("express"); // crée app express
const cors = require("cors");  
const connectDB = require("./config/database.config");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // dossier pour les images
app.use("/posts", require("./src/routes/posts.routes"));
// pourquoi ne pas app.use("/posts/comments", commentsRoutes); ??  : postID perdu ( commentaires = sous partie d'un post)
app.get("/", (_, res) => res.status(200).json({ message: "API fonctionnelle" }));
app.use("/informations-accueil", require("./src/routes/informationsAccueil.routes"));

connectDB();

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => console.log(`API démarrée sur http://localhost:${PORT}`));
