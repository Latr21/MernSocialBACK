const User = require("../models/user.model");
const { generateJWT } = require("../utils/jwt.utils");
const { hashPassword, comparePassword } = require("../utils/password.utils");

async function SignUp(data) {
  try {
    const { username, email, password } = data;

    console.log("DATA SIGNUP RECU :", { username, email });

    const existing = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existing) {
      return {
        error: true,
        message: "Un utilisateur existe déjà avec cet email ou ce pseudo.",
        statusCode: 400,
      };
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      passwordHash: hashedPassword,
    });

    console.log("USER CREE EN BDD :", user);

    return {
      error: false,
      message: "Utilisateur créé avec succès. Bienvenue sur MERN Social !",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      statusCode: 201,
    };
  } catch (error) {
    console.error("ERROR SIGNUP SERVICE :", error);
    return {
      error: true,
      message: error.message || "Erreur interne",
      statusCode: 500,
    };
  }
}


async function SignIn(data) {
  try {
    const { identifier, password } = data;

    console.log("IDENTIFIER RECU :", identifier);

    const query = identifier.includes("@")
      ? { email: identifier }
      : { username: identifier };

    const user = await User.findOne(query);

    console.log("USER TROUVE EN BDD :", user);

    if (!user) {
      return {
        error: true,
        message: "Identifiants invalides.",
        statusCode: 401,
      };
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return {
        error: true,
        message: "Mot de passe invalide.",
        statusCode: 401,
      };
    }

    const token = await generateJWT({
      userId: user._id,
      username: user.username,
      email: user.email,
    });

    return {
      error: false,
      message: "Vous êtes connecté, bienvenue sur MERN Social !",
      data: { token },
      statusCode: 200,
    };
  } catch (error) {
    console.error("ERROR SIGNIN SERVICE :", error);
    return {
      error: true,
      message: error.message || "Erreur interne",
      statusCode: 500,
    };
  }
}

module.exports = {
  SignUp,
  SignIn,
};
