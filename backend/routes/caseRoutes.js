const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCase,
  trackCase
} = require("../controllers/caseController");

// User must be logged in to report
router.post("/", authMiddleware, createCase);

// Tracking is public
router.get("/:trackingId", trackCase);

module.exports = router;
