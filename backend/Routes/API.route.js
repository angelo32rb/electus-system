// API.route.js
import express from "express";
import authenticateApiKey from "../Middlewares/API.middleware.js";
import APIController from "../Controllers/API.controller.js";

const APIEndPoints = express.Router();
// API middleware
APIEndPoints.use(authenticateApiKey);

// Simple get method
APIEndPoints.get("/check-status", APIController.checkStatus);

export default APIEndPoints;
