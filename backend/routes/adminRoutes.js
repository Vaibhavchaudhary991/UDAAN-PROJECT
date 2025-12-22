const express = require("express");
const router = express.Router();

const {
  getAllCases,
  updateCase
} = require("../controllers/adminController");

// ✅ GET all cases
router.get("/cases", getAllCases);

// ✅ UPDATE case by trackingId
router.put("/cases/track/:trackingId", updateCase);

module.exports = router;
