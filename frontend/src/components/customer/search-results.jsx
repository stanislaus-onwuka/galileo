/* eslint-disable react/prop-types */
import { useState } from "react";
import { multipleClasses } from "../../../utils/functions";

function SearchResults({ showModal, setShowModal }) {
    const [searchInput, setSearchInput] = useState("");

    const artisansList = ["Painters", "Carpenters", "Bricklayers", "Tailor", "Mechanic"];

    return (
        <div className={showModal ? "fixed top-0 left-0 flex" : "fixed top-0 left-0 hidden"}>
            <div className="fixed z-[2] w-full h-full flex justify-center items-center">
                <div className="w-[1200px] rounded-2xl bg-white">
                    <div className="p-5">
                        <div className="mb-8">
                            <h2 className="text-base">Category</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {artisansList.map((artisan, idx) => {
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setSearchInput(artisan)}
                                            className={multipleClasses(
                                                "flex items-center rounded-full border px-[18px] py-[6px] border-background",
                                                searchInput === artisan
                                                    ? "text-white bg-background"
                                                    : "text-background bg-transparent"
                                            )}
                                        >
                                            {artisan}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-base mb-4">Search Results (19)</h2>
                            <div>
                                <div className="flex justify-between py-3">
                                    <div className="flex gap-2">
                                        <h3 className="font-semibold">Stitches n Seams</h3>
                                        <span className="bg-neutral-10 rounded-full py-1 px-2 text-neutral-60 border border-neutral-20 font-bold text-[13px] leading-[120%]">
                                            Tailor
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-2">
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
                                        <div>
                                            <img src="/assets/svgs/customer/arrow-up-right.svg" alt="Redirect" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center m-5">
                        <div className="flex items-center gap-3">
                            <div>
                                <img src="/assets/svgs/customer/search.svg" alt="Search" />
                            </div>
                            <h1 className="text-base">{searchInput} around me</h1>
                        </div>
                        <button className="text-2xl font-semibold" onClick={() => setShowModal(false)}>
                            X
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-neutral-950 opacity-80 w-full h-full fixed top-0 blur-sm"></div>
        </div>
    );
}

export default SearchResults;
