import { useEffect, useState, useMemo, useCallback } from "react";
import api from "../../api/api";
import {
  FaClipboardList,
  FaShieldAlt,
  FaChartBar,
  FaSearch,
  FaFilter,
  FaHourglassHalf,
  FaCheckCircle,
  FaUsers
} from "react-icons/fa";

// Components
import CaseCard from "../../components/admin/CaseCard";
import Pagination from "../../components/admin/Pagination";

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

  const calculateStats = useCallback((casesData) => {
    const stats = {
      total: casesData.length,
      pending: casesData.filter(c => c.status === "Pending").length,
      inProgress: casesData.filter(c => c.status === "Case Taken").length,
      resolved: casesData.filter(c => c.status === "Resolved").length
    };
    setStats(stats);
  }, []);

  const fetchCases = useCallback(async () => {
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
  }, [calculateStats]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

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
            <CaseCard key={c._id} caseData={c} onUpdate={updateCase} />
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