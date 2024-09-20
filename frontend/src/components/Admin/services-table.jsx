import { useQuery } from "@tanstack/react-query";
import adminApi from "../../api/admin";
import Loader from "../misc/loader";
import { useState } from "react";
import ServiceRequestsConfirmation from "./service-requests-confirmation";

// const servicesData = [
// 	{ id: "SRV-0626-031", customer: "Femi", artisan: "Adebola", date: "2024-06-01", status: "Successful" },
// 	{ id: "SRV-0848-001", customer: "Jess", artisan: "Vivien", date: "2024-06-01", status: "In-Progress" },
// 	{ id: "SRV-1626-001", customer: "Emeka", artisan: "John", date: "2024-06-01", status: "In-Progress" },
// 	{ id: "SRV-0226-001", customer: "Yemi", artisan: "Onifade", date: "2024-06-01", status: "Successful" },
// 	{ id: "SRV-6626-281", customer: "Oscar", artisan: "Efe", date: "2024-06-01", status: "Pending" },
// 	{ id: "SRV-0018-921", customer: "Sayo", artisan: "Daniel", date: "2024-06-01", status: "Canceled" },
// ];

const ServicesTable = () => {
	const [selectedService, setSelectedService] = useState(null);

	const getServiceRequestsList = useQuery({
		queryKey: ["service-requests-list"],
		queryFn: () => adminApi.getPendingServiceRequests(),
	});

	function parseISOString(s) {
		var b = s.split(/\D+/);
		return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
	}

	const formatter = new Intl.NumberFormat("en-US");

	// const statusColor = (status) => {
	// 	switch (status) {
	// 		case "Successful":
	// 			return "text-green-500";
	// 		case "In-Progress":
	// 			return "text-yellow-500";
	// 		case "Pending":
	// 			return "text-blue-500";
	// 		case "Canceled":
	// 			return "text-red-500";
	// 		default:
	// 			return "text-gray-500";
	// 	}
	// };

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
				<div className="w-full my-14 flex items-center text-center justify-center py-6">
					<h3>No pending service requests Currently</h3>
				</div>
			);
		}

		if (isSuccess && data.length > 0) {
			return (
				<table className="min-w-full divide-y divide-gray-200">
					<thead>
						<tr>
							<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Service ID
							</th>
							<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Customer ID
							</th>
							<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Artisan ID
							</th>
							<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Date
							</th>
							<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Service Type
							</th>
							<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Amount
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{data.map((service, index) => (
							<tr key={index} onClick={() => setSelectedService(service)}>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{service._id}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{service.client_id}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{service.artisan_id}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{parseISOString(service.date)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{service.service_type}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`₦${formatter.format(
									service.price_offer
								)}`}</td>
							</tr>
						))}
					</tbody>
				</table>
			);
		}
	};

	return (
		<div className="bg-white p-6 rounded-lg border border-[#EAECF0]">
			<h2 className="text-xl font-semibold mb-4">Pending Services</h2>
            <div>{renderTable()}</div>
            <ServiceRequestsConfirmation showModal={selectedService} setShowModal={setSelectedService} />
		</div>
	);
};

export default ServicesTable;
