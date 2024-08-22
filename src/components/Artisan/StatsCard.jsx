import React from "react";

const StatsCard = ({ label, value, growth }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md text-center">
      <p className="text-lg font-medium">{label}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p
        className={`text-sm ${growth > 0 ? "text-green-500" : "text-red-500"}`}
      >
        {growth > 0 ? `+${growth}` : growth} pts
      </p>
    </div>
  );
};

export default StatsCard;
