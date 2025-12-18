const { generateJWT } = require("../utils/jwt.utils");
const { hashPassword, comparePassword } = require("../utils/password.utils");

const users = [];

exports.SignUp = async (data) => {
  try {
    const { username, email, password } = data;

    const isExists = users.find(
      (user) => user.email === email || user.username === username
    );

    if (isExists) {
      return {
        error: true,
        message: "Un utilisateur existe déjà avec ces informations.",
        statusCode: 400,
      };
    }

    const hashedPassword = await hashPassword(password);

    const user = {
      id: !users.length ? 1 : users[users.length - 1].id + 1,
      username,
      email,
      password: hashedPassword,
    };

    users.push(user);

    return {
      error: false,
      message: "Utilisateur créé avec succès.",
      statusCode: 201,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
      statusCode: 500,
    };
  }
};

exports.SignIn = async (data) => {
  try {
    const { email, password } = data;

    const user = users.find((user) => user.email === email);

    if (!user) {
      return {
        error: true,
        message: "Identifiants invalide.",
        statusCode: 401,
      };
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return {
        error: true,
        message: "Identifiants invalide.",
        statusCode: 401,
      };
    }

    const token = await generateJWT({
      userId: user.id,
      username: user.username,
      email: user.email,
    });

    return {
      error: false,
      message: "Vous êtes désormais connecté.",
      data: { token },
      statusCode: 200,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
      statusCode: 500,
    };
  }
};
