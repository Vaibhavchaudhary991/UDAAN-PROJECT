const Case = require("../models/case");

// GET ALL CASES (ADMIN DASHBOARD)
exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE CASE STATUS & COMMENT
exports.updateCase = async (req, res) => {
  try {
    const { status, adminComment } = req.body;
    const { trackingId } = req.params;

    const updatedCase = await Case.findOneAndUpdate(
      { trackingId },
      { status, adminComment },
      { new: true }
    );

    if (!updatedCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.json({
      message: "Case updated successfully",
      updatedCase
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

