import express from "express";
import { getWeather } from "../controllers/weatherController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getWeather);

export default router;
