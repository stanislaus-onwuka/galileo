import { useQuery } from "@tanstack/react-query";
import artisanApi from "../../api/artisan";
import Loader from "../misc/loader";

// {
//   "client_id": "string",
//   "artisan_id": "string",
//   "request_id": "string",
//   "client_name": "string",
//   "service_type": "string",
//   "price_offer": 0,
//   "description": "string",
//   "status": "pending",
//   "date_time": "2024-09-19T11:20:34.841109Z"
// }

const JobTable = () => {
	const getArtisanJobs = useQuery({
		queryKey: ["artisan-jobs"],
		queryFn: () => artisanApi.getArtisanJobs(),
	});

	function parseISOString(s) {
		var b = s.split(/\D+/);
		return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
	}

	const formatter = new Intl.NumberFormat("en-US");

	const renderTable = () => {
		const { isLoading, isError, isSuccess, data, refetch, error } = getArtisanJobs;

		if (isLoading) {
			return (
				<div className="w-full my-14 flex items-center justify-center py-6">
					<Loader containerClass="w-10 h-10" />
				</div>
			);
		}

		if (isError) {
			return (
				<div className="w-full my-14 flex flex-col items-center text-center justify-center py-6">
					<h3>An error occured</h3>
					<p className="my-3">{error.message}</p>
					<button onClick={refetch} className="border border-default mt-3 rounded-full py-2 px-5">
						Reload
					</button>
				</div>
			);
		}

		if (isSuccess && data.length === 0) {
			return (
				<div className="w-full h-full flex items-center text-center justify-center py-6">
					<h3>No service requests Currently</h3>
				</div>
			);
		}

		if (isSuccess && data.length > 0) {
			return (
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
								Description
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Price Offer
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((job) => (
							<tr key={job.id}>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.request_id}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.client_name}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{job.service_type}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{parseISOString(job.date_time)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{job.description ? job.description : "-"}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											job.status.toLowerCase() === "completed"
												? "text-green-500 bg-green-200"
												: job.status.toLowerCase() === "scheduled"
												? "text-yellow-500 bg-yellow-200"
												: "text-red-500 bg-red-200"
										}`}
									>
										{job.status}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`₦${formatter.format(
									job.price_offer
								)}`}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									<button className="text-blue-500">View</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			);
		}
	};

	return (
		<div className="p-4">
			<div className="flex w-full justify-between items-center mb-4">
				<span className="text-gray-600 text-lg">
					Jobs Overview <strong className="text-neutral-400">{getArtisanJobs.data?.length}</strong>
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
			<div>{renderTable()}</div>
		</div>
	);
};

export default JobTable;
