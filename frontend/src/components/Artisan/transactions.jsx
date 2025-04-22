/* eslint-disable react/prop-types */
import { parseDate, formatter } from "../../../utils/functions";

const TransactionsTable = ({ data }) => {
	if (data.transactions.length === 0) {
		return (
			<div className="w-full h-full mt-9 flex items-center text-center justify-center py-6">
				<h3>No transactions currently</h3>
			</div>
		);
	}
	return (
		<div className="p-4">
			<div className="flex w-full justify-between items-center mb-4">
				<span className="text-gray-600 text-lg">
					Transactions <strong className="text-neutral-400">{data.transactions.length}</strong>
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
			<table className="min-w-full table-auto rounded shadow-sm">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							ID
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Artisan name
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Date & Time
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Service Requested
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Status
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Amount
						</th>
					</tr>
				</thead>
				<tbody>
					{data.transactions.map((transaction, idx) => (
						<tr key={transaction.id}>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`#${idx + 1}`}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{transaction.artisan_name}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{parseDate(transaction.date)}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{transaction.service_requested}
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<span
									className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
										transaction.success
											? "text-green-500 bg-green-200"
											: // : transaction.status === "Pending"
											  // ? "text-yellow-500 bg-yellow-200"
											  // : transaction.status === "Processing"
											  // ? "text-yellow-500 bg-yellow-200"
											  "text-red-500 bg-red-200"
									}`}
								>
									{transaction.success ? "Success" : "Failed"}
								</span>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{`₦${formatter.format(transaction.paid_amount)}`}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TransactionsTable;
