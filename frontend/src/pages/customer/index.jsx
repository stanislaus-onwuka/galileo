import { useState } from "react";
import UpdateProfile from "../../components/customer/update-profile";
import SearchResults from "../../components/customer/search-results";
import MainLayout from "../../components/layouts/main-layout";
import { Link } from "react-router-dom";

function Customer() {
    const [showSearchResults, setShowSearchResults] = useState(false);

    const artisansList = ["Painters", "Carpenters", "Bricklayers", "Tailor", "Mechanic"];

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
                                    className="bg-transparent text-sm w-full"
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
                        <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-[620px]">
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
                        <div>
                            <div className="flex gap-2">
                                <button className="bg-neutral-20 px-4 py-1 rounded-full">Discover</button>
                                <button>Featured</button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div>
                        <Link to="/customer/1" className="max-w-[285px]">
                            <div className="max-w-[285px]">
                                <div className="mb-6">
                                    <img src="/assets/imgs/artisan.png" className="rounded-2xl" alt="Service image" />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <h3 className="font-semibold">Stitches n Seams</h3>
                                            <span className="bg-neutral-10 rounded-full py-1 px-2 text-neutral-60 border border-neutral-20 font-bold text-[13px] leading-[120%]">
                                                Tailor
                                            </span>
                                        </div>
                                        <div>
                                            <img src="/assets/svgs/customer/arrow-up-right.svg" alt="Redirect" />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-[9px]">
                                        <div className="flex gap-[6px] items-center">
                                            <span>
                                                <img src="/assets/svgs/customer/star.svg" alt="Rating" />
                                            </span>
                                            <span>4.1</span>
                                            <span className="text-neutral-40">(38)</span>
                                        </div>
                                        <div className="flex gap-[6px] items-center">
                                            <span>
                                                <img src="/assets/svgs/customer/location.svg" alt="Distance" />
                                            </span>
                                            <span>4.1km</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
            <UpdateProfile />
            <SearchResults showModal={showSearchResults} setShowModal={setShowSearchResults} />
        </MainLayout>
    );
}

export default Customer;
