import { useState } from "react";
import api from "../../api/api";
import {
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaFileAlt,
  FaPaperPlane,
  FaShieldAlt,
  FaLock,
  FaImage,
  FaCrosshairs
} from "react-icons/fa";

export default function ReportCase() {
  const [form, setForm] = useState({
    childName: "",
    address: "",
    city: "",
    state: "",
    workType: "",
    description: ""
  });

  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [locating, setLocating] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await res.json();
          
          if (data.address) {
            const { road, suburb, neighbourhood, city, town, village, state, state_district } = data.address;
            setForm(prev => ({
              ...prev,
              address: road || suburb || neighbourhood || prev.address,
              city: city || town || village || state_district || prev.city,
              state: state || prev.state
            }));
            alert("Location updated successfully!");
          }
        } catch (err) {
          console.error("Reverse geocoding error:", err);
          alert("Could not determine exact address, but coordinates were detected.");
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Failed to get your location. Please ensure location access is enabled.");
        setLocating(false);
      }
    );
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/cases", {
        ...form,
        image: imagePreview, // Send Base64 image
      });

      setTrackingId(res.data.trackingId);
      alert("Case reported successfully");

      setForm({
        childName: "",
        address: "",
        city: "",
        state: "",
        workType: "",
        description: ""
      });
      setImagePreview(null);
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

              <ul className="space-y-6 mb-8">
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-lg mr-3 mt-1">
                    <FaLock className="text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Confidential & Secure</h4>
                    <p className="text-sm text-gray-600">Your identity remains anonymous throughout the process.</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3 mt-1">
                    <FaMapMarkerAlt className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Precise Location</h4>
                    <p className="text-sm text-gray-600">Include nearby landmarks or shop names for faster response.</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-3 mt-1">
                    <FaImage className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Evidence Matters</h4>
                    <p className="text-sm text-gray-600">Uploading a photo helps NGOs verify the situation quickly.</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3 mt-1">
                    <FaFileAlt className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Detailed Description</h4>
                    <p className="text-sm text-gray-600">Mention the type of work and any visible hazards.</p>
                  </div>
                </li>
              </ul>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-red-100 mb-6">
                <h5 className="font-bold text-red-700 text-sm mb-2 uppercase tracking-wider">Quick Tips:</h5>
                <ul className="text-sm text-gray-700 space-y-2 list-disc pl-4">
                  <li>Keep it brief but accurate.</li>
                  <li>Mention the approximate age of the child.</li>
                  <li>Note the time of day you saw them.</li>
                </ul>
              </div>

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

                {/* Child Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaUser className="mr-2 text-blue-600" />
                    Child's Name (If Known)
                  </label>
                  <input
                    type="text"
                    name="childName"
                    value={form.childName}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-red-600" />
                    Area / Landmark
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50 pr-12"
                    />
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={locating}
                      title="Use Current Location"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FaCrosshairs className={locating ? "animate-spin" : ""} />
                    </button>
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>

                {/* Work Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaBriefcase className="mr-2 text-green-600" />
                    Type of Work
                  </label>
                  <input
                    type="text"
                    name="workType"
                    value={form.workType}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaFileAlt className="mr-2 text-purple-600" />
                    Additional Details
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50 resize-none"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <FaImage className="mr-2 text-indigo-600" />
                    Upload Image (Optional)
                  </label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {imagePreview ? (
                      <div className="text-center">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-40 rounded-lg mb-2 mx-auto"
                        />
                        <p className="text-sm text-gray-500">Click or drag to change image</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FaImage className="text-4xl text-gray-400 mb-2 mx-auto" />
                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold"
                >
                  {loading ? "Submitting..." : "Submit Case Report"}
                </button>
              </form>

              {/* Tracking ID */}
              {trackingId && (
                <div className="mt-6 text-center">
                  <p className="text-green-700 font-semibold">
                    Tracking ID: {trackingId}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
