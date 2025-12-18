require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  return res.status(200).json({
    message: "API fonctionnelle",
  });
});

app.use('/auth', require('./src/routes/auth.routes'));
app.use('/products', require('./src/routes/products.routes'));

const PORT = process.env.API_PORT || 3000

app.listen(PORT, () => {
  console.log(`API démarrée sur : http://localhost:${PORT}`);
});
