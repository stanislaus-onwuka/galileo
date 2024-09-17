function Inventory() {
	const inventory = [
		{
			id: "#001",
			product_name: "Product 1",
			quantity: 20,
			date: "2024-07-05, 14:00",
			mcq: 12,
			cost_per_unit: "₦1,000",
			total_cost: "₦10,000",
		},
		{
			id: "#002",
			product_name: "Product 1",
			quantity: 20,
			date: "2024-07-05, 14:00",
			mcq: 12,
			cost_per_unit: "₦1,000",
			total_cost: "₦10,000",
		},
		{
			id: "#003",
			product_name: "Product 1",
			quantity: 20,
			date: "2024-07-05, 14:00",
			mcq: 12,
			cost_per_unit: "₦1,000",
			total_cost: "₦10,000",
		},
		{
			id: "#004",
			product_name: "Product 1",
			quantity: 20,
			date: "2024-07-05, 14:00",
			mcq: 12,
			cost_per_unit: "₦1,000",
			total_cost: "₦10,000",
		},
		{
			id: "#001",
			product_name: "Product 1",
			quantity: 20,
			date: "2024-07-05, 14:00",
			mcq: 12,
			cost_per_unit: "₦1,000",
			total_cost: "₦10,000",
		},
	];

	return (
		<div className="p-4">
			<div className="flex w-full justify-between items-center mb-4">
				<span className="text-gray-600 text-lg">
					Overview <strong className="text-neutral-400">{inventory.length}</strong>
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
							ID
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Product Name
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Quantity
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Date of last order
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							MCQ
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Cost per unit
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Total cost
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{inventory.map((item) => (
						<tr key={item.id}>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.product_name}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
							<td className="px-6 py-4 whitespace-nowrap">{item.mcq}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{item.cost_per_unit}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.total_cost}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm">
								<button className="text-blue-500">View</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Inventory;
