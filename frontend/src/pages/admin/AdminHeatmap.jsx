import { useEffect, useState } from "react";
import api from "../../api/api";
import { FaMapMarkedAlt, FaFire, FaExclamationTriangle, FaChartBar, FaShieldAlt, FaMapPin, FaEye } from "react-icons/fa";

export default function AdminHeatmap() {
  const [locationStats, setLocationStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxCount, setMaxCount] = useState(1);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        // Admin API that returns all cases
        const res = await api.get("/admin/cases");

        // Count cases per location
        const locationCount = {};

        res.data.forEach((c) => {
          const loc = c.location?.trim() || "Unknown Location";
          locationCount[loc] = (locationCount[loc] || 0) + 1;
        });

        // Convert to array & sort by count
        const formatted = Object.entries(locationCount)
          .map(([location, count]) => ({ location, count }))
          .sort((a, b) => b.count - a.count);

        setLocationStats(formatted);
        
        // Find maximum count for heat intensity calculation
        if (formatted.length > 0) {
          setMaxCount(Math.max(...formatted.map(item => item.count)));
        }
      } catch (err) {
        console.error("Failed to load heatmap data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  // Calculate heat intensity (0 to 1)
  const getHeatIntensity = (count) => {
    return maxCount > 0 ? count / maxCount : 0;
  };

  // Get heat color based on intensity
  const getHeatColor = (intensity) => {
    if (intensity >= 0.8) return "bg-gradient-to-r from-red-600 to-orange-600";
    if (intensity >= 0.6) return "bg-gradient-to-r from-orange-500 to-amber-500";
    if (intensity >= 0.4) return "bg-gradient-to-r from-yellow-500 to-amber-400";
    if (intensity >= 0.2) return "bg-gradient-to-r from-green-400 to-emerald-500";
    return "bg-gradient-to-r from-blue-400 to-cyan-500";
  };

  // Get text color based on intensity
  const getTextColor = (intensity) => {
    return intensity >= 0.6 ? "text-white" : "text-gray-800";
  };

  // Get border color based on intensity
  const getBorderColor = (intensity) => {
    if (intensity >= 0.8) return "border-red-300";
    if (intensity >= 0.6) return "border-orange-300";
    if (intensity >= 0.4) return "border-yellow-300";
    if (intensity >= 0.2) return "border-green-300";
    return "border-blue-300";
  };

  // Get heat icon based on count
  const getHeatIcon = (count) => {
    if (count >= 5) return <FaFire className="text-xl animate-pulse" />;
    if (count >= 3) return <FaExclamationTriangle className="text-xl" />;
    if (count >= 2) return <FaMapPin className="text-xl" />;
    return <FaEye className="text-xl" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                <FaMapMarkedAlt className="mr-3 text-red-600" />
                Child Labour Heatmap
              </h1>
              <p className="text-gray-600 mt-2 max-w-3xl">
                This view highlights regions with a higher concentration of reported
                child labour cases. Darker indicators represent higher reporting
                frequency.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg">
                <FaShieldAlt className="mr-2" />
                <span className="font-semibold">Risk Analysis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaChartBar className="text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">Heat Intensity Legend</h3>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {[
              { label: "Very High", color: "bg-gradient-to-r from-red-600 to-orange-600", text: "text-white", intensity: "≥ 80%" },
              { label: "High", color: "bg-gradient-to-r from-orange-500 to-amber-500", text: "text-white", intensity: "60-79%" },
              { label: "Medium", color: "bg-gradient-to-r from-yellow-500 to-amber-400", text: "text-gray-800", intensity: "40-59%" },
              { label: "Low", color: "bg-gradient-to-r from-green-400 to-emerald-500", text: "text-gray-800", intensity: "20-39%" },
              { label: "Very Low", color: "bg-gradient-to-r from-blue-400 to-cyan-500", text: "text-gray-800", intensity: "< 20%" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`h-4 rounded-t-lg ${item.color} ${item.text} mb-2`}></div>
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-500">{item.intensity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading heatmap data...</p>
              </div>
            </div>
          ) : locationStats.length === 0 ? (
            <div className="text-center py-12">
              <FaMapMarkedAlt className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Cases Available</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                When cases are reported, they will appear here with heat intensity visualization.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    <span className="text-red-600">High-Risk</span> Locations ({locationStats.length})
                  </h3>
                  <div className="text-sm text-gray-500">
                    Max cases: <span className="font-bold text-red-600">{maxCount}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Sorted by number of reported cases. Click on a location for detailed view.
                </p>
              </div>

              {locationStats.map((item, index) => {
                const intensity = getHeatIntensity(item.count);
                const heatColor = getHeatColor(intensity);
                const textColor = getTextColor(intensity);
                const borderColor = getBorderColor(intensity);
                const heatIcon = getHeatIcon(item.count);
                const percentage = Math.round(intensity * 100);

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-5 rounded-xl border ${borderColor} ${heatColor} ${textColor} transition-all hover:scale-[1.02] hover:shadow-lg`}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg">
                        {heatIcon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {item.location}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm opacity-90">
                            {item.count} reported {item.count === 1 ? 'case' : 'cases'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            intensity >= 0.8 ? 'bg-white/30' : 
                            intensity >= 0.6 ? 'bg-white/25' : 
                            intensity >= 0.4 ? 'bg-white/20' : 
                            intensity >= 0.2 ? 'bg-white/15' : 'bg-white/10'
                          }`}>
                            {percentage}% intensity
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="mr-4 hidden md:block">
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">{item.count}</div>
                          <div className="text-xs opacity-80">Cases</div>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg ${textColor.includes('white') ? 'bg-white/20' : 'bg-gray-100'}`}>
                        <FaMapMarkedAlt className="text-xl" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Insights Card */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-lg p-8 border border-red-200">
          <div className="flex items-start mb-6">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-3 rounded-xl mr-4">
              <FaShieldAlt className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Risk Analysis & Recommendations</h3>
              <p className="text-gray-600">Prioritizing intervention areas based on heatmap data</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <FaExclamationTriangle className="text-red-500 mr-2" />
                High-Risk Areas
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Locations with 3+ reported cases require immediate attention and priority intervention.
              </p>
              <div className="text-sm text-gray-500">
                {locationStats.filter(item => item.count >= 3).length} locations identified as high-risk
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <FaMapMarkedAlt className="text-blue-500 mr-2" />
                Action Plan
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-2"></span>
                  Deploy field teams to high-intensity areas
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2"></span>
                  Increase awareness campaigns in medium-risk zones
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></span>
                  Monitor low-risk areas for emerging patterns
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-red-200">
            <p className="text-gray-700">
              <span className="font-semibold text-red-700">Important:</span> This heatmap is generated dynamically based on
              reported cases. It helps administrators prioritize high-risk regions for
              immediate action. Regular monitoring of emerging hotspots is recommended.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}