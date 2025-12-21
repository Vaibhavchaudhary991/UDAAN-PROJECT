const Case = require("../models/case");
const sendEmail = require("../utils/sendEmail");

// GET ALL CASES (ADMIN DASHBOARD + HEATMAP)
exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE CASE STATUS & COMMENT + SEND EMAIL ON RESOLUTION
exports.updateCase = async (req, res) => {
  try {
    const { status, adminComment } = req.body;
    const { trackingId } = req.params;

    const caseData = await Case.findOne({ trackingId });

    if (!caseData) {
      return res.status(404).json({ message: "Case not found" });
    }

    const wasAlreadyResolved = caseData.status === "Resolved";

    // Update fields
    caseData.status = status;
    caseData.adminComment = adminComment;

    await caseData.save();

    // ✅ SEND EMAIL ONLY ON FIRST RESOLUTION
    if (status === "Resolved" && !wasAlreadyResolved) {
      await sendEmail({
        to: caseData.userEmail,
        subject: "Thank You for Reporting – Case Resolved | Udaan",
        html: `
          <h2>Thank You for Taking Action</h2>

          <p>Dear Citizen,</p>

          <p>
            We are happy to inform you that the child labour case you reported
            has been <strong>successfully resolved</strong>.
          </p>

          <h3>Case Details</h3>
          <ul>
            <li><strong>Tracking ID:</strong> ${caseData.trackingId}</li>
            <li><strong>Child Name:</strong> ${caseData.childName}</li>
            <li><strong>Address:</strong> ${caseData.address}</li>
            <li><strong>City:</strong> ${caseData.city}</li>
            <li><strong>State:</strong> ${caseData.state}</li>
            <li><strong>Type of Work:</strong> ${caseData.workType}</li>
          </ul>

          <p>
            Your responsible action helped protect a child’s future.
            We sincerely appreciate your contribution toward ending child labour.
          </p>

          <p>
            Regards,<br/>
            <strong>Udaan NGO</strong><br/>
            Protecting Childhood
          </p>
        `
      });
    }

    res.json({
      message: "Case updated successfully",
      updatedCase: caseData
    });
  } catch (error) {
    console.error("Admin Update Error:", error.message);
    res.status(500).json({ message: "Server error while updating case" });
  }
};
