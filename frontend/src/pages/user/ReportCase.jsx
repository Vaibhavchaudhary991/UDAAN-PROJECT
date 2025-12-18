import { useState } from "react";
import api from "../../api/api";
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaFileAlt, FaPaperPlane, FaShieldAlt, FaLock } from "react-icons/fa";

export default function ReportCase() {
  const [form, setForm] = useState({
    childName: "",
    location: "",
    workType: "",
    description: ""
  });

  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/cases", form);

      setTrackingId(res.data.trackingId);
      alert("Case reported successfully");

      setForm({
        childName: "",
        location: "",
        workType: "",
        description: ""
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to report case");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl mb-6">
            <FaShieldAlt className="text-3xl text-red-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Report Child Labour Case
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your report can save a childhood. Fill in the details below to help us take immediate action.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left Info Card */}
          <div className="md:col-span-2">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-lg h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaShieldAlt className="mr-3 text-red-600" />
                Safe Reporting
              </h3>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-lg mr-3">
                    <FaLock className="text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Confidential & Secure</h4>
                    <p className="text-sm text-gray-600">Your identity is protected</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <FaPaperPlane className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Immediate Action</h4>
                    <p className="text-sm text-gray-600">Case forwarded to NGOs within 24 hours</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <FaUser className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Track Progress</h4>
                    <p className="text-sm text-gray-600">Use tracking ID to monitor case status</p>
                  </div>
                </li>
              </ul>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-700 italic">
                  "Every report is a step toward ending child labour. Thank you for being a protector."
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Child Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaUser className="mr-2 text-blue-600" />
                    Child's Name (If Known)
                  </label>
                  <input
                    type="text"
                    name="childName"
                    placeholder="Enter child's name or description"
                    value={form.childName}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                  />
                </div>

                {/* Location Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-red-600" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Street, Area, City, Landmark"
                    value={form.location}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                  />
                </div>

                {/* Work Type Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaBriefcase className="mr-2 text-green-600" />
                    Type of Work
                  </label>
                  <input
                    type="text"
                    name="workType"
                    placeholder="Factory, Shop, Construction, Domestic Work, etc."
                    value={form.workType}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaFileAlt className="mr-2 text-purple-600" />
                    Additional Details
                  </label>
                  <textarea
                    name="description"
                    placeholder="Time of day, duration, condition of the child, any other observations..."
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300
                    ${loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-xl'
                    }
                    text-white flex items-center justify-center
                  `}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Processing Report...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-3" />
                      Submit Case Report
                    </>
                  )}
                </button>
              </form>

              {/* Success Message */}
              {trackingId && (
                <div className="mt-8 animate-fade-in">
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-2xl p-8 shadow-lg">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaShieldAlt className="text-2xl text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">
                          Case Reported Successfully!
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Thank you for taking action. Your report has been submitted and will be processed immediately.
                        </p>
                        
                        <div className="bg-white rounded-xl p-6 mb-4">
                          <p className="text-sm text-gray-600 mb-2">Your Tracking ID:</p>
                          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <code className="text-2xl font-bold text-blue-700 tracking-wider">
                              {trackingId}
                            </code>
                            <button 
                              onClick={() => navigator.clipboard.writeText(trackingId)}
                              className="text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg transition-colors"
                            >
                              Copy ID
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Important:</span> Save this Tracking ID to check your case status in the Track section.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-blue-50 rounded-xl px-6 py-4 border border-blue-200">
            <p className="text-gray-700">
              <span className="font-semibold text-blue-700">Note:</span> All reports are treated with utmost confidentiality. 
              False reporting may lead to legal action under relevant laws.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}