const LiveTracking = () => {
    const isInProgress = true;

    return (
        <div className="bg-white p-6 rounded-lg border border-[#EAECF0] lg:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Live Tracking</h2>
            <div className="flex gap-2 p-[5px] bg-white rounded-lg shadow-level-2 pl-4">
                <input type="text" placeholder="Enter service request ID" className="w-full" />
                <button className="bg-default px-6 py-[6.5px] font-medium text-white rounded">Find</button>
            </div>
            <div className="flex flex-col gap-4 py-4 px-[10px]">
                <div className="flex justify-between items-center">
                    <h3 className="bg-[#F2F4F7] rounded p-2 w-fit text-xs">SRV-0626-001</h3>
                    <div>
                        <img src="/assets/svgs/admin/radar.svg" alt="Radar" />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-base font-bold">Vivien Ayomide</h3>
                        <div className="flex gap-1 text-[#667085] text-sm">
                            <span>Hair Stylist</span>
                            <span>•</span>
                            <span>Tier 7</span>
                            <span>•</span>
                            <span>⭐ 4.5</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button>
                            <img src="/assets/svgs/admin/mail.svg" alt="mail" />
                        </button>
                        <button>
                            <img src="/assets/svgs/admin/phone.svg" alt="mail" />
                        </button>
                    </div>
                </div>
                <div className="border rounded p-4">
                    <h2 className="py-[8.5px] px-2 rounded border border-[#F2F4F7] text-sm font-bold w-fit">
                        {isInProgress ? <span>⚡ In Progress</span> : <span>🟢 Completed</span>}
                    </h2>
                    <div className="mb-8">
                        <div className="flex gap-2">
                            <div>🟠</div>
                            <div>
                                <h3 className="text-[#667085] text-sm">Artisan Location</h3>
                                <h2 className="text-sm font-medium">29 Balogun St, Yaba, Lagos Nigeria</h2>
                            </div>
                        </div>
                        <div className="ml-2 -my-2">
                            <svg
                                width="2"
                                height="40"
                                viewBox="0 0 2 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1 1V33"
                                    stroke="#D0D5DD"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeDasharray="2 2"
                                />
                            </svg>
                        </div>
                        <div className="flex gap-2">
                            <div>🔵</div>
                            <div>
                                <h3 className="text-[#667085] text-sm">Customer Location</h3>
                                <h2 className="text-sm font-medium">29 Balogun St, Yaba, Lagos Nigeria</h2>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Service Details</h3>
                        <div className="flex flex-col gap-3 px-4 py-3">
                            <div className="flex justify-between">
                                <h3 className="text-[#667085] font-medium">Customer name</h3>
                                <h3 className="font-bold">Jess</h3>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-[#667085] font-medium">Customer number</h3>
                                <h3 className="font-bold">+234 812 490 6891</h3>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-[#667085] font-medium">Artisan name</h3>
                                <h3 className="font-bold">Vivien</h3>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-[#667085] font-medium">Artisan number</h3>
                                <h3 className="font-bold">+234 812 490 6891</h3>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-[#667085] font-medium">Price</h3>
                                <h3 className="font-bold">₦5,200.00</h3>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-[#667085] font-medium">Service</h3>
                                <h3 className="font-bold">Hair Dressing</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveTracking;
