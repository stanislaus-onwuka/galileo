import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "../../api/user";
import toast from "react-hot-toast";
import Loader from "../../components/misc/loader";
import ArtisanLayout from "../../components/layouts/artisan-layout";
import { servicesOptions } from "../../../utils/constants";

function ArtisanProfile() {
	const queryClient = useQueryClient();
	const { user, logout } = useAuth();
	const {
		firstName,
		lastName,
		address,
		phone_number,
		location,
		business_name,
		min_service_rate,
		max_service_rate,
		services,
		qualification_file
	} = user.user;

	const [userDetails, setUserDetails] = useState({
		firstName,
		lastName,
		address,
		phone_number,
		location,
		business_name,
		min_service_rate,
		max_service_rate,
		services,
		qualification_file
	});

	useEffect(() => {
		const success = (position) => {
			const { latitude, longitude } = position.coords;

			setUserDetails({
				...userDetails,
				location: {
					latitude,
					longitude,
				},
			});
		};

		const error = (error) => {
			toast.error(error.message);
		};

		navigator.geolocation.getCurrentPosition(success, error);
	}, [userDetails]);



	const handleChange = (e) => {
		const { name, value, selectedOptions, files } = e.target;
		if (name === 'services') {
			const values = Array.from(selectedOptions, option => option.value);
			setUserDetails({
				...userDetails,
				[name]: values,
			});
		} else if (name === 'qualification_file') {
			setUserDetails({
				...userDetails,
				[name]: files[0],
			});
		} else {
			setUserDetails({
				...userDetails,
				[name]: value,
			});
		}
	};

	const updateProfile = useMutation({
		mutationFn: (data) => userApi.updateProfile(data),
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		updateProfile.mutate(userDetails, {
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: ["user-profile"],
				});

				toast.success("Profile updated");
			},

			onError(error) {
				toast.error(error.message);
			},
		});
	};

	return (
		<ArtisanLayout>
			<main className="w-[60%] mx-auto">
				<section className="flex flex-col">
					<div className="flex justify-between items-center mb-[60px]">
						<h1 className="text-[39px] leading-[120%]">Profile</h1>
						<button onClick={logout} className="text-red-500 py-[10px] px-8 duration-100 ">
							Logout
						</button>
					</div>
					<div className="py-6 px-4 border border-neutral-40 rounded-xl">
						<h2 className="text-[32px] leading-10 mb-[18px]">Artisan Information</h2>
						<div>
							<div className="flex justify-between gap-[58px] mb-[18px]">
								<div className="flex flex-col w-full">
									<label htmlFor="firstName" className="mb-[6px] text-sm leading-4">
										First Name
									</label>
									<input
										name="firstName"
										type="text"
										disabled
										// onChange={handleChange}
										value={userDetails.firstName}
										className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0] w-full"
									/>
								</div>
								<div className="flex flex-col w-full">
									<label htmlFor="lastName" className="mb-[6px] text-sm leading-4">
										Last Name
									</label>
									<input
										name="lastName"
										type="text"
										disabled
										// onChange={handleChange}
										value={userDetails.lastName}
										className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0] w-full"
									/>
								</div>
							</div>
							<div className="flex justify-between gap-[58px] mb-[18px]">
								<div className="flex flex-col w-full">
									<label htmlFor="phoneNumber" className="mb-[6px] text-sm leading-4">
										Phone Number
									</label>
									<input
										name="phone_number"
										type="tel"
										onChange={handleChange}
										value={userDetails.phone_number}
										className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0] w-full"
									/>
								</div>
								<div className="flex flex-col w-full">
									<label htmlFor="email" className="mb-[6px] text-sm leading-4">
										Email
									</label>
									<input
										name="email"
										type="email"
										value="kachi2505@yahoo.com"
										className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0] w-full"
										disabled
									/>
								</div>
							</div>
							<div className="flex flex-col mb-16">
								<div className="flex flex-col w-full mb-2">
									<label htmlFor="business_name" className="mb-[6px] text-sm leading-4">
										Business Name
									</label>
									<input
										name="business_name"
										type="text"
										onChange={handleChange}
										value={userDetails.business_name}
										className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0]"
									/>
								</div>
								<div className="flex flex-col w-full mb-2">
									<label htmlFor="email" className="mb-[6px] text-sm leading-4">
										Address
									</label>
									<input
										name="address"
										type="text"
										onChange={handleChange}
										value={userDetails.address}
										className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0]"
									/>
								</div>
								<div className="flex justify-between gap-[58px] mb-[18px]">
									<div className="flex flex-col w-full">
										<label htmlFor="min_service_rate" className="mb-[6px] text-sm leading-4">
											Min service rate (₦)
										</label>
										<input
											name="min_service_rate"
											type="number"
											min="0"
											onChange={handleChange}
											value={userDetails.min_service_rate}
											className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0] w-full"
										/>
									</div>
									<div className="flex flex-col w-full">
										<label htmlFor="max_service_rate" className="mb-[6px] text-sm leading-4">
											Max service rate (₦)
										</label>
										<input
											name="max_service_rate"
											type="number"
											min="0"
											onChange={handleChange}
											value={userDetails.max_service_rate}
											className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0] w-full"
										/>
									</div>
								</div>
								<div className="flex flex-col w-full mb-4">
									<label htmlFor="services">Services</label>
									<select
										id="services"
										name="services"
										className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0] w-full"
										// multiple
										value={userDetails.services}
										onChange={handleChange}
									>
										{servicesOptions.map((service, index) => (
											<option key={index} value={service}>
												{service}
											</option>
										))}
									</select>
								</div>
								<div className="flex flex-col w-full mb-2">
									<label htmlFor="qualification_file">Qualification:</label>
									<input
										id="qualification_file"
										name="qualification_file"
										className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0] w-full"
										type="file"
										onChange={handleChange}
									/>
								</div>
								{/* <button className="py-1 px-2 border border-black rounded-full self-end">
									📍 Get Current location
								</button> */}
							</div>
							{updateProfile.isPending ? (
								<Loader containerClass="w-8 h-8" />
							) : (
								<button
									onClick={handleSubmit}
									className="bg-default flex gap-[11px] items-center rounded-full py-[10px] px-8"
								>
									<h4 className="text-white">Save Changes</h4>
								</button>
							)}
						</div>
					</div>
				</section>
			</main>
		</ArtisanLayout>
	);
}

export default ArtisanProfile;
