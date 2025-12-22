import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

import UserDashboard from "./pages/user/UserDashboard";
import ReportCase from "./pages/user/ReportCase";
import TrackCase from "./pages/user/TrackCase";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHeatmap from "./pages/admin/AdminHeatmap";
import AdminStats from "./pages/admin/AdminStats";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Pages */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="report" element={<ReportCase />} />
          <Route path="track" element={<TrackCase />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* placeholders */}
          <Route path="heatmap" element={<AdminHeatmap />} />
          <Route path="stats" element={<AdminStats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
