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
    <div className="p-4">
      <div className="flex w-full justify-between items-center mb-4">
        <span className="text-gray-600 text-lg">
          Jobs Overview <strong className="text-neutral-400">{ jobs.length }</strong>
        </span>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="w-5 h-5 text-gray-500 absolute left-3 top-2.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.386-1.414 1.415-5.387-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <table className="min-w-full table-auto rounded shadow-sm border">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service Requested
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Earnings
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.service}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    job.status === "Completed"
                      ? "text-green-500 bg-green-200"
                      : job.status === "Scheduled"
                      ? "text-yellow-500 bg-yellow-200"
                      : "text-red-500 bg-red-200"
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.earnings}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
