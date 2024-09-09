import { Link } from "react-router-dom";
import MainLayout from "../../../components/layouts/main-layout";

function CustomerProfile() {
    return (
        <MainLayout>
            <main className="w-[60%] mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Link to="/customer">{"<"} Back to homepage</Link>
                    <div className="flex gap-9">
                        <Link to="/customer/profile">Profile</Link>
                        <Link to="/customer/wallet">Wallet</Link>
                    </div>
                </div>
                <section>
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
                                        value="Stanley"
                                        className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0]"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="lastName" className="mb-[6px] text-sm leading-4">
                                        Last Name
                                    </label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        value="Onwuka"
                                        className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0]"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between gap-[58px] mb-[18px]">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="phoneNumber" className="mb-[6px] text-sm leading-4">
                                        Phone Number
                                    </label>
                                    <input
                                        name="phoneNumber"
                                        type="text"
                                        value="+2347012113522"
                                        className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0]"
                                    />
                                </div>
                                <div className="flex flex-col  w-full">
                                    <label htmlFor="email" className="mb-[6px] text-sm leading-4">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value="kachi2505@yahoo.com"
                                        className="py-[14.5px] px-4 rounded-lg border border-[#EAECF0]"
                                    />
                                </div>
                            </div>
                            <button className="bg-default flex gap-[11px] items-center rounded-full py-[10px] px-8">
                                <h4 className="text-white">Save Changes</h4>
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
}

export default CustomerProfile;
