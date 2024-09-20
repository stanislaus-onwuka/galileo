import { useState } from "react";
import ViewServiceRequest from "../../components/Admin/view-service-request";
import { useQuery } from "@tanstack/react-query";
import adminApi from "../../api/admin";
import Loader from "../../components/misc/loader";


const AdminServiceRequests = () => {
	const [showServiceRequestModal, setShowServiceRequestModal] = useState(false);

	const ServiceRequestsTable = () => {
		const getServiceRequestsList = useQuery({
			queryKey: ["service-requests-list"],
			queryFn: () => adminApi.getAllServiceRequests(),
        });
        
        function parseISOString(s) {
            var b = s.split(/\D+/);
            return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
        }
    
        const formatter = new Intl.NumberFormat("en-US");

		const renderTable = () => {
			const { isLoading, isError, isSuccess, data, refetch, error } = getServiceRequestsList;

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
					<div className="w-full h-screen flex items-center text-center justify-center py-6">
						<h3>No service requests available Currently</h3>
					</div>
				);
			}

			if (isSuccess && data.length > 0) {
				return (
					<table className="min-w-full bg-white divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Service ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Customer ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Artisan ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Service type
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Description
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Date & Time
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3"></th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data.map((request, idx) => (
								<tr
									className="cursor-pointer hover:bg-neutral-30"
									// onClick={() => setShowServiceRequestModal(true)}
									key={idx}
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{request._id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{request.client_id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{request.artisan_id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{request.service_type}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{`₦${formatter.format(request.price_offer)}`}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{request.description ?? "-"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{parseISOString(request.date)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
												request.status.toLowerCase()
											)}`}
										>
											{request.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<button className="text-gray-500 hover:text-gray-700">
											<img src="/assets/svgs/dropdown-btn.svg" alt="dropdown" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			}
		};

		const getStatusClass = (status) => {
			switch (status) {
				case "accepted":
					return "text-green-500 bg-green-100";
				case "pending":
					return "text-yellow-500 bg-yellow-100";
				case "declined":
					return "text-red-500 bg-red-100";
				default:
					return "";
			}
		};

		return (
			<div className=" w-full p-6 bg-white rounded-lg mt-6">
				<div className="flex justify-between items-center mb-4">
					<div className="flex w-full justify-between items-center">
						<span className="text-gray-600">
                            Services <strong className="text-neutral-400">{ getServiceRequestsList.data?.length }</strong>
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
				</div>
				<div>{renderTable()}</div>

				<div className="mt-4 flex justify-between items-center">
					<button className="text-gray-500 hover:text-gray-700">← Prev</button>
					<div className="flex space-x-2">
						<button className="text-gray-500 hover:text-gray-700">1</button>
						<button className="text-gray-500 hover:text-gray-700">2</button>
						<button className="text-gray-500 hover:text-gray-700">...</button>
						<button className="text-gray-500 hover:text-gray-700">5</button>
						<button className="text-gray-500 hover:text-gray-700">6</button>
					</div>
					<button className="text-gray-500 hover:text-gray-700">Next →</button>
				</div>
			</div>
		);
	};

	return (
		<div className="bg-white min-h-screen flex flex-col p-6">
			<h2 className="text-2xl font-semibold">Service Requests</h2>
			<ServiceRequestsTable />
			<ViewServiceRequest showModal={showServiceRequestModal} setShowModal={setShowServiceRequestModal} />
		</div>
	);
};

export default AdminServiceRequests;
