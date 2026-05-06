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
].filter(Boolean); // remove undefined/empty values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS: Origin not allowed — " + origin));
    },
    credentials: true,
  })
);

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

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
