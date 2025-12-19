const { validateJWT } = require("../utils/jwt.utils");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: true,
      message: "Token manquant",
      statusCode: 401,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = validateJWT(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: "Token invalide ou expiré",
      statusCode: 401,
    });
  }
};
