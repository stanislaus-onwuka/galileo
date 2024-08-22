import React from "react";

const JobTable = () => {
  const jobs = [
    {
      id: "#001",
      name: "Cynthia Okeke",
      service: "Plumbing Repair",
      date: "2024-07-05, 10:30",
      location: "Ikoyi",
      status: "Completed",
      earnings: "₦35,000.00",
    },
    {
      id: "#002",
      name: "John Doe",
      service: "Electrical Wiring",
      date: "2024-07-05, 14:00",
      location: "Unilag",
      status: "Scheduled",
      earnings: "₦35,000.00",
    },
    // Add more job data here...
  ];

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-medium mb-4">Job Overview</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Job ID</th>
            <th className="px-4 py-2">Client Name</th>
            <th className="px-4 py-2">Service Requested</th>
            <th className="px-4 py-2">Date & Time</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Earnings</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="border px-4 py-2">{job.id}</td>
              <td className="border px-4 py-2">{job.name}</td>
              <td className="border px-4 py-2">{job.service}</td>
              <td className="border px-4 py-2">{job.date}</td>
              <td className="border px-4 py-2">{job.location}</td>
              <td
                className={`border px-4 py-2 ${
                  job.status === "Completed"
                    ? "text-green-500"
                    : job.status === "Scheduled"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {job.status}
              </td>
              <td className="border px-4 py-2">{job.earnings}</td>
              <td className="border px-4 py-2">
                <button className="text-blue-500">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
