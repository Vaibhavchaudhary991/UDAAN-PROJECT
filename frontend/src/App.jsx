import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components & Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import ReportCase from "./pages/user/ReportCase";
import TrackCase from "./pages/user/TrackCase";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHeatmap from "./pages/admin/AdminHeatmap";
import AdminStats from "./pages/admin/AdminStats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="report" element={<ReportCase />} />
          <Route path="track" element={<TrackCase />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="heatmap" element={<AdminHeatmap />} />
          <Route path="stats" element={<AdminStats />} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
