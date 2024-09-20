/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import adminApi from "../../api/admin";
import toast from "react-hot-toast";
import Loader from "../misc/loader";

const ServiceRequestsConfirmation = ({ showModal, setShowModal }) => {
	const [reason, setReason] = useState("");

	const respondToServiceRequest = useMutation({
		mutationFn: (data) => adminApi.respondToServiceRequest(data),
		onSuccess: (data) => {
			if (data.status === "pending") {
				toast.success("Service request accepted \n\n Send artisan the customer's details");
			}

			toast.error("Service request declined");

			setShowModal(null);
		},
		onError: (error) => {
			setShowModal(null);
			toast.error(`Something went error \n\n ${error.message}`);
		},
	});

	const handleAccept = (e) => {
		e.preventDefault();

		respondToServiceRequest.mutate({
			id: showModal?._id,
			action: "accept",
			reason,
		});
	};

	const handleDecline = (e) => {
		e.preventDefault();

		respondToServiceRequest.mutate({
			id: showModal?._id,
			action: "decline",
			reason,
		});
	};

	return (
		<div className={showModal ? "fixed top-0 left-0 flex" : "fixed top-0 left-0 hidden"}>
			<div className="fixed z-[2] w-full h-full flex justify-center items-center">
				<div className="w-full max-w-[600px] rounded-2xl bg-white">
					<div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
						<div className="grid grid-cols-2 gap-4 mb-6">
							<div>
								<label className="block text-gray-700">Customer ID</label>
								<input
									type="text"
									value={showModal?.client_id}
									readOnly
									className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
								/>
							</div>
							<div>
								<label className="block text-gray-700">Artisan ID</label>
								<input
									type="text"
									value={showModal?.artisan_id}
									readOnly
									className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
								/>
							</div>
						</div>
						<div className="mb-6">
							<label className="block text-gray-700">Amount</label>
							<input
								type="text"
								value={showModal?.price_offer}
								disabled
								className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
							/>
						</div>
						<div className="mb-6">
							<label className="block text-gray-700">Service Type</label>
							<input
								type="text"
								value={showModal?.service_type}
								disabled
								className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
							/>
						</div>
						<div className="mb-6">
							<label className="block text-gray-700">Description</label>
							<input
								type="text"
								value={showModal?.description}
								disabled
								className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
							/>
						</div>
						<div className="mb-6">
							<label className="block text-gray-700">Reason</label>
							<input
								type="text"
								onChange={(e) => setReason(e.target.value)}
								value={reason}
								placeholder="Optional"
								className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
							/>
						</div>
						{respondToServiceRequest.isPending ? (
							<Loader containerClass="w-8 h-8" />
						) : (
							<div className="flex justify-end space-x-4">
								<button onClick={handleDecline} className="bg-gray-500 text-white px-4 py-2 rounded-md">Decline service</button>
								<button onClick={handleAccept} className="bg-default text-white px-4 py-2 rounded-md">Accept service</button>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="bg-neutral-950 opacity-80 w-full h-full fixed top-0"></div>
		</div>
	);
};


export default ServiceRequestsConfirmation