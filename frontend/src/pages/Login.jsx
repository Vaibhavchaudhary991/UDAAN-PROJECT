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
  FaChild
} from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const res = await api.post("/auth/login", form);

      // store token (basic auth handling)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.user.name || res.data.user.email,
          email: res.data.user.email,
        })
      );

      alert("Login successful");
      navigate("/user/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-emerald-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-200/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="relative w-full max-w-5xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Side - Hero & Information */}
          <div className="bg-gradient-to-br from-blue-600 to-teal-600 text-white p-12 lg:p-16">
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-8">
                  <div className="bg-white/20 p-3 rounded-xl mr-4">
                    <FaHeart className="text-3xl" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Udaan</h1>
                    <p className="text-blue-100 text-sm">Eradication of Child Labour</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-6">
                  Welcome Back, Protector
                </h2>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  Your vigilance saves childhoods. Log in to continue your mission of 
                  reporting and tracking child labour cases in your community.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaChild className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold">Make a Difference</p>
                      <p className="text-sm text-blue-100">Every report matters</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaShieldAlt className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold">Safe & Secure</p>
                      <p className="text-sm text-blue-100">Your identity is protected</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaHandsHelping className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold">Track Progress</p>
                      <p className="text-sm text-blue-100">Monitor reported cases</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
  type="button"
  onClick={() => navigate("/admin")}
  className="
    w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300
    bg-gradient-to-r from-green-600 to-teal-600
    hover:from-green-700 hover:to-teal-700
    shadow-lg hover:shadow-xl
    text-white flex items-center justify-center mt-4
  "
>
   Login as Admin
  <FaArrowRight className="ml-3" />
</button>

              <div className="mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-blue-100 text-sm">
                    <span className="font-semibold">Together We Can:</span> Join thousands of 
                    citizens making a difference in the fight against child labour.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-12 lg:p-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl mb-6">
                <FaUser className="text-3xl text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                User Login
              </h2>
              <p className="text-gray-600">
                Access your account to report cases and track progress
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaEnvelope className="mr-2 text-blue-600" />
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
                    className="w-full p-4 pl-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                  />
                  <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaLock className="mr-2 text-blue-600" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full p-4 pl-12 pr-12 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-gray-100"
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
                <div className="mt-2 flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </Link>
                </div>
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
                    Signing In...
                  </>
                ) : (
                  <>
                    Login to Continue
                    <FaArrowRight className="ml-3" />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link 
                  to="/" 
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center justify-center mt-2"
                >
                  <span className="mr-2">Join Udaan as a Protector</span>
                  <FaHeart className="text-red-500" />
                </Link>
              </p>
            </div>

            {/* Security & Privacy */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6">
                <div className="text-center">
                  <div className="bg-blue-100 p-3 rounded-lg inline-block mb-2">
                    <FaShieldAlt className="text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-600">Secure Login</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-lg inline-block mb-2">
                    <FaUser className="text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600">Privacy Protected</p>
                </div>
                <div className="text-center">
                  <div className="bg-teal-100 p-3 rounded-lg inline-block mb-2">
                    <FaHeart className="text-teal-600" />
                  </div>
                  <p className="text-xs text-gray-600">Make an Impact</p>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Need help?{" "}
                <span className="text-blue-600 font-semibold">help@udaan.org</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}