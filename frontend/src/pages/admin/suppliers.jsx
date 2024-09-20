import { useQuery } from "@tanstack/react-query";
import adminApi from "../../api/admin";
import Loader from "../../components/misc/loader";

const AdminSuppliers = () => {
	const SuppliersTable = () => {
		const getSuppliersList = useQuery({
			queryKey: ["suppliers-list"],
			queryFn: () => adminApi.getAllSuppliers(),
		});

		const getStatusClass = (status) => {
			switch (status) {
				case "Active":
					return "text-green-500 bg-green-100";
				case "Review":
					return "text-yellow-500 bg-yellow-100";
				case "Inactive":
					return "text-red-500 bg-red-100";
				default:
					return "";
			}
		};

		const renderTable = () => {
			const { isLoading, isError, isSuccess, data, refetch, error } = getSuppliersList;

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
						<h3>No suppliers available Currently</h3>
					</div>
				);
			}

			if (isSuccess && data.length > 0) {
				return (
					<table className="min-w-full bg-white divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Name
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Email
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Phone Number
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Address
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								{/* <th className="px-6 py-3"></th> */}
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data.map((supplier, idx) => (
								<tr className="cursor-pointer hover:bg-neutral-30" key={idx}>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{supplier._id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{`${supplier.firstName} ${supplier.lastName}`}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{supplier.email ? supplier.email : "-"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{supplier.phone_number ?? "-"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{supplier.address ?? "-"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
												"Active"
											)}`}
										>
											Active
										</span>
									</td>
									{/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<button className="text-gray-500 hover:text-gray-700">
											<img src="/assets/svgs/dropdown-btn.svg" alt="dropdown" />
										</button>
									</td> */}
								</tr>
							))}
						</tbody>
					</table>
				);
			}
		};

		return (
			<div className="w-full p-6 bg-white rounded-lg mt-6">
				<div className="flex justify-between items-center mb-4">
					<div className="flex w-full justify-between items-center">
						<span className="text-neutral-950 font-bold">
							Suppliers <strong className="text-neutral-400">{getSuppliersList.data?.length}</strong>
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
				{renderTable()}
				{getSuppliersList.data > 10 ? (
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
				) : null}
			</div>
		);
	};

	return (
		<div className="bg-white min-h-screen flex flex-col p-6">
			<h2 className="text-2xl font-semibold">Suppliers</h2>
			<SuppliersTable />
		</div>
	);
};

export default AdminSuppliers;
