import React from "react";

const DashboardHeader = () => {
  return (
    <div className="p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-0">₦35.3M</h1>
        <p className="text-sm text-gray-500">₦35,000 Today, Feb 15</p>
      </div>
      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          New Quote
        </button>
        <button className="bg-gray-200 text-black px-4 py-2 rounded">
          View Quotes
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
