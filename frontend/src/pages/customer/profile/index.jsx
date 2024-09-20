import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../../components/layouts/main-layout";
import { useAuth } from "../../../context/auth-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "../../../api/user";
import toast from "react-hot-toast";
import Loader from "../../../components/misc/loader";

function CustomerProfile() {
	const queryClient = useQueryClient();
	const { user } = useAuth();
	const { firstName, lastName, address, phone_number, location, email } = user.user;

	const [userDetails, setUserDetails] = useState({
		firstName,
		lastName,
		address,
		phone_number,
		location,
		email,
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
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
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
		<MainLayout>
			<main className="w-[60%] mx-auto">
				<div className="flex justify-between items-center mb-8">
					<Link to="/">{"<"} Back to homepage</Link>
					<div className="flex gap-9">
						<Link to="/profile">Profile</Link>
						<Link to="/wallet">Wallet</Link>
					</div>
				</div>
				<section className="flex flex-col">
					<h1 className="text-[39px] leading-[120%] mb-[60px]">My Profile</h1>
					<div className="py-6 px-4 border border-neutral-40 rounded-xl">
						<h2 className="text-[32px] leading-10 mb-[18px]">Personal Information</h2>
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
										value={userDetails.email}
										className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0] w-full"
										disabled
									/>
								</div>
							</div>
							<div className="flex flex-col mb-16">
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
		</MainLayout>
	);
}

export default CustomerProfile;
