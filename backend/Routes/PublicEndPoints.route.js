import express from "express";
import PublicController from "../Controllers/Public.controller.js";

const publicEndPoint = express.Router();

// GET methods
publicEndPoint.get("/check-status", PublicController.checkStatus);

/**
 * @route POST /login
 * @description Allows the users to authenticate their accounts.
 * @param {string} req.body.username - User username account.
 * @param {string} req.body.password - User password account.
 * @returns {Object} 201 - {status: true, accountInformation}
 * @returns {Object} 400 - {status: false, message}
 * @returns {Object} 404 - {status: false, message}
 */
publicEndPoint.post("/login", PublicController.login);

/**
 * @route POST /request-password-change
 * @description User requests a password change for its account.
 * @param {string} req.body.username - User username account.
 * @returns {Object} 201 - {status: true, message}
 * @returns {Object} 400 - {status: true, message}
 * @returns {Object} 404 - {status: false, message}
 */
publicEndPoint.post(
  "/request-password-change",
  PublicController.RequestPasswordChanging
);

/**
 * @route POST /change-password
 * @description Allows the user to change their account password.
 * @param {string} req.body.username - User username account.
 * @param {string} req.body.password - User new password.
 * @param {string} req.body.token - User token account.
 * @returns {Object} 201 - {status: true, message}
 * @returns {Object} 400 - {status: false, message}
 * @returns {Object} 404 - {status: false, message}
 */
publicEndPoint.post("/change-password", PublicController.ChangePassword);

/**
 * @route POST /get-account-information
 * @description Allows the frontend to validate users token.
 * @param {string} req.body.token - Users token account.
 * @returns {Object} 201 - {status: true, message}
 * @returns {Object} 400 - {status: false, message}
 * @returns {Object} 404 - {status: false, message}
 */
publicEndPoint.post(
  "/get-account-information",
  PublicController.getUserAccountInformation
);

export default publicEndPoint;
