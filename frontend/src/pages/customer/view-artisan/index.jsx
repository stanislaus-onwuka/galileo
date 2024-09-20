import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import MainLayout from "../../../components/layouts/main-layout";
import ProgressTracker from "../../../components/customer/progress-tracker";
import ArtisanFeedback from "../../../components/customer/artisan-feedback";
import { useMutation, useQuery } from "@tanstack/react-query";
import artisanApi from "../../../api/artisan";
import Loader from "../../../components/misc/loader";
import toast from "react-hot-toast";

function ViewArtisan() {
	const { artisanId } = useParams();

	const [showFeedbackModal, setShowFeedbackModal] = useState(false);
	const [serviceInProgress, setServiceInProgress] = useState(false);
	const [showServices, setShowServices] = useState(false);
	const [serviceRequestData, setServiceRequestData] = useState({
		service_type: "",
		price_offer: 0,
		description: "",
	});

	const handleChange = (e) => {
		setServiceRequestData({
			...serviceRequestData,
			[e.target.name]: e.target.value,
		});
	};

	const getArtisanProfile = useQuery({
		queryKey: ["artisan-profile"],
		queryFn: () => artisanApi.getArtisanProfile(artisanId),
		enabled: !!artisanId,
	});

	const requestService = useMutation({
		mutationFn: (data) => artisanApi.requestArtisanService(data),
        onSuccess: () => {
            setServiceInProgress(true)
			toast.success("Service requested successfully, we will get back to you soon");
		},
		onError: (error) => {
			toast.custom((t) => (
				<div
					className={`${
						t.visible ? "animate-enter" : "animate-leave"
					} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
				>
					<div className="flex-1 p-4">
						<div className="flex items-start">
							<div className="ml-3 flex-1">
								<p className="text-sm font-medium text-gray-900">Something went wrong</p>
								<p className="mt-1 text-sm text-gray-500">{error?.message}</p>
							</div>
						</div>
					</div>
				</div>
			));
		},
	});

	const handleFormSubmit = (e) => {
        e.preventDefault();
        
        requestService.mutate(
            {
                id: artisanId,
                ...serviceRequestData
            }
        )

	};

	const defaultProps = {
		center: {
			lat: 6.61790800094605,
			lng: 3.50296926498413,
		},
		zoom: 20,
	};

	const Marker = () => (
		<div
			style={{
				background: "#08302F",
				textAlign: "center",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: "100%",
				transform: "translate(-50%, -50%)",
				fontSize: "42px",
			}}
		>
			📍
		</div>
	);

	const renderArtisanProfile = () => {
		const { isLoading, isError, data, refetch, error, isSuccess } = getArtisanProfile;

		if (isLoading) {
			return (
				<div className="w-full h-screen flex items-center justify-center py-6">
					<Loader containerClass="w-14 h-14" />
				</div>
			);
		}

		if (isError) {
			return (
				<div className="w-full h-screen flex items-center text-center justify-center py-6">
					<h3>An error occured</h3>
					<p className="my-3">{error.message}</p>
					<button onClick={refetch} className="border border-default mt-3 rounded-full py-2 px-5">
						Reload
					</button>
				</div>
			);
		}

		if (isSuccess) {
			const {
				firstName,
				lastName,
				business_name,
				services,
				avg_rating,
				rating_count,
				distance,
				min_service_rate,
				max_service_rate,
				location,
			} = data;

			const renderTabs = () => {
				if (showServices) {
					return (
						<div className="mt-4 flex flex-col gap-4 p-8">
							<div>
								<h3 className="mb-1 font-medium">Service(s)</h3>
								<p className="p-1 rounded bg-neutral-30">
									{services.length > 0 ? services.join(", ") : "Not defined"}
								</p>
							</div>
							<div>
								<h3 className="mb-1 font-medium">Min Service Rate</h3>
								<h2 className="p-1 rounded bg-neutral-30">
									{min_service_rate !== 0 ? min_service_rate : "Not defined"}
								</h2>
							</div>
							<div>
								<h3 className="mb-1 font-medium">Max Service Rate</h3>
								<h2 className="p-1 rounded bg-neutral-30">
									{max_service_rate !== 0 ? max_service_rate : "Not defined"}
								</h2>
							</div>
							<div>
								<h3 className="mb-1 font-medium">Distance to me</h3>
								<h2 className="p-1 rounded bg-neutral-30">
									{distance ? `${distance}km` : "Not defined"}
								</h2>
							</div>
						</div>
					);
				}

				return (
					<div className="mt-8">
						<form className="px-4">
							<div className="flex flex-col mb-4">
								<label htmlFor="service_type">Service Type</label>
								<select
									name="service_type"
									value={serviceRequestData.service_type}
									onChange={handleChange}
									className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
								>
									<option>Maintenance</option>
									<option>Repair</option>
									<option>New work/job</option>
								</select>
							</div>
							<div className="flex flex-col mb-4">
								<label htmlFor="price_offer">Price Offer</label>
								<input
									name="price_offer"
									value={serviceRequestData.price_offer}
									type="number"
									placeholder="20000"
									onChange={handleChange}
									className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
								/>
							</div>
							<div className="flex flex-col mb-4">
								<label htmlFor="description">Description</label>
								<textarea
									name="description"
									value={serviceRequestData.description}
									onChange={handleChange}
									placeholder="Describe the task (optional)"
									className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0] resize-none"
									cols={3}
								/>
							</div>

							{requestService.isPending ? (
								<Loader containerClass="w-8 h-8 self-center" />
							) : (
								<button
									onClick={handleFormSubmit}
									className="rounded py-3 text-base bg-default w-full font-bold mt-[26px] mb-7 text-white"
								>
									Request Service
								</button>
							)}
						</form>
					</div>
				);
			};

			return (
				<main className="py-9 relative">
					<aside className="max-w-[400px] rounded-xl shadow-level-3 mx-4 relative z-[1] bg-white">
						<div className="bg-artisan-sidebar h-[168px] rounded-t-xl px-[15px] py-[25px]">
							<div className="flex justify-between items-center">
								<Link to="/customer">
									<img src="/assets/svgs/customer/back-btn.svg" alt="Back Button" />
								</Link>
								<div className="flex gap-[6px]">
									{/* <button>
										<img src="/assets/svgs/customer/contact.svg" alt="Contact button" />
									</button>
									<button>
										<img src="/assets/svgs/customer/favorite.svg" alt="Favorite button" />
									</button> */}
								</div>
							</div>
						</div>
						<div className="px-4 py-5 bg-neutral-0 rounded-lg max-w-[360px] mx-auto -mt-[76px] shadow-level-2">
							<div>
								<div className="flex gap-2 items-center mb-[9px]">
									<h3 className="font-semibold capitalize text-ellipsis">
										{" "}
										{business_name || `${firstName} ${lastName}`}
									</h3>
									<div className="flex gap-[6px] items-center">
										<span>
											<img src="/assets/svgs/customer/star.svg" alt="Rating" />
										</span>
										<span>{avg_rating}</span>
										<span className="text-neutral-40">{`(${rating_count})`}</span>
									</div>
								</div>
								<div className="flex gap-[6px] items-center">
									<img src="/assets/svgs/customer/location-outline.svg" alt="Location" />
									<h3>***</h3>
								</div>
								<div className="flex gap-[6px] items-center">
									<img src="/assets/svgs/customer/contact-outline.svg" alt="Phone number" />
									<h3>+234 *** ***</h3>
								</div>
							</div>
							{serviceInProgress ? (
								<div className="flex gap-3 w-full mt-6">
									<button className="bg-default flex gap-[11px] items-center rounded-full py-[10px] px-8">
										<span>
											<img src="/assets/svgs/customer/money.svg" alt="Money" />
										</span>
										<h4 className="text-white">Pay</h4>
									</button>
									<button
										onClick={() => setShowFeedbackModal(true)}
										className="border border-neutral-40 flex gap-[11px] items-center rounded-full py-[10px] px-8"
									>
										<span>
											<img src="/assets/svgs/customer/messages.svg" alt="Messages" />
										</span>
										<h4>Review</h4>
									</button>
								</div>
							) : (
								<div className="flex gap-3 w-full mt-6">
									<button
										onClick={() => setShowServices(false)}
										className="bg-default flex gap-[11px] items-center rounded-full py-[10px] px-5"
									>
										<span>
											<img src="/assets/svgs/customer/message-outline.svg" alt="Request Icon" />
										</span>
										<h4 className="text-white">Request</h4>
									</button>
									<button
										onClick={() => setShowServices(true)}
										className="border border-neutral-40 flex gap-[11px] items-center rounded-full py-[10px] px-5"
									>
										<span>
											<img src="/assets/svgs/customer/catalog.svg" alt="View Services" />
										</span>
										<h4>View Services</h4>
									</button>
								</div>
							)}
						</div>
						{serviceInProgress ? (
							<div className="py-14 flex justify-center">
								<ProgressTracker />
							</div>
						) : (
							renderTabs()
						)}
					</aside>
					<section className="absolute h-[110vh] w-full top-0">
						<GoogleMapReact
							bootstrapURLKeys={{ key: "" }}
							defaultCenter={defaultProps.center}
							defaultZoom={defaultProps.zoom}
						>
							<Marker lat={location.latitude} lng={location.longitude} />
						</GoogleMapReact>
					</section>
				</main>
			);
		}
	};

	return (
		<MainLayout>
			{renderArtisanProfile()}
			<ArtisanFeedback showModal={showFeedbackModal} setShowModal={setShowFeedbackModal} />
		</MainLayout>
	);
}

export default ViewArtisan;
