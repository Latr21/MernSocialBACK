const authService = require("../services/auth.service");

exports.SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await authService.SignUp({ username, email, password });
    return res.status(result.statusCode).json(result);
  } catch (err) {
    console.error("ERROR SIGNUP :", err);
    return res.status(500).json({
      error: true,
      message: err.message || "Erreur interne",
      statusCode: 500,
    });
  }
};

exports.SignIn = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const result = await authService.SignIn({ identifier, password });
    return res.status(result.statusCode).json(result);
  } catch (err) {
    console.error("ERROR SIGNIN :", err);
    return res.status(500).json({
      error: true,
      message: err.message || "Erreur interne",
      statusCode: 500,
    });
  }
};
