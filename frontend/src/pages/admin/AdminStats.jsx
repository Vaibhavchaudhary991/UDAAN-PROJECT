import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  FaChartBar,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaUsers,
  FaPercent,
  FaShieldAlt,
  FaChartLine
} from "react-icons/fa";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AdminStats() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    caseTaken: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/cases");

        const total = res.data.length;
        const pending = res.data.filter(
          (c) => c.status === "Pending"
        ).length;
        const resolved = res.data.filter(
          (c) => c.status === "Resolved"
        ).length;
        const caseTaken = res.data.filter(
          (c) => c.status === "Case Taken"
        ).length;

        setStats({ total, pending, resolved, caseTaken });
      } catch (err) {
        console.error("Failed to load statistics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Calculate percentages
  const resolvedPercentage = stats.total > 0 ? ((stats.resolved / stats.total) * 100).toFixed(1) : 0;
  const pendingPercentage = stats.total > 0 ? ((stats.pending / stats.total) * 100).toFixed(1) : 0;

  // Chart Data
  const barData = {
    labels: ["Total Cases", "Pending", "In Progress", "Resolved"],
    datasets: [
      {
        label: "Number of Cases",
        data: [stats.total, stats.pending, stats.caseTaken, stats.resolved],
        backgroundColor: ["#3b82f6", "#f59e0b", "#8b5cf6", "#10b981"],
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const pieData = {
    labels: ["Pending", "In Progress", "Resolved"],
    datasets: [
      {
        data: [stats.pending, stats.caseTaken, stats.resolved],
        backgroundColor: ["#f59e0b", "#8b5cf6", "#10b981"],
        borderWidth: 2,
        borderColor: '#ffffff',
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 12
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        boxPadding: 6,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif'
          }
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 12
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        boxPadding: 6,
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                <FaChartBar className="mr-3 text-blue-600" />
                Case Statistics Dashboard
              </h1>
              <p className="text-gray-600 mt-2 max-w-3xl">
                This dashboard provides a statistical overview of reported child labour
                cases, helping administrators track progress and resolution efficiency.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg">
                <FaShieldAlt className="mr-2" />
                <span className="font-semibold">Udaan Analytics</span>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading statistics...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Cases</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
                    <div className="flex items-center mt-2">
                      <FaChartLine className="text-blue-500 mr-1 text-sm" />
                      <span className="text-xs text-gray-500">All reported cases</span>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FaClipboardList className="text-2xl text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Pending</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">{stats.pending}</p>
                    <div className="flex items-center mt-2">
                      <FaPercent className="text-yellow-500 mr-1 text-sm" />
                      <span className="text-xs text-gray-500">{pendingPercentage}% of total</span>
                    </div>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <FaClock className="text-2xl text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">In Progress</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">{stats.caseTaken}</p>
                    <div className="flex items-center mt-2">
                      <FaUsers className="text-purple-500 mr-1 text-sm" />
                      <span className="text-xs text-gray-500">Under investigation</span>
                    </div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaUsers className="text-2xl text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Resolved</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">{stats.resolved}</p>
                    <div className="flex items-center mt-2">
                      <FaPercent className="text-green-500 mr-1 text-sm" />
                      <span className="text-xs text-gray-500">{resolvedPercentage}% resolved rate</span>
                    </div>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FaCheckCircle className="text-2xl text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Bar Chart Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaChartBar className="mr-2 text-blue-600" />
                    Case Distribution
                  </h3>
                  <div className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                    Overview
                  </div>
                </div>
                <div className="h-80">
                  <Bar data={barData} options={chartOptions} />
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-blue-600">Insight:</span> Shows the distribution of cases across different statuses for quick assessment.
                  </p>
                </div>
              </div>

              {/* Pie Chart Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaChartBar className="mr-2 text-teal-600" />
                    Resolution Status
                  </h3>
                  <div className="text-xs px-3 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">
                    Percentages
                  </div>
                </div>
                <div className="h-80">
                  <Pie data={pieData} options={pieOptions} />
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-teal-600">Insight:</span> Visual representation of case resolution progress and pending workload.
                  </p>
                </div>
              </div>
            </div>

            {/* Insights Card */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl shadow-lg p-8 border border-blue-200">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl mr-4">
                  <FaShieldAlt className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Performance Insights</h3>
                  <p className="text-gray-600">Key metrics and recommendations</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Resolution Efficiency</h4>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Resolved Rate</span>
                      <span className="font-semibold text-green-600">{resolvedPercentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                        style={{ width: `${resolvedPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {resolvedPercentage >= 70 
                      ? "Excellent resolution rate! Keep up the great work."
                      : resolvedPercentage >= 50
                      ? "Good progress. Focus on pending cases."
                      : "Needs improvement. Prioritize case resolution."}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Pending Cases Analysis</h4>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Pending Rate</span>
                      <span className="font-semibold text-yellow-600">{pendingPercentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                        style={{ width: `${pendingPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {pendingPercentage <= 30 
                      ? "Well managed! Low pending case count."
                      : pendingPercentage <= 50
                      ? "Manageable workload. Regular follow-ups needed."
                      : "High pending count. Consider increasing team capacity."}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-200">
                <p className="text-gray-700">
                  <span className="font-semibold text-blue-700">Recommendation:</span> A higher resolution rate indicates effective intervention. 
                  Pending cases help prioritize future actions and resource allocation.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}