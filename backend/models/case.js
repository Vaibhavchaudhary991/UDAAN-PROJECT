const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    // Basic case details
    childName: {
      type: String,
      required: true
    },

    workType: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    // User who reported the case
    userEmail: {
      type: String,
      required: true
    },

    // Unique tracking ID
    trackingId: {
      type: String,
      unique: true,
      required: true
    },

    // ✅ STRUCTURED LOCATION (USER-FRIENDLY)
    address: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    // ✅ AUTO-GENERATED (BACKEND ONLY – NOT USER INPUT)
    coordinates: {
      lat: {
        type: Number
      },
      lng: {
        type: Number
      }
    },

    // Case lifecycle
    status: {
      type: String,
      enum: ["Pending", "Resolved" , "Case Taken"],
      default: "Pending"
    },

    // Admin remarks visible to user
    adminComment: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Case", caseSchema);
