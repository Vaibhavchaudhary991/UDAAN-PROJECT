const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    childName: {
      type: String,
      required: true
    },
    location: {
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
    userEmail: {
      type: String,
      required: true
    },
    trackingId: {
      type: String,
      unique: true
    },
    status: {
      type: String,
      default: "Pending"
    },
    adminComment: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);
