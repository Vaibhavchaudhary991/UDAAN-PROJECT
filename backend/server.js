const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const caseRoutes = require("./routes/caseRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Allow requests from the frontend URL (set via environment variable on Render)
const allowedOrigins = [
  process.env.FRONTEND_URL?.replace(/\/$/, ""), // strip trailing slash
  "http://localhost:5173",
  "http://localhost:3000",
  "https://udaan-project-black.vercel.app",
].filter(Boolean); // remove undefined/empty values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        /^https:\/\/.*\.vercel\.app$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS: Origin not allowed — " + origin));
    },
    credentials: true,
  })
);

// Root endpoint
app.get("/", (req, res) => {
  const dbStatus = ["disconnected", "connected", "connecting", "disconnecting"][
    mongoose.connection.readyState
  ] || "unknown";

  res.json({
    status: "online",
    message: "Udaan Backend API is running",
    database: dbStatus,
  });
});

let lastDbError = null;

// Health check endpoint to verify backend and database connectivity
app.get("/api/health", (req, res) => {
  const dbStatus = ["disconnected", "connected", "connecting", "disconnecting"][
    mongoose.connection.readyState
  ] || "unknown";

  const rawUri = process.env.MONGO_URI || "";
  const match = rawUri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@/);
  const u = match ? match[1] : "";
  const p = match ? match[2] : "";

  res.json({
    status: "ok",
    database: dbStatus,
    error: lastDbError,
    debug: {
      user: u ? `${u.slice(0, 5)}... (len: ${u.length})` : "missing",
      passMasked: p ? `${p[0]}***${p[p.length - 1]} (len: ${p.length})` : "missing",
    },
    timestamp: new Date().toISOString()
  });
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/admin", adminRoutes);


const { MONGO_URI } = process.env;
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error("Missing MONGO_URI in environment. Add it to .env.");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    lastDbError = null;
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    lastDbError = err.message;
    console.error("❌ MongoDB connection error:", err.message);
    console.log("Retrying MongoDB connection in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

connectDB();

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
