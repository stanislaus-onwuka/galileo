import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { orders, ordersOverview } from "./data";


const Admin = () => {
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
    <>
      <div className="flex w-full">
        {/* Main Content */}
        <div className="absolute pl-[18rem] pt-1.5 text-2xl font-semibold">
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
              <button className="text-black font-semibold border-b-2 border-black">
                Review Levels
              </button>
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
              <a href="#" className="text-blue-500 text-sm">
                View all
              </a>
            </div>

            {/* Orders List */}
            <ul className="space-y-4">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="flex justify-between items-center"
                >
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
                {ordersOverview.map((item, idx) => (
                  <tr key={idx}>
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
    </>
  );
};

export default Admin;
