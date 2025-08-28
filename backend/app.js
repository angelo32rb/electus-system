import express from "express";
import cors from "cors";

// Import routes
import PublicEndPoints from "./Routes/PublicEndPoints.route.js";
import ClientsEndPoint from "./Routes/Clients.route.js";
import AdminEndPoints from "./Routes/Admin.route.js";
import APIEndPoints from "./Routes/API.route.js";

let app = express();

// Middleware
app.use(express.urlencoded({ extended: false })), app.use(express.json());

// CORS
app.use(cors());

// API prefix's
app.use("/api/v1", PublicEndPoints);
app.use("/api/v1/clients", ClientsEndPoint);
app.use("/api/v1/admin", AdminEndPoints);
app.use("/rest-api/v1/", APIEndPoints);

export default app;
