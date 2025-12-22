import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  FaFire,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaShieldAlt
} from "react-icons/fa";

export default function AdminHeatmap() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await api.get("/admin/cases");

        // 🔥 Count cases by City + State
        const countMap = {};

        res.data.forEach((c) => {
          const city = c.city || "Unknown";
          const state = c.state || "Unknown";
          const key = `${city}, ${state}`;

          countMap[key] = (countMap[key] || 0) + 1;
        });

        const formatted = Object.entries(countMap)
          .map(([area, count]) => ({ area, count }))
          .sort((a, b) => b.count - a.count);

        setAreas(formatted);
      } catch (err) {
        console.error("Heatmap error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const getRiskStyle = (count) => {
    if (count >= 5)
      return {
        label: "Critical",
        color: "bg-red-600",
        icon: <FaFire />
      };
    if (count >= 3)
      return {
        label: "High",
        color: "bg-orange-500",
        icon: <FaExclamationTriangle />
      };
    if (count >= 2)
      return {
        label: "Medium",
        color: "bg-yellow-400",
        icon: <FaMapMarkerAlt />
      };
    return {
      label: "Low",
      color: "bg-green-500",
      icon: <FaMapMarkerAlt />
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaShieldAlt className="mr-3 text-red-600" />
              Child Labour Intensity Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              High-risk regions based on number of reported cases
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading data...</p>
          ) : areas.length === 0 ? (
            <p className="text-center text-gray-600">No cases available</p>
          ) : (
            <div className="space-y-4">
              {areas.map((item, index) => {
                const risk = getRiskStyle(item.count);

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl text-white ${risk.color}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{risk.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg">
                          {item.area}
                        </h3>
                        <p className="text-sm opacity-90">
                          {item.count} reported case{item.count > 1 && "s"}
                        </p>
                      </div>
                    </div>
 
 
                    <div className="text-right">
                      <p className="text-sm uppercase font-semibold">
                        {risk.label} Risk
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-gray-700">
            <span className="font-semibold text-red-700">Note:</span>  
            Red and orange regions require immediate NGO intervention and
            field-team deployment.
          </p>
        </div>

      </div>
    </div>
  );
}
