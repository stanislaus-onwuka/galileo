import { Link } from "react-router-dom";
import MainLayout from "../../../components/layouts/main-layout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import userApi from "../../../api/user";
import Loader from "../../../components/misc/loader";
import TransactionsTable from "../../../components/artisan/transactions";

function CustomerWallet() {
	const [showAmount, setShowAmount] = useState(false);

	const getWalletDetails = useQuery({
		queryKey: ["customer-wallet"],
		queryFn: () => userApi.getWalletInfo(),
	});

	const renderView = () => {
		const { isLoading, isError, isSuccess, data, refetch, error } = getWalletDetails;

		if (isLoading) {
			return (
				<div className="w-full h-screen flex items-center justify-center py-6">
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

		if (isSuccess) {
			return (
				<main className="w-[60%] mx-auto">
					<div className="flex justify-between items-center mb-8">
						<button>{"<"} Back to homepage</button>
						<div className="flex gap-9">
							<Link to="/profile">Profile</Link>
							<Link to="/wallet">Wallet</Link>
						</div>
					</div>
					<section>
						<h1 className="text-[39px] leading-[120%] mb-[60px]">Wallet</h1>
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
                                    ₦{showAmount ? <span>{ data.data?.balance }</span> : <span>******</span>}
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
										<h5 className="text-neutral-90 uppercase mb-[5px] text-[11px] leading-4">
											Name
										</h5>
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
					</section>
					<section className="mt-8">
						<TransactionsTable data={data.data} />
					</section>
				</main>
			);
		}
	};

    return (
        <MainLayout>
            { renderView() }
        </MainLayout>
    );
}

export default CustomerWallet;
