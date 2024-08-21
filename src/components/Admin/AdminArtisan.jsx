import React from "react";
import CustomerDemographics from "./CustomerDemographics";
import { chartData, orders, ordersOverview } from "../Admin/data";

const AdminArtisan = () => {
  // Sample data for the chart
  const chartData = [
    { name: "Jan", pts: 1 },
    { name: "Feb", pts: 1.5 },
    { name: "Mar", pts: 2 },
    { name: "Apr", pts: 2.5 },
    { name: "May", pts: 4 },
    { name: "Jun", pts: 5 },
  ];
  return (
    <div className="flex w-full">
      {/* Main Content */}

      <div className="flex-1 p-10 grid grid-cols-2 gap-6">
        <CustomerDemographics />

        {/* Ongoing Orders */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Ongoing Orders</h2>
            <a href="#" className="text-blue-500 text-sm">
              View all
            </a>
          </div>

          {/* Orders List */}
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span
                    className={
                      order.trend === "up" ? "text-green-500" : "text-red-500"
                    }
                  >
                    {order.trend === "up" ? "▲" : "▼"}
                  </span>
                  <span className="text-sm font-semibold">
                    {order.id}. {order.name}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">{order.status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Orders Overview Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg col-span-2">
          <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Job ID</th>
                <th className="px-4 py-2 text-left">Client Name</th>
                <th className="px-4 py-2 text-left">Business Name</th>
                <th className="px-4 py-2 text-left">Date & Time</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample rows */}
              {ordersOverview.map((item) => (
                <tr>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.clientName}</td>
                  <td className="border px-4 py-2">{item.businessName}</td>
                  <td className="border px-4 py-2">{item.dateTime}</td>
                  <td className="border px-4 py-2">{item.location}</td>
                  <td className="border px-4 py-2">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminArtisan;
