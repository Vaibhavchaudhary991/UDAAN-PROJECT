import { useEffect, useState, useMemo } from "react";
import api from "../../api/api";
import {
  FaClipboardList,
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCheckCircle,
  FaHourglassHalf,
  FaUsers,
  FaSave,
  FaShieldAlt,
  FaChartBar,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaEdit,
  FaCalendarAlt
} from "react-icons/fa";

// Status badge component
const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    const configs = {
      "Pending": { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: FaHourglassHalf },
      "Case Taken": { color: "bg-blue-100 text-blue-800 border-blue-200", icon: FaUsers },
      "Resolved": { color: "bg-green-100 text-green-800 border-green-200", icon: FaCheckCircle }
    };
    return configs[status] || configs["Pending"];
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full border ${config.color}`}>
      <Icon className="mr-2 text-xs" />
      <span className="text-xs font-semibold">{status}</span>
    </div>
  );
};

// Case card component
const CaseCard = ({ case: c, onUpdate }) => {
  const [status, setStatus] = useState(c.status);
  const [adminComment, setAdminComment] = useState(c.adminComment || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate(c.trackingId, status, adminComment);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Case Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <StatusBadge status={c.status} />
                <div className="text-sm font-semibold text-gray-800">
                  ID: <span className="text-blue-600 font-mono">{c.trackingId}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 truncate">{c.childName}</h3>
            </div>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-400" />
            <span className="font-medium">
              {new Date(c.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Case Details */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaUser className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Child Details</p>
                <p className="text-sm font-semibold text-gray-900">{c.childName}</p>
                <p className="text-xs text-gray-600">Age: {c.age || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <FaBriefcase className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Work Type</p>
                <p className="text-sm font-semibold text-gray-900">{c.workType}</p>
                <p className="text-xs text-gray-600">Industry: {c.industry || "General"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <FaMapMarkerAlt className="text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Location</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{c.address}</p>
                <p className="text-xs text-gray-600">
                  {c.city}, {c.state}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <FaUser className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{c.userEmail}</p>
                <p className="text-xs text-gray-600">Contact: {c.contactNumber || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Case Description</p>
            <p className="text-sm text-gray-700 line-clamp-3">
              {c.description || "No description provided"}
            </p>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Update Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Pending", "Case Taken", "Resolved"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setStatus(option);
                        setIsEditing(true);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        status === option
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Admin Remarks
                </label>
                <textarea
                  value={adminComment}
                  onChange={(e) => {
                    setAdminComment(e.target.value);
                    setIsEditing(true);
                  }}
                  placeholder="Add remarks or updates..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows="2"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSave}
                disabled={!isEditing}
                className={`w-full lg:w-auto flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  isEditing
                    ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:shadow-lg transform hover:-translate-y-0.5"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <FaSave className="mr-2" />
                {isEditing ? "Save Updates" : "No Changes"}
              </button>
            </div>
          </div>

          {c.adminComment && !isEditing && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs font-medium text-blue-800 mb-1">Previous Remarks</p>
              <p className="text-sm text-blue-900">{c.adminComment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = useMemo(() => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }, [totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  currentPage === page
                    ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/cases");
      setCases(res.data);
      calculateStats(res.data);
    } catch (err) {
      console.error("Failed to load cases:", err);
      alert("Failed to load cases");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (casesData) => {
    const stats = {
      total: casesData.length,
      pending: casesData.filter(c => c.status === "Pending").length,
      inProgress: casesData.filter(c => c.status === "Case Taken").length,
      resolved: casesData.filter(c => c.status === "Resolved").length
    };
    setStats(stats);
  };

  const updateCase = async (trackingId, status, adminComment) => {
    try {
      await api.put(`/admin/cases/track/${trackingId}`, {
        status,
        adminComment
      });
      fetchCases();
    } catch (err) {
      console.error("Failed to update case:", err);
      alert("Failed to update case");
    }
  };

  // Filter and search cases
  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      const matchesSearch = 
        c.childName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.address?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [cases, searchTerm, statusFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const paginatedCases = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCases.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCases, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
            <FaShieldAlt className="absolute inset-0 m-auto text-blue-600 text-3xl" />
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading dashboard...</p>
          <p className="text-sm text-gray-500">Fetching case data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Case Management Dashboard</h1>
                <p className="text-gray-600">Monitor and manage child labour intervention cases</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchCases}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                <FaChartBar />
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FaClipboardList className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <FaHourglassHalf className="text-yellow-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.inProgress}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.resolved}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <FaCheckCircle className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by child name, tracking ID, location, or reporter..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Case Taken">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredCases.length} of {cases.length} cases
          </div>
        </div>

        {/* Cases List */}
        <div className="space-y-6">
          {paginatedCases.map((c) => (
            <CaseCard key={c._id} case={c} onUpdate={updateCase} />
          ))}

          {filteredCases.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-200 text-center">
              <FaClipboardList className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No cases found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm || statusFilter !== "All"
                  ? "Try adjusting your search or filter criteria"
                  : "No cases have been reported yet. Check back later."}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredCases.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </main>
    </div>
  );
}