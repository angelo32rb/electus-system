import express from "express";
import ClientController from "../Controllers/Client.controller.js";
import authenticateToken from "../Middlewares/Auth.middleware.js";
import authorizateAction from "../Middlewares/Permission.middleware.js";
import authorizePlatform from "../Middlewares/Platform.middleware.js";
import authorizeRole from "../Middlewares/Role.middleware.js";

const ClientsEndPoint = express.Router();

// Clients middleware
ClientsEndPoint.use(authenticateToken);
ClientsEndPoint.use(authorizeRole("client"));

/**
 * @route GET /user-spreadsheet/:type
 * @description Gets user spreadsheet.
 * @param {string} req.params.type - Spreadsheet types: ("normal" | "order").
 * @returns {Object} 200 - { status: true, spreadsheet }
 * @returns {Object} 400 - { status: false, message }
 * @returns {Object} 404 - { status: false, message }
 */
ClientsEndPoint.get(
  "/user-spreadsheet/:type",
  authorizePlatform("ElectusInventory"),
  ClientController.getUserSpreadsheet
);

/**
 * @route GET /user-columns-spreadsheet/:type
 * @description Fetches all columns from the user spreadsheet.
 * @param {string} req.params.type - Spreadsheet types: ("normal" | "order").
 * @returns {Object} 200 - { status: true, columns }
 * @returns {Object} 400 - { status: false, message }
 * @returns {Object} 404 - { status: false, message }
 */
ClientsEndPoint.get(
  "/user-columns-spreadsheet/:type",
  authorizePlatform("ElectusInventory"),
  ClientController.getUserSpreadsheetColumns
);

/**
 * @route GET /user-spreadsheet-data/:type
 * @description Fetch the whole spreadsheet of the user (including cells and rows).
 * @param {string} req.params.type - Spreadsheet types: ("normal" | "order").
 * @returns {Object} 200 - { status: true, userSpreadsheetData }
 * @returns {Object} 400 - { status: false, message }
 * @returns {Object} 404 - { status: false, message }
 */
ClientsEndPoint.get(
  "/user-spreadsheet-data/:type",
  authorizePlatform("ElectusInventory"),
  ClientController.getUserSpreadsheetWithData
);

/**
 * @route POST /create-normal-spreadsheet
 * @description Creates a normal spreadsheet for the user (if it doesn't exists yet).
 * @param {string} req.body.sheetName - Name of the spreadsheet.
 * @returns {Object} 201 - { status: true, message }
 * @returns {Object} 400 - { status: false, message }
 * @returns {Object} 409 - { status: false, message }
 */
ClientsEndPoint.post(
  "/create-normal-spreadsheet",
  authorizePlatform("ElectusInventory"),
  ClientController.createUserNormalSpreadsheet
);

/**
 * @route POST /create-order-spreadsheet
 * @description Creates an order spreadsheet for the user (if it doesn't exist yet).
 * @param {string} req.body.sheetName - Name of the spreadsheet.
 * @returns {Object} 201 - { status: true, message }
 * @returns {Object} 400 - { status: false, message }
 * @returns {Object} 409 - { status: false, message }
 */
ClientsEndPoint.post(
  "/create-order-spreadsheet",
  authorizePlatform("ElectusInventory"),
  ClientController.createUserOrderSpreadsheet
);

/**
 * @route POST /create-normal-spreadsheet-columns
 * @description Adds columns to the user normal spreadsheet.
 * @param {Array<Object>} req.body.columns - Columns to create (JSON.stringify([])).
 * @returns {Object} 201 - { status: true, message }
 * @returns {Object} 400 - { status: false, message }
 * @returns {Object} 404 - { status: false, message }
 * @returns {Object} 409 - { status: false, message }
 */
ClientsEndPoint.post(
  "/create-normal-spreadsheet-columns",
  authorizePlatform("ElectusInventory"),
  ClientController.createUserNormalSpreadsheetColumns
);

/**
 * @route POST /add-order-spreadsheet-data
 * @description Inserts data to the users order spreadsheet.
 * @param {Object} req.body.data - Data to insert (JSON.stringify({ column: value })).
 * @returns {Object} 201 - { status: true, message }
 * @returns {Object} 400 - { status: false, message }
 * @returns {Object} 404 - { status: false, message }
 * @returns {Object} 422 - { status: false, message } - If a column doesn't exist.
 * @returns {Object} 409 - { status: false, message }
 */
ClientsEndPoint.post(
  "/create-order-spreadsheet-columns",
  authorizePlatform("ElectusInventory"),
  ClientController.addUserOrderSpreadsheetData
);

/**
 * @route POST /add-normal-spreadsheet-data
 * @description Inserts data to the users normal spreadsheet.
 * @param {Object} req.body.data - Data to insert (JSON.stringify({ column: value })).
 * @returns {Object} 201 - { status: true, message }
 * @returns {Object} 400 - { status: false, message }
 * @returns {Object} 404 - { status: false, message }
 * @returns {Object} 422 - { status: false, message } - If a column doesn't exist.
 * @returns {Object} 409 - { status: false, message }
 */
ClientsEndPoint.post(
  "/add-normal-spreadsheet-data",
  authorizePlatform("ElectusInventory"),
  ClientController.addUserNormalSpreadsheetData
);

export default ClientsEndPoint;
