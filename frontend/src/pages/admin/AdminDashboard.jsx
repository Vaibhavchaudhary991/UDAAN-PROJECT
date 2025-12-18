import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  FaClipboardList,
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaEnvelope,
  FaCheckCircle,
  FaHourglassHalf,
  FaUsers,
  FaEdit,
  FaSave,
  FaClipboardCheck,
  FaShieldAlt,
  FaChartBar
} from "react-icons/fa";

export default function AdminDashboard() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await api.get("/admin/cases");
      setCases(res.data);
    } catch (err) {
      alert("Failed to load cases");
    } finally {
      setLoading(false);
    }
  };

  const updateCase = async (trackingId, status, adminComment) => {
    try {
      await api.put(`/admin/cases/track/${trackingId}`, {
        status,
        adminComment
      });
      alert("Case updated successfully");
      fetchCases();
    } catch (err) {
      alert("Failed to update case");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                <FaShieldAlt className="mr-3 text-blue-600" />
                NGO Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Manage and update child labour cases reported through Udaan
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-3 md:mt-0">
              <div className="text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                <span className="font-semibold">{cases.length}</span> Cases
              </div>
              <button
                onClick={fetchCases}
                className="flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all text-sm"
              >
                <FaChartBar className="mr-1.5" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Cases List */}
        <div className="space-y-4">
          {cases.map((c) => (
            <div
              key={c._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              {/* Compact Case Details */}
              <div className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${
                      c.status === "Resolved" 
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : c.status === "Case Taken"
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    }`}>
                      {c.status}
                    </div>
                    <div className="font-semibold text-gray-800 text-sm">
                      ID: <span className="text-blue-600">{c.trackingId}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 md:mt-0">
                    Reported by: <span className="font-medium">{c.userEmail}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-blue-500 text-sm" />
                    <div>
                      <p className="text-xs text-gray-500">Child Name</p>
                      <p className="text-sm font-medium text-gray-800 truncate">{c.childName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-red-500 text-sm" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-800 truncate">{c.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <FaBriefcase className="text-green-500 text-sm" />
                    <div>
                      <p className="text-xs text-gray-500">Work Type</p>
                      <p className="text-sm font-medium text-gray-800 truncate">{c.workType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`p-1.5 rounded ${
                      c.status === "Resolved" 
                        ? "bg-green-100 text-green-600"
                        : c.status === "Case Taken"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {c.status === "Resolved" ? <FaCheckCircle className="text-xs" /> : 
                       c.status === "Case Taken" ? <FaUsers className="text-xs" /> : 
                       <FaHourglassHalf className="text-xs" />}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className={`text-sm font-semibold ${
                        c.status === "Resolved" ? "text-green-600" :
                        c.status === "Case Taken" ? "text-blue-600" : "text-yellow-600"
                      }`}>
                        {c.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Actions - More Compact */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="space-y-3">
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Update Status
                      </label>
                      <select
                        defaultValue={c.status}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                        onChange={(e) => (c.status = e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Case Taken">Case Taken</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Action / Remarks
                      </label>
                      <input
                        type="text"
                        defaultValue={c.adminComment}
                        placeholder="E.g. Field team assigned / Child rescued"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                        onChange={(e) => (c.adminComment = e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => updateCase(c.trackingId, c.status, c.adminComment)}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-md hover:from-blue-700 hover:to-teal-700 transition-all text-sm shadow-sm hover:shadow"
                    >
                      <FaSave className="mr-1.5 text-xs" />
                      Save Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {cases.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <FaClipboardList className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No cases reported yet
              </h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                When cases are reported, they will appear here for management.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}