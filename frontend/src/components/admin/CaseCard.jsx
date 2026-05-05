import { useState } from "react";
import { 
  FaCalendarAlt, 
  FaUser, 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaSave 
} from "react-icons/fa";
import StatusBadge from "./StatusBadge";

const CaseCard = ({ caseData: c, onUpdate }) => {
  const [status, setStatus] = useState(c.status);
  const [adminComment, setAdminComment] = useState(c.adminComment || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate(c.trackingId, status, adminComment);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Case Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <StatusBadge status={c.status} />
                <div className="text-sm font-semibold text-gray-800">
                  ID: <span className="text-blue-600 font-mono">{c.trackingId}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 truncate">{c.childName}</h3>
            </div>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-400" />
            <span className="font-medium">
              {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "No Date"}
            </span>
          </div>
        </div>
      </div>

      {/* Case Details */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaUser className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Child Details</p>
                <p className="text-sm font-semibold text-gray-900">{c.childName}</p>
                <p className="text-xs text-gray-600">Age: {c.age || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <FaBriefcase className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Work Type</p>
                <p className="text-sm font-semibold text-gray-900">{c.workType}</p>
                <p className="text-xs text-gray-600">Industry: {c.industry || "General"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <FaMapMarkerAlt className="text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Location</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{c.address}</p>
                <p className="text-xs text-gray-600">
                  {c.city}, {c.state}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <FaUser className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{c.userEmail}</p>
                <p className="text-xs text-gray-600">Contact: {c.contactNumber || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Case Description</p>
            <p className="text-sm text-gray-700 line-clamp-3">
              {c.description || "No description provided"}
            </p>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Update Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Pending", "Case Taken", "Resolved"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setStatus(option);
                        setIsEditing(true);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        status === option
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Admin Remarks
                </label>
                <textarea
                  value={adminComment}
                  onChange={(e) => {
                    setAdminComment(e.target.value);
                    setIsEditing(true);
                  }}
                  placeholder="Add remarks or updates..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows="2"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSave}
                disabled={!isEditing}
                className={`w-full lg:w-auto flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  isEditing
                    ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:shadow-lg transform hover:-translate-y-0.5"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <FaSave className="mr-2" />
                {isEditing ? "Save Updates" : "No Changes"}
              </button>
            </div>
          </div>

          {c.adminComment && !isEditing && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs font-medium text-blue-800 mb-1">Previous Remarks</p>
              <p className="text-sm text-blue-900">{c.adminComment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
