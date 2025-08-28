import APIKeysModel from "../Models/APIKeys.model.js";

const authenticateApiKey = async (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({
      success: false,
      message: "Authorization header is required",
    });
  }

  const authHeader = req.headers.authorization;

  const authParts = authHeader.split(" ");
  if (authParts.length !== 2 || authParts[0] !== "ApiKey") {
    return res.status(400).send({
      success: false,
      message:
        "Malformed authorization header. Expected format: 'ApiKey YOUR_API_KEY'",
    });
  }

  try {
    const apiKey = authParts[1];
    const validateApiKey = await APIKeysModel.validateApiKey(apiKey);

    if (!validateApiKey.success) {
      return res.status(401).send({
        success: false,
        message: validateApiKey.message,
      });
    }

    req.apiContext = validateApiKey.apiContext;
    console.log("API Context:", req.apiContext);
    next();
  } catch (err) {
    console.error("API Authentication Error:", err);
    return res.status(500).send({
      success: false,
      message: "Internal server error during authentication",
      error: err.message,
    });
  }
};

export default authenticateApiKey;
