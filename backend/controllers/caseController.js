const Case = require("../models/case");
const User = require("../models/user");
const axios = require("axios");

// CREATE CASE (AUTO GEO-CODING)
exports.createCase = async (req, res) => {
  try {
    const {
      childName,
      workType,
      description,
      address,
      city,
      state
    } = req.body;

    // 🔐 Get logged-in user from JWT
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // 🌍 Convert City + State to Coordinates (OpenStreetMap)
    const geoRes = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: `${city}, ${state}, India`,
          format: "json",
          limit: 1
        },
        headers: {
          "User-Agent": "Udaan-ChildLabour-Project"
        }
      }
    );

    if (!geoRes.data.length) {
      return res.status(400).json({
        message: "Unable to determine coordinates for the given location"
      });
    }

    const lat = parseFloat(geoRes.data[0].lat);
    const lng = parseFloat(geoRes.data[0].lon);

    // Generate tracking ID
    const trackingId =
      "UD-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Create case (MATCHES SCHEMA)
    const newCase = new Case({
      childName,
      workType,
      description,
      userEmail: user.email, // ✅ FROM TOKEN
      trackingId,
      address,
      city,
      state,
      coordinates: {
        lat,
        lng
      }
    });

    await newCase.save();

    res.status(201).json({
      message: "Case reported successfully",
      trackingId
    });
  } catch (error) {
    console.error("Create Case Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// TRACK CASE USING TRACKING ID
exports.trackCase = async (req, res) => {
  try {
    const caseData = await Case.findOne({
      trackingId: req.params.trackingId
    });

    if (!caseData) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.json(caseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
