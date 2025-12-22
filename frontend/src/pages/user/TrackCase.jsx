import { useState } from "react";
import api from "../../api/api";
import { 
  FaSearch, 
  FaUser, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaClipboardCheck,
  FaComment,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaHourglassHalf,
  FaCopy,
  FaQrcode
} from "react-icons/fa";

export default function TrackCase() {
  const [trackingId, setTrackingId] = useState("");
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCaseData(null);

    try {
      const res = await api.get(`/cases/${trackingId}`);
      setCaseData(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Case not found");
    } finally {
      setLoading(false);
    }
  };

  // Status configuration
  const statusConfig = {
    "Pending": {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: <FaClock className="text-yellow-600" />,
      badgeColor: "bg-yellow-500"
    },
    "In Progress": {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <FaHourglassHalf className="text-blue-600" />,
      badgeColor: "bg-blue-500"
    },
    "Under Investigation": {
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: <FaSearch className="text-purple-600" />,
      badgeColor: "bg-purple-500"
    },
    "Resolved": {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: <FaCheckCircle className="text-green-600" />,
      badgeColor: "bg-green-500"
    },
    "Closed": {
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: <FaClipboardCheck className="text-gray-600" />,
      badgeColor: "bg-gray-500"
    }
  };

  const getStatusConfig = (status) => {
    return statusConfig[status] || statusConfig["Pending"];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl mb-6">
            <FaSearch className="text-3xl text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Track Your Case
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your Tracking ID to monitor the progress and get real-time updates on the reported case.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Info Panel */}
          <div className="md:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 shadow-lg h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaQrcode className="mr-3 text-blue-600" />
                How to Track
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-lg mr-3 shadow-sm">
                    <span className="font-bold text-blue-700">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Enter Tracking ID</h4>
                    <p className="text-sm text-gray-600">Use the ID received after reporting</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-lg mr-3 shadow-sm">
                    <span className="font-bold text-blue-700">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Click Track</h4>
                    <p className="text-sm text-gray-600">Get instant case status</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-lg mr-3 shadow-sm">
                    <span className="font-bold text-blue-700">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Monitor Progress</h4>
                    <p className="text-sm text-gray-600">Regular updates from NGO teams</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
                <p className="text-sm text-gray-700 italic">
                  "Transparency in every step. Your report leads to real change."
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2">
            {/* Search Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <form onSubmit={handleTrack} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaSearch className="mr-2 text-blue-600" />
                    Enter Tracking ID
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="e.g., UDAAN-2024-ABC123"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                      required
                      className="flex-1 p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 font-mono text-lg"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className={`
                        px-8 rounded-xl font-semibold text-lg transition-all duration-300
                        ${loading 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg hover:shadow-xl'
                        }
                        text-white flex items-center justify-center whitespace-nowrap
                      `}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Tracking...
                        </>
                      ) : (
                        <>
                          <FaSearch className="mr-2" />
                          Track Case
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Lost your ID? Check your email or contact support@udaan.org
                  </p>
                </div>
              </form>
            </div>

            {/* Case Details Card */}
            {caseData && (
              <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
                {/* Status Header */}
                <div className={`${getStatusConfig(caseData.status).color} rounded-xl p-6 border mb-8`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4">
                        {getStatusConfig(caseData.status).icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">Case Status</p>
                        <h3 className="text-2xl font-bold mt-1">{caseData.status}</h3>
                      </div>
                    </div>
                    <div className={`w-4 h-4 ${getStatusConfig(caseData.status).badgeColor} rounded-full animate-pulse`}></div>
                  </div>
                </div>

                {/* Case Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center mb-3">
                      <FaUser className="text-blue-600 mr-2" />
                      <h4 className="font-semibold text-gray-700">Child Details</h4>
                    </div>
                    <p className="text-lg font-medium text-gray-800">{caseData.childName}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center mb-3">
                      <FaMapMarkerAlt className="text-red-600 mr-2" />
                      <h4 className="font-semibold text-gray-700">Location</h4>
                    </div>
                    <p className="text-lg font-medium text-gray-800">{caseData.location}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center mb-3">
                      <FaBriefcase className="text-green-600 mr-2" />
                      <h4 className="font-semibold text-gray-700">Work Type</h4>
                    </div>
                    <p className="text-lg font-medium text-gray-800">{caseData.workType}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center mb-3">
                      <FaClipboardCheck className="text-purple-600 mr-2" />
                      <h4 className="font-semibold text-gray-700">Tracking ID</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <code className="text-lg font-bold text-blue-700 tracking-wider">
                        {trackingId}
                      </code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(trackingId)}
                        className="text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-lg transition-colors flex items-center"
                      >
                        <FaCopy className="mr-1" /> Copy
                      </button>
                    </div>
                  </div>
                </div>

                {/* Admin Update */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center mb-4">
                    <FaComment className="text-blue-600 mr-3 text-xl" />
                    <h4 className="font-semibold text-gray-800 text-lg">Latest Update from NGO</h4>
                  </div>
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    {caseData.adminComment ? (
                      <div className="space-y-3">
                        <p className="text-gray-700 leading-relaxed">{caseData.adminComment}</p>
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-500">
                            Last updated: {caseData.updatedAt ? new Date(caseData.updatedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'Recently'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <FaExclamationCircle className="text-yellow-500 text-3xl mx-auto mb-3" />
                        <p className="text-gray-600">No updates available yet. Our team is working on this case.</p>
                        <p className="text-sm text-gray-500 mt-2">Check back in 24-48 hours for updates</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    <span className="font-semibold">Need Help?</span> Contact our support team at 
                    <span className="text-blue-600 font-medium"> support@udaan.org</span> or call 
                    <span className="text-blue-600 font-medium"> 1800-XXX-UDAN</span>
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!caseData && !loading && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Enter Tracking ID to Begin</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Use the tracking ID you received after reporting the case to view its current status and updates.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}