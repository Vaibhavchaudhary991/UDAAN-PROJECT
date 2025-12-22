import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaHeart,
  FaShieldAlt,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaHandsHelping,
  FaChild,
  FaCheckCircle,
  FaUsers
} from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await api.post("/auth/signup", form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-200/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="relative w-full max-w-5xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Side - Hero & Information */}
          <div className="bg-gradient-to-br from-green-600 to-teal-600 text-white p-12 lg:p-16">
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-8">
                  <div className="bg-white/20 p-3 rounded-xl mr-4">
                    <FaHeart className="text-3xl" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Udaan</h1>
                    <p className="text-green-100 text-sm">Eradication of Child Labour</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-6">
                  Become a Protector
                </h2>
                <p className="text-green-100 mb-8 leading-relaxed">
                  Join our community of vigilant citizens working together to end child labour. 
                  Your registration is the first step towards making a real difference.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaChild className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold">Save Childhoods</p>
                      <p className="text-sm text-green-100">Report child labour cases anonymously</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaShieldAlt className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold">Secure Platform</p>
                      <p className="text-sm text-green-100">Your identity is always protected</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaCheckCircle className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold">Track Impact</p>
                      <p className="text-sm text-green-100">Monitor case progress in real-time</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center">
                    <FaUsers className="text-2xl mr-3 opacity-80" />
                    <p className="text-green-100 text-sm">
                      <span className="font-semibold">Join 10,000+ Protectors</span> already making a difference in their communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="p-12 lg:p-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl mb-6">
                <FaUserPlus className="text-3xl text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Create Your Account
              </h2>
              <p className="text-gray-600">
                Join Udaan and start making a difference today
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaUser className="mr-2 text-green-600" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                  />
                  <FaUser className="absolute left-4 top-4 text-gray-400" />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaEnvelope className="mr-2 text-green-600" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                  />
                  <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We'll use this for login and important updates
                </p>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaLock className="mr-2 text-green-600" />
                  Create Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full p-4 pl-12 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                  />
                  <FaLock className="absolute left-4 top-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    Use at least 8 characters with a mix of letters, numbers, and symbols
                  </p>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 mr-3 rounded focus:ring-green-500 text-green-600"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-green-600 hover:text-green-800 font-semibold">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-green-600 hover:text-green-800 font-semibold">
                    Privacy Policy
                  </Link>. I understand that my data will be used responsibly for child protection purposes.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300
                  ${isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 shadow-lg hover:shadow-xl'
                  }
                  text-white flex items-center justify-center
                `}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <FaHeart className="mr-3" />
                    Join as a Protector
                    <FaArrowRight className="ml-3" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already protecting childhoods?{" "}
                <Link 
                  to="/login" 
                  className="text-green-600 font-semibold hover:text-green-800 transition-colors flex items-center justify-center mt-2"
                >
                  <span className="mr-2">Login to Your Account</span>
                  <FaArrowRight className="text-sm" />
                </Link>
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h4 className="text-center font-semibold text-gray-700 mb-4">Why Join Udaan?</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <FaShieldAlt className="text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-600">Safe Reporting</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <FaCheckCircle className="text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Case Tracking</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-teal-100 p-2 rounded-lg mr-3">
                    <FaHeart className="text-teal-600" />
                  </div>
                  <span className="text-sm text-gray-600">Make Impact</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <FaHandsHelping className="text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-600">Join Community</span>
                </div>
              </div>
            </div>

            {/* Support Contact */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Questions?{" "}
                <span className="text-green-600 font-semibold">support@udaan.org</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing FaUserPlus icon - using alternative
const FaUserPlus = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 640 512">
    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3zM528 240c17.7 0 32 14.3 32 32v48H608c17.7 0 32 14.3 32 32s-14.3 32-32 32H560v48c0 17.7-14.3 32-32 32s-32-14.3-32-32V384H448c-17.7 0-32-14.3-32-32s14.3-32 32-32h48V272c0-17.7 14.3-32 32-32z"/>
  </svg>
);