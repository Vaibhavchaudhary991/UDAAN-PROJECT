import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import {
  FaUserShield,
  FaLock,
  FaEnvelope,
  FaShieldAlt,
  FaArrowRight,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
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
    const res = await api.post("/auth/admin/login", form);

    // save token if backend sends one
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    alert("Admin login successful");
    navigate("/admin/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-800 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-600/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="relative w-full max-w-5xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Side - Branding & Info */}
          <div className="bg-gradient-to-br from-blue-700 to-teal-700 text-white p-12 lg:p-16">
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-8">
                  <div className="bg-white/20 p-3 rounded-xl mr-4">
                    <FaShieldAlt className="text-3xl" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Udaan NGO</h1>
                    <p className="text-blue-100 text-sm">Admin Portal</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-6">
                  Secure Admin Access
                </h2>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  Access the case management system to oversee child labour interventions, 
                  update case statuses, and monitor rescue operations.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaShieldAlt className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold">Enhanced Security</p>
                      <p className="text-sm text-blue-100">Protected admin dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-lg mr-3">
                      <FaUserShield className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold">Case Management</p>
                      <p className="text-sm text-blue-100">Full control over reported cases</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
  type="button"
  onClick={() => navigate("/login")}
  className="
    w-full py-4 rounded-xl font-semibold text-lg
    transition-all duration-300
    bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600
    hover:from-blue-700 hover:via-cyan-700 hover:to-teal-700
    shadow-lg hover:shadow-xl
    text-white flex items-center justify-center
  "
>
  Back to user login
  <FaArrowRight className="ml-3" />
</button>
     
    <div className="mt-12">
                
                <p className="text-blue-100 text-sm">
                  <span className="font-semibold">Note:</span> This portal is for authorized 
                  NGO administrators only. Unauthorized access is prohibited.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-12 lg:p-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl mb-6">
                <FaUserShield className="text-3xl text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Administrator Login
              </h2>
              <p className="text-gray-600">
                Enter your credentials to access the admin dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <FaEnvelope className="mr-2 text-blue-600" />
                  Admin Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="admin@udaan.org"
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
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300
                  ${isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg hover:shadow-xl'
                  }
                  text-white flex items-center justify-center
                `}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Login to Dashboard
                    <FaArrowRight className="ml-3" />
                  </>
                )}
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start">
                  <FaShieldAlt className="text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">Security Notice</h4>
                    <p className="text-sm text-red-600">
                      This portal is restricted to authorized NGO personnel only. 
                      All activities are logged and monitored for security purposes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Contact */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Need help? Contact{" "}
                <span className="text-blue-600 font-semibold">support@udaan.org</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}