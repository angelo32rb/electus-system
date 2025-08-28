import express from "express";
import AdminController from "../Controllers/Admin.controller.js";
import authenticateToken from "../Middlewares/Auth.middleware.js";
import authorizeRole from "../Middlewares/Role.middleware.js";
import authorizateAction from "../Middlewares/Permission.middleware.js";

const AdminEndPoints = express.Router();

// Admin Middleware
AdminEndPoints.use(authenticateToken);
AdminEndPoints.use(authorizeRole("admin"));

// GETs method
AdminEndPoints.get(
  "/get-users",
  // authorizateAction("manage_electus_stock"),
  AdminController.getAllUsers
);
AdminEndPoints.get(
  "/electus-system/user-sheet-columns/:userId",
  AdminController.getUserSpreadsheetColumns
);
AdminEndPoints.get(
  "/electus-system/user-sheet-data/:userId",
  AdminController.getUserRowsData
);
AdminEndPoints.get(
  "/electus-system/user-spreadsheet/:userId",
  AdminController.getUserFullSpreadsheets
);

// POST method
AdminEndPoints.post("/create-user", AdminController.addNewUser);

export default AdminEndPoints;
