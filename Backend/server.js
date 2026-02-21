import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Allow your deployed frontend + local dev
const allowedOrigins = [
  "https://prashangpt-1.onrender.com",
  "http://localhost:5173",
];

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
  })
);

app.use("/api", chatRoutes);

async function start() {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) throw new Error("Missing MONGO_URI / MONGODB_URI");

    // ✅ Connect first
    await mongoose.connect(uri);
    console.log("✅ Connected with Database!");

    // ✅ Start server after DB is ready
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect with Db", err);
    process.exit(1);
  }
}

start();