import { Link, useLocation } from "react-router-dom";
import { 
  FaHome, 
  FaFlag, 
  FaSearch, 
  FaSignOutAlt,
  FaUserCircle,
  FaHandsHelping,
  FaHeart
} from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/user/dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "/user/report", label: "Report Case", icon: <FaFlag /> },
    { path: "/user/track", label: "Track Case", icon: <FaSearch /> },
    { path: "/about", label: "About Udaan", icon: <FaHeart /> },
    { path: "/get-involved", label: "Get Involved", icon: <FaHandsHelping /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-teal-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <Link 
              to="/user/dashboard" 
              className="flex items-center space-x-3 group"
            >
              <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                <FaHome className="text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Udaan</h1>
                <p className="text-xs text-blue-100">End Child Labour</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                  ${location.pathname === item.path 
                    ? "bg-white/20 text-white font-semibold" 
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-2">
              <FaUserCircle className="text-2xl" />
              <div className="text-sm">
                <p className="font-medium">Welcome, Protector</p>
                <p className="text-blue-200 text-xs">Making a Difference</p>
              </div>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-100 hover:bg-white/10 hover:text-white transition-all">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="space-y-1">
              <div className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-800/95 backdrop-blur-sm rounded-b-xl shadow-xl border-t border-blue-600">
            <div className="py-4 px-2 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                    ${location.pathname === item.path 
                      ? "bg-white/20 text-white font-semibold" 
                      : "text-blue-100 hover:bg-white/10"
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-blue-700">
                <div className="flex items-center space-x-3 px-4 py-3">
                  <FaUserCircle className="text-2xl" />
                  <div>
                    <p className="font-medium">Welcome, Protector</p>
                    <p className="text-blue-200 text-sm">Making a Difference</p>
                  </div>
                </div>
                
                <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-white/10 w-full">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Indicator Bar */}
      <div className="h-1 bg-gradient-to-r from-blue-400 to-teal-400"></div>
    </nav>
  );
}