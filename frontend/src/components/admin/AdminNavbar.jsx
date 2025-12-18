import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin");
  };

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/admin/heatmap", label: "Heat Map", icon: <FaMapMarkedAlt /> },
    { path: "/admin/stats", label: "Statistics", icon: <FaChartBar /> }
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Admin Title */}
          <h1 className="text-xl font-bold tracking-wide">
            Udaan – Admin Panel
          </h1>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded transition
                  ${
                    location.pathname === item.path
                      ? "bg-gray-700 font-semibold"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-1 bg-red-600"></div>
    </nav>
  );
}
