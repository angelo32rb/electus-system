import UserModel from "../Models/Users.model.js";

const authenticateToken = async (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({
      success: false,
      message: "Authorization header is required",
    });
  }
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({
      status: false,
      message: "No authorization token has been provided.",
    });
  }

  authHeader = authHeader.split(" ");
  if (authHeader.length !== 2 || authHeader[0] !== "Bearer") {
    return res.status(400).send({
      status: false,
      message: "Malformed authorization header",
    });
  }

  try {
    const token = authHeader[1];

    const user = await UserModel.findUserByToken(token);
    if (!user) {
      return res.status(401).send({
        status: false,
        message: "Invalid token",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "Authentication error",
      error: err.message,
    });
  }
};

export default authenticateToken;
