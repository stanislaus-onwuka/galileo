/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import artisanApi from "../../api/artisan";
import toast from "react-hot-toast";
import Loader from "../misc/loader";

const StarRating = ({ rating, setRating }) => {
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

function ArtisanFeedback({ showModal, setShowModal }) {
	const navigate = useNavigate();
	const { artisanId } = useParams();
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const handleChange = (e) => {
		setComment(e.target.value);
	};

	const reviewArtisan = useMutation({
		mutationFn: (data) => artisanApi.rateArtisan(data),
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		reviewArtisan.mutate(
			{
				id: artisanId,
				rating,
				comment,
			},
			{
				onSuccess: (data) => {
					toast.success(data);
					navigate("/");
				},

				onError: (error) => {
					toast.error(`Something went wrong: \n\n ${error?.message}`);
				},
			}
		);
	};

	return (
		<div className={showModal ? "fixed top-0 left-0 flex z-[2]" : "fixed top-0 left-0 hidden z-[2]"}>
			<div className="fixed z-[2] w-full h-full flex justify-center items-center">
				<div className="w-[500px] rounded-2xl bg-white">
					<h3 className="p-5 font-bold text-xl leading-[120%]">Review Artisan</h3>
					<div>
						<div className="flex flex-col px-5 mb-4">
							<label htmlFor="rating">Rating</label>
							<div className="bg-[#F9FAFB] mt-3">
								<StarRating rating={rating} setRating={setRating} />
							</div>
						</div>
						<div className="flex flex-col mb-4 mx-5">
							<label htmlFor="comment">Comment</label>
							<textarea
								name="comment"
								value={comment}
								onChange={handleChange}
								placeholder="Eg. Very good"
								className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0] resize-none"
								cols={2}
							/>
						</div>
					</div>
					<div className="flex p-4 w-full gap-[6px]">
						<button
							className="rounded py-3 text-base bg-[#F2F4F7] w-full font-bold"
							onClick={() => setShowModal(false)}
						>
							Cancel
						</button>
						{reviewArtisan.isPending ? (
							<Loader containerClass="w-8 h-8 self-center" />
						) : (
							<button onClick={handleSubmit} className="rounded py-3 text-base bg-default w-full font-bold">Submit</button>
						)}
					</div>
				</div>
			</div>
			<div className="bg-neutral-950 opacity-80 w-full h-full fixed top-0 blur-sm"></div>
		</div>
	);
}

export default ArtisanFeedback;
