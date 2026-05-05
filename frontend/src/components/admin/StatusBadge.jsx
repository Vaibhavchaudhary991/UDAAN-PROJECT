import { FaHourglassHalf, FaUsers, FaCheckCircle } from "react-icons/fa";

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

export default StatusBadge;
