const Case = require("../models/case");

// CREATE A NEW CASE (USER REPORTS CASE)
exports.createCase = async (req, res) => {
  try {
    const { childName, location, workType, description } = req.body;

    // Basic validation
    if (!childName || !location || !workType) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    // Generate tracking ID
    const trackingId =
      "UD-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const newCase = new Case({
      childName,
      location,
      workType,
      description,
      userEmail: req.user.email, // ✅ FROM JWT
      trackingId,
      status: "Pending"
    });

    await newCase.save();

    res.status(201).json({
      message: "Case reported successfully",
      trackingId
    });
  } catch (error) {
    console.error("CREATE CASE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// TRACK CASE USING TRACKING ID
exports.trackCase = async (req, res) => {
  try {
    const { trackingId } = req.params;

    const caseData = await Case.findOne({ trackingId });

    if (!caseData) {
      return res.status(404).json({
        message: "Case not found"
      });
    }

    res.json(caseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
