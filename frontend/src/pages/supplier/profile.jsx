import { useState } from "react";
import TransactionsTable from "../../components/artisan/transactions";
import SupplierLayout from "../../components/layouts/supplier-layout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/auth-context";
import userApi from "../../api/user";
import toast from "react-hot-toast";
import Loader from "../../components/misc/loader";

function SupplierProfile() {
	const [showAmount, setShowAmount] = useState(false);

	const queryClient = useQueryClient();
	const { user, logout } = useAuth();
	const { firstName, lastName, address, phone_number, location } = user.user;

	const [userDetails, setUserDetails] = useState({
		firstName,
		lastName,
		address,
		phone_number,
		location,
	});

	console.log(userDetails);

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
		<SupplierLayout>
			<div className="px-[15%]">
				<section className="flex flex-col">
					<div className="flex justify-between items-center mb-[60px]">
						<h1 className="text-[39px] leading-[120%]">Profile</h1>
						<button onClick={logout} className="text-red-500 py-[10px] px-8 duration-100 ">
							Logout
						</button>
					</div>
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
										value="kachi2505@yahoo.com"
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
										disabled
										onChange={handleChange}
										value={userDetails.address}
										className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0]"
									/>
								</div>
								<button className="py-1 px-2 border border-black rounded-full self-end">
									📍 Get Current location
								</button>
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
				<h1 className="text-[32px] leading-[120%] mt-[60px] mb-6">Wallet</h1>
				<div className="flex gap-5">
					<div className="p-4 rounded-xl bg-background flex flex-col w-full">
						<div className="flex gap-2">
							<h3 className="text-light-green text-sm">Balance</h3>
							<button onClick={() => setShowAmount(!showAmount)}>
								{showAmount ? (
									<img src="/assets/svgs/customer/hide.svg" alt="Hide Amount" />
								) : (
									<img src="/assets/svgs/customer/show.svg" alt="Show Amount" />
								)}
							</button>
						</div>
						<h1 className="my-5 text-white text-[49px] leading-[120%]">
							₦{showAmount ? <span>0</span> : <span>******</span>}
						</h1>
						<div className="flex gap-[30px] self-center">
							<a href="https://stripe.com/pricing" className="flex flex-col items-center">
								<img src="/assets/svgs/customer/fund-wallet.svg" alt="Fund Wallet" />
								<h2 className="text-light-green text-xs mt-[10px] text-center">Fund Wallet</h2>
							</a>
							<a href="https://stripe.com/pricing" className="flex flex-col items-center">
								<img src="/assets/svgs/customer/send-money.svg" alt="Send Money" />
								<h2 className="text-light-green text-xs mt-[10px] text-center">Send</h2>
							</a>
							<a href="https://stripe.com/pricing" className="flex flex-col items-center">
								<img src="/assets/svgs/customer/withdraw-money.svg" alt="Withdraw" />
								<h2 className="text-light-green text-xs mt-[10px] text-center">Withdraw</h2>
							</a>
						</div>
					</div>
					<div className="border border-neutral-40 rounded-xl bg-white w-full">
						<div className="flex justify-between p-5">
							<h3 className="text-base font-semibold">Linked Account</h3>
							<button className="text-red-500 text-[11px] leading-4">Remove Button</button>
						</div>
						<div className="flex justify-between p-5">
							<div>
								<h5 className="text-neutral-90 uppercase mb-[5px] text-[11px] leading-4">Name</h5>
								<h2 className="text-base">Femi Johnsn</h2>
							</div>
							<div>
								<h5 className="text-neutral-90 uppercase mb-[5px] text-[11px] leading-4">
									Card Number
								</h5>
								<h2 className="text-base">**** **** **** 1234</h2>
							</div>
						</div>
						<div className=" bg-neutral-40 px-[21px] py-7 rounded-b-xl ">
							<button className="bg-background rounded-[10px] text-white py-2 px-3">
								Add/update Card
							</button>
						</div>
					</div>
				</div>
				<div className="mt-8">
					<TransactionsTable />
				</div>
			</div>
		</SupplierLayout>
	);
}

export default SupplierProfile;
