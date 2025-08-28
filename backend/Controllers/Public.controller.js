import UserModel from "../Models/Users.model.js";
import { decrypt } from "../Utils/CryptoUtils.js";
import debugLogger from "../Utils/DebugLogger.js";
import { sendRequestPasswordChangingEmail } from "../Utils/email/EmailSender.js";

const PublicController = {
  checkStatus: (req, res) => {
    return res.status(200).json({
      status: true,
      message: "The API is currently online.",
    });
  },

  getUserAccountInformation: async (req, res) => {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        status: false,
        message: "There is'are parameter/s missing",
      });
    }

    try {
      const result = await UserModel.findUserByToken(token);
      if (!result) {
        return res.status(404).json({
          status: false,
          mesasge: "There's no user with that token.",
        });
      }

      return res.status(201).json({
        status: true,
        accountInformation: result,
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Public.controller.js getUserAccountInformation: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      const result = await UserModel.authenticateUser(username, password);
      if (!result.success) {
        return res.status(404).json({
          status: false,
          message: result.message,
        });
      }

      return res.status(201).json({
        status: true,
        message: result.message,
        accountInformation: result.accountInformation,
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Public.controller.js authenticateUser: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },

  RequestPasswordChanging: async (req, res) => {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      const result = await UserModel.getTokenAndEmailByUsername(username);

      if (!result.success) {
        return res.status(404).json({
          status: false,
          message: result.message,
        });
      }

      let emailSent = await sendRequestPasswordChangingEmail(
        result.accountInformation.email,
        username,
        decrypt(result.accountInformation.token)
      );

      if (!emailSent.success) {
        return res.status(500).json({
          status: false,
          message: emailSent.message,
        });
      }

      return res.status(201).json({
        status: true,
        message:
          "An email has been sent to " +
          username +
          " requesting a password change. ",
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Public.controller.js RequestPasswordChanging: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },
  ChangePassword: async (req, res) => {
    const { username, password, token } = req.body;
    if (!username || !password || !token) {
      return res.status(400).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      const result = await UserModel.updatePasswordAndToken(
        password,
        token,
        username
      );
      if (!result.success) {
        return res.status(404).json({
          status: false,
          message: result.message,
        });
      }

      return res.status(201).json({
        status: true,
        message: "The password has been updated.",
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Public.controller.js ChangePassword: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },
};

export default PublicController;
