import { useState } from "react";
import UpdateProfile from "../../components/customer/update-profile";
import SearchResults from "../../components/customer/search-results";
import MainLayout from "../../components/layouts/main-layout";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import artisanApi from "../../api/artisan";
import Loader from "../../components/misc/loader";
import ArtisanRecommendedList from "../../components/customer/artisan-recommended-list";

function Customer() {
	const [showSearchResults, setShowSearchResults] = useState(false);

	const artisansList = ["Painters", "Carpenters", "Bricklayers", "Tailor", "Mechanic"];

	const getRecommendedArtisans = useQuery({
		queryKey: ["artisans"],
		queryFn: () => artisanApi.recommendArtisans({ limit: 15, max_distance: 50.0 }),
		enabled: true,
	});


	const renderRecommendedArtisans = () => {
		const { isLoading, isError, error, refetch, isSuccess, data } = getRecommendedArtisans;

		if (isLoading) {
			return (
				<div className="w-full h-full flex items-center justify-center py-6">
					<Loader containerClass="w-14 h-14" />
				</div>
			);
		}

		if (isError) {
			return (
				<div className="w-full h-full flex items-center text-center justify-center py-6">
					<h3>An error occured</h3>
					<p className="my-3">{error.message}</p>
					<button onClick={refetch} className="border border-default mt-3 rounded-full py-2 px-5">
						Reload
					</button>
				</div>
			);
		}

		if (isSuccess && data.length === 0) {
			return (
				<div className="w-full h-full flex items-center text-center justify-center py-6">
					<h3>Update your profile information to get recommendations</h3>
					<Link to="/profile" className="border border-default mt-3 rounded-full py-2 px-5">
						Go to profile
					</Link>
				</div>
			);
		}

		if (isSuccess && data.length > 0) {
			return (
				<ArtisanRecommendedList data={data}/>
			);
		}
	};

	return (
		<MainLayout>
			<main className="mt-[243px] mb-8">
				<section className="flex flex-col">
					<div className="text-center">
						<h1 className="text-[39px] leading-[120%] text-background font-semibold">
							Filter. Search. Empower.
						</h1>
						<p className="text-base">Find artisans from all around the world</p>
					</div>
					<div className="mt-10 mx-auto">
						<div className="bg-[#092328] p-4 rounded-xl max-w-[593px] mx-auto shadow-level-4">
							<div className="mb-8">
								<input
									type="text"
									placeholder="I'm looking for..."
									className="bg-transparent text-sm w-full text-light-green"
								/>
							</div>
							<div className="flex items-center justify-between">
								<button className="flex gap-2 items-center px-3 py-[6px] bg-background rounded-md text-light-green">
									<span>
										<img src="/assets/svgs/customer/filter.svg" alt="Filter" />
									</span>
									Filter
								</button>
								<button onClick={() => setShowSearchResults(true)}>
									<img src="/assets/svgs/customer/arrow-right.svg" alt="Submit" />
								</button>
							</div>
						</div>
						<div className="mt-6 flex flex-wrap justify-center gap-2 max-w-[650px]">
							{artisansList.map((artisan, idx) => {
								return (
									<button
										key={idx}
										className="flex items-center gap-3 rounded-full border border-neutral-40 px-3 py-1"
									>
										{artisan}
										<span>
											<img src="/assets/svgs/customer/arrow-up-right.svg" alt="Redirect" />
										</span>
									</button>
								);
							})}
						</div>
					</div>
				</section>
				<section className="mt-[214px] px-[8%]">
					<div className="mb-10">
						<h2 className="text-[32px] leading-[120%] mb-4">Explore</h2>
						{/* <div>
							<div className="flex gap-2">
								<button className="bg-neutral-20 px-4 py-1 rounded-full">Discover</button>
								<button>Featured</button>
							</div>
							<div></div>
						</div> */}
					</div>
					<div>{renderRecommendedArtisans()}</div>
				</section>
			</main>
			<UpdateProfile />
			<SearchResults showModal={showSearchResults} setShowModal={setShowSearchResults} />
		</MainLayout>
	);
}

export default Customer;
