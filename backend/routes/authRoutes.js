// routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

// Normal auth
router.post("/register", register);
router.post("/login", login);

// Google Auth Routes
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: false, // kyunki hum JWT cookies use karenge
  }),
  (req, res) => {
    // JWT token generate karo aur cookie me store karo
    const token = req.app.get("jwtSign")(req.user); // helper function bana lena
    res.cookie("token", token, { httpOnly: true });
    res.redirect("http://localhost:5173/weather");
  }
);

export default router;
