import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js"; // apna passport config

import authRoutes from "./routes/authRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import userRoutes from './routes/userRoutes.js';
import cityRoutes from "./routes/cityRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // frontend port
    credentials: true
}));

// Session middleware (zaroori for passport)
app.use(session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // agar https use karte ho toh true karna
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cities", cityRoutes);

// Google Auth routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // frontend ka login page
    session: true
  }),
  (req, res) => {
    // Yahan token issue karke cookie set kar do
    res.redirect("http://localhost:5173/dashboard"); 
  }
);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
