const express = require("express");
const router = express.Router();

const {
  getAllCases,
  updateCase
} = require("../controllers/adminController");

// View all cases
router.get("/cases", getAllCases);

// Update case status & comment
router.put("/cases/track/:trackingId", updateCase);

module.exports = router;
