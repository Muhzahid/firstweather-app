// routes/userRoutes.js
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if(!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

// Get user profile
router.get("/profile", authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
});

// Update preferences (favorites & tempUnit)
router.put("/preferences", authMiddleware, async (req, res) => {
    const { favorites, tempUnit } = req.body;
    const user = await User.findByIdAndUpdate(
        req.userId,
        { favorites, tempUnit },
        { new: true }
    ).select("-password");
    res.json(user);
});

export default router;
