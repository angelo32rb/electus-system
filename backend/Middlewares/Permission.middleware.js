import UserModel from "../Models/Users.model.js";

const authorizateAction = (actionName) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({
          status: false,
          message: "User not authenticated",
        });
      }
      const userId = req.user.id;
      let results = await UserModel.hasPermission(actionName, userId);

      if (!results) {
        return res.status(403).send({
          status: false,
          message: "Forbidden access, insufficient permissions.",
        });
      }

      next();
    } catch (err) {
      debugLogger.error("Error validating action permission: \n" + err);
      return res.status(500).send({
        status: false,
        message: "Permission check error",
        error: err.message,
      });
    }
  };
};

export default authorizateAction;
