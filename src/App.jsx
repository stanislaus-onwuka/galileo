import React, { useState } from "react";
import { IoHomeOutline, IoSettingsOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { FaUsersCog } from "react-icons/fa";
import { BsBoxSeam, BsPeople, BsTruck } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { chartData, orders, ordersOverview } from "./data";

const App = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  // Sample data for the chart
  const chartData = [
    { name: "Jan", pts: 1 },
    { name: "Feb", pts: 1.5 },
    { name: "Mar", pts: 2 },
    { name: "Apr", pts: 2.5 },
    { name: "May", pts: 4 },
    { name: "Jun", pts: 5 },
  ];

  // Sample data for the orders list

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${isMinimized ? "w-20" : "w-64"
          } h-screen bg-[#092328] text-white flex flex-col transition-all duration-300`}
      >
        {/* Logo and User Profile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isMinimized && (
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-2">
                <span className="text-2xl font-bold">🌙</span>
              </div>
              <h1 className="text-2xl font-bold">Galileo</h1>
            </div>
          )}
          <div className="flex items-center justify-center">
            <img
              src="https://wallpapers.com/images/featured/grant-gustin-pictures-8u6z35ug6jeqwxco.jpg" // Replace with your avatar image link
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
              >
                <IoHomeOutline size={24} />
                {!isMinimized && <span className="text-lg">Overview</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
              >
                <FaUsersCog size={24} />
                {!isMinimized && <span className="text-lg">Artisans</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
              >
                <BsTruck size={24} />
                {!isMinimized && <span className="text-lg">Suppliers</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
              >
                <BsPeople size={24} />
                {!isMinimized && <span className="text-lg">Team Management</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
              >
                <FiLogOut size={24} />
                {!isMinimized && <span className="text-lg">Logout</span>}
              </a>
            </li>
          </ul>
        </nav>

        {/* Footer Menu */}
        <div className="p-4 border-t border-gray-700 flex flex-col space-y-4">
          <button
            onClick={toggleSidebar}
            className="flex items-center space-x-4 p-2 text-lg rounded hover:bg-gray-700"
          >
            {isMinimized ? (
              <IoChevronForwardOutline size={24} />
            ) : (
              <IoChevronBackOutline size={24} />
            )}
            {!isMinimized && <span>Collapse</span>}
          </button>
          <a
            href="#"
            className="flex items-center space-x-4 p-2 text-lg rounded hover:bg-gray-700"
          >
            <IoSettingsOutline size={24} />
            {!isMinimized && <span>Settings</span>}
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className='absolute pl-[18rem] pt-1.5 text-2xl font-semibold'>
        <p>Overview</p>

      </div>

      <div className="flex-1 p-10 grid grid-cols-2 gap-6">
        {/* Breakdown Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Breakdown</h2>
            <select className="border border-gray-300 p-2 rounded-lg">
              <option>Jan - Present</option>
            </select>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button className="text-black font-semibold border-b-2 border-black">Review Levels</button>
            <button className="text-gray-500">Completed Jobs</button>
            <button className="text-gray-500">Cashflow</button>
          </div>

          {/* Line Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="pts"
                stroke="#8884d8"
                fill="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Ongoing Orders */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Ongoing Orders</h2>
            <a href="#" className="text-blue-500 text-sm">View all</a>
          </div>

          {/* Orders List */}
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className={order.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {order.trend === "up" ? "▲" : "▼"}
                  </span>
                  <span className="text-sm font-semibold">{order.id}. {order.name}</span>
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
              {ordersOverview.map((item)=><tr>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.clientName}</td>
                <td className="border px-4 py-2">{item.businessName}</td>
                <td className="border px-4 py-2">{item.dateTime}</td>
                <td className="border px-4 py-2">{item.location}</td>
                <td className="border px-4 py-2">{item.status}</td>
              </tr> )}
              
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
