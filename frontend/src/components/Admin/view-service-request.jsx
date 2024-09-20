/* eslint-disable react/prop-types */
import { useState } from "react";


function ViewServiceRequest({ showModal, setShowModal }) {
	const StarRating = () => {
		const [rating, setRating] = useState(0);

		const handleRating = (rate) => {
			setRating(rate);
		};

		return (
			<div className="flex items-center justify-center">
				<div className="py-5 flex">
					{Array.from({ length: 5 }, (_, index) => (
						<Star key={index} filled={index < rating} onClick={() => handleRating(index + 1)} />
					))}
				</div>
			</div>
		);
	};

	const Star = ({ filled, onClick }) => {
		return (
			<svg
				onClick={onClick}
				className={`w-6 h-6 cursor-pointer ${filled ? "text-yellow-500" : "text-gray-300"}`}
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path d="M10 15l-5.878 3.09 1.124-6.546L.49 7.454l6.564-.954L10 1l2.946 5.5 6.564.954-4.756 4.09L15.878 18z" />
			</svg>
		);
	};

	return (
		<div className={showModal ? "fixed top-0 left-0 flex" : "fixed top-0 left-0 hidden"}>
			<div className="fixed z-[2] w-full h-full flex justify-center items-center">
				<div className="w-full max-w-[600px] rounded-2xl bg-white">
					<div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
						<div className="mb-6">
							<p className="text-gray-600 mt-2">272 Murtala Mohammed St, Lagos Nigeria</p>
							<p className="text-gray-500">Mar 2 • 12:12 PM</p>
						</div>
						<div className="grid grid-cols-2 gap-4 mb-6">
							<div>
								<label className="block text-gray-700">Customer Name</label>
								<input
									type="text"
									value="Femi"
									readOnly
									className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
								/>
							</div>
							<div>
								<label className="block text-gray-700">Artisan Name</label>
								<input
									type="text"
									value="Adebola Stitches"
									readOnly
									className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
								/>
							</div>
						</div>
						<div className="mb-6">
							<label className="block text-gray-700">Amount</label>
							<input
								type="text"
								value="₦5,500"
								readOnly
								className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
							/>
						</div>
						<div className="mb-6">
							<label className="block text-gray-700">Service Progress</label>
							<select className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2">
								<option>Not Started</option>
								<option>Pending</option>
								<option>Accepted</option>
								<option>Declined</option>
								<option>In Progress</option>
								<option>Completed</option>
							</select>
						</div>
						<div className="grid grid-cols-2 gap-4 mb-6">
							<div>
								<label className="block text-gray-700">Artisan’s Rating</label>
								<div className="flex mt-1">
									<StarRating />
								</div>
							</div>
							<div>
								<label className="block text-gray-700">Payment Status</label>
								<select className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2">
									<option>Successful</option>
									<option>In Progress</option>
								</select>
							</div>
						</div>
						<div className="mb-6">
							<label className="block text-gray-700">Feedback</label>
							<input
								type="text"
								value="Satisfactory"
								className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
							/>
						</div>
						<div className="flex justify-end space-x-4">
							<button
								onClick={() => setShowModal(false)}
								className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
							>
								Cancel
							</button>
							<button className="bg-gray-500 text-white px-4 py-2 rounded-md" disabled>
								Contact Artisan
							</button>
							<button className="bg-default text-white px-4 py-2 rounded-md">Process Payment</button>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-neutral-950 opacity-80 w-full h-full fixed top-0"></div>
		</div>
	);
}


export default ViewServiceRequest;
