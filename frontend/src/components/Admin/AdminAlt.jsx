// import React from 'react';

const AdminAlt = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header />
        <StatsSection />
        <div className="grid grid-cols-3 gap-6 mt-6">
          <UsersBreakdown />
          <ServicesTable />
          <LiveTracking />
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="w-64 h-screen bg-dark-700 text-white">
    <div className="p-4">
      <h2 className="text-xl font-bold">Galileo</h2>
    </div>
    <nav className="mt-8">
      <ul>
        <li className="px-4 py-2 hover:bg-dark-600 cursor-pointer">Overview</li>
        <li className="px-4 py-2 hover:bg-dark-600 cursor-pointer">Artisans</li>
        <li className="px-4 py-2 hover:bg-dark-600 cursor-pointer">Customers</li>
        <li className="px-4 py-2 hover:bg-dark-600 cursor-pointer">Suppliers</li>
        <li className="px-4 py-2 hover:bg-dark-600 cursor-pointer">Team Management</li>
      </ul>
    </nav>
  </div>
);

const Header = () => (
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold">Welcome back, Stanley</h1>
    <div className="flex items-center">
      <button className="bg-primary-500 text-white px-4 py-2 rounded">Add Filter</button>
      <select className="ml-4 border p-2 rounded">
        <option>Jan - Present</option>
      </select>
    </div>
  </div>
);

const StatsSection = () => (
  <div className="grid grid-cols-4 gap-6 mt-6">
    {['Vetted Artisans', 'Revenue Generated', 'Service Requests', 'New Customers'].map((item, index) => (
      <div key={index} className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold">{item}</h2>
        <p className="mt-2 text-xl font-semibold">25</p>
        <p className="text-green-500">+0.2 pts</p>
      </div>
    ))}
  </div>
);

const UsersBreakdown = () => (
  <div className="bg-white p-4 rounded shadow col-span-2">
    <h2 className="text-lg font-bold">Users Breakdown</h2>
    <p className="text-sm text-gray-600">Jan - Present</p>
    <div className="mt-4">
      {/* Insert Chart.js or similar library here */}
      <div className="h-40 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const ServicesTable = () => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-lg font-bold">Services</h2>
    <table className="min-w-full mt-4">
      <thead>
        <tr>
          <th className="text-left">Service ID</th>
          <th className="text-left">Customer Name</th>
          <th className="text-left">Artisan Name</th>
          <th className="text-left">Date</th>
          <th className="text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {[
          { id: 'SRV-0626-001', customer: 'Femi', artisan: 'Adebola', date: '2024-06-01', status: 'Successful' },
          { id: 'SRV-0846-001', customer: 'Jess', artisan: 'Vivien', date: '2024-06-01', status: 'In-Progress' },
          { id: 'SRV-1826-001', customer: 'Emeka', artisan: 'John', date: '2024-06-01', status: 'In-Progress' },
        ].map((service, index) => (
          <tr key={index}>
            <td>{service.id}</td>
            <td>{service.customer}</td>
            <td>{service.artisan}</td>
            <td>{service.date}</td>
            <td>{service.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const LiveTracking = () => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-lg font-bold">Live Tracking</h2>
    <div className="mt-4">
      {/* Insert Map library like Google Maps here */}
      <div className="h-40 bg-gray-200 rounded"></div>
    </div>
    <div className="mt-4">
      <p className="font-bold">Vivien Ayomide</p>
      <p>Hair Stylist - Tier 7 - 4.5 ★</p>
      <div className="mt-2">
        <p>Artisan Location: 29 Balogun St, Yaba, Lagos Nigeria</p>
        <p>Customer Location: New Hall, University of Lagos</p>
      </div>
    </div>
  </div>
);

export default AdminAlt;
