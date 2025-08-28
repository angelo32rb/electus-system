import UserModel from "../Models/Users.model.js";
import ElectusInventory from "../Models/ElectusInvetory.model.js";
import debugLogger from "../Utils/DebugLogger.js";
import { sendAuthEmail } from "../Utils/email/EmailSender.js";

const AdminController = {
  getAllUsers: async (req, res) => {
    try {
      const result = await UserModel.getUsers();

      if (result.success) {
        return res.status(200).json({
          status: true,
          data: result.data,
        });
      } else {
        return res.status(200).json({
          status: false,
          message: result.message,
        });
      }
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Admin.controller.js getAllUsers: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },
  addNewUser: async (req, res) => {
    const { username, email, shopName, rank, platform } = req.body;
    if (!username || !email || !shopName || !rank || !platform) {
      return res.status(401).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      const result = await UserModel.insertUser(
        username,
        email,
        shopName,
        rank,
        platform
      );

      if (!result.success) {
        return res.status(200).json({
          status: false,
          message: result.message,
        });
      }

      let emailSent = await sendAuthEmail(email, username, result.password);

      if (!emailSent.success) {
        return res.status(500).json({
          status: false,
          message: emailSent.message,
        });
      }

      return res.status(200).json({
        status: true,
        message:
          "The user has been created and an email has been sent to " +
          email +
          " with his login credentials.",
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Admin.controller.js addNewUser: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },

  getUserSpreadsheetColumns: async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
      return res.status(401).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      const result = await ElectusInventory.getUserColumnsSheet(
        userId,
        "spreadsheet"
      );
      if (!result.success) {
        return res.status(200).json({
          status: false,
          message: result.message,
        });
      }

      return res.status(200).json({
        status: true,
        columns: result.columns,
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Admin.controller.js getUserColumns: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },

  getUserRowsData: async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
      return res.status(401).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      const result = await ElectusInventory.getUserRowsWithCellSheet(
        userId,
        "spreadsheet"
      );
      if (!result.success) {
        return res.status(200).json({
          status: false,
          message: result.message,
        });
      }

      return res.status(200).json({
        status: true,
        data: result.data,
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Admin.controller.js getUserProducts: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },
  getUserFullSpreadsheets: async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
      return res.status(401).json({
        status: false,
        message: "There is/are parameter/s missing",
      });
    }

    try {
      const result = await ElectusInventory.getUserFullSpreadsheets(
        userId,
        "spreadsheet"
      );
      if (!result.success) {
        return res.status(200).json({
          status: false,
          message: result.message,
        });
      }

      return res.status(200).json({
        status: true,
        spreadsheets: result.spreadsheets,
      });
    } catch (err) {
      debugLogger.error(
        "HTTP Error from Admin.controller.js getUserFullTable: " + err
      );
      return res.status(500).json({
        status: false,
        message: "Internal server error: \n" + err.message,
      });
    }
  },
};

export default AdminController;
