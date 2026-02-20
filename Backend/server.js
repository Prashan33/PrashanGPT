import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();

const PORT = process.env.PORT || 8080;


const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

app.use(express.json());


app.use(
  cors({
    origin: ["http://localhost:5173", "https://prashangpt-1.onrender.com"],
    methods: ["GET", "POST"],
  })
);

app.use("/api", chatRoutes);

const connectDB = async () => {
  if (!MONGO_URI) {
    console.warn("⚠️ No Mongo URI found (MONGO_URI or MONGODB_URI). Skipping DB connect.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected with Database!");
  } catch (err) {
    console.log("❌ Failed to connect with Db", err);
  }
};

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  connectDB();
});