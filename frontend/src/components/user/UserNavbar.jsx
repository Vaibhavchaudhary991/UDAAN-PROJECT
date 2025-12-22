import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaFlag,
  FaSearch,
  FaSignOutAlt,
  FaUserCircle,
  FaHandsHelping,
  FaHeart
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function UserNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Citizen User");

  // 🔹 Fetch logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name || user.email || "Citizen User");
    }
  }, []);

  // 🔹 Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { path: "/user/dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "/user/report", label: "Report Case", icon: <FaFlag /> },
    { path: "/user/track", label: "Track Case", icon: <FaSearch /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-teal-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/user/dashboard" className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <FaHome className="text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Udaan</h1>
              <p className="text-xs text-blue-100">End Child Labour</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition
                  ${
                    location.pathname === item.path
                      ? "bg-white/20 font-semibold"
                      : "text-blue-100 hover:bg-white/10"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Info + Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
              <FaUserCircle className="text-2xl" />
              <div className="text-sm">
                <p className="font-medium">{userName}</p>
                <p className="text-xs text-blue-200">Logged in</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-white/10"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Mobile User Info */}
            <div className="flex items-center space-x-3 px-4 py-2 text-blue-100">
              <FaUserCircle />
              <span>{userName}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-2 text-red-200"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      <div className="h-1 bg-gradient-to-r from-blue-400 to-teal-400"></div>
    </nav>
  );
}
