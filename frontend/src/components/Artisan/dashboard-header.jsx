const DashboardHeader = () => {
    return (
        <div className="p-4 pb-[140px]">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="uppercase text-xs text-light-green">Total Earnings</h3>
                    <div className="flex items-end">
                        <h1 className="font-semibold text-neutral-0 text-5xl">₦35.3M</h1>
                        <p className="text-sm text-gray-500">📈 ₦35,000 Today</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <button className="bg-default text-white px-4 py-2 rounded">+ Generate Report</button>
                    <button className="bg-[rgba(166,196,196,0.3)] text-white px-4 py-2 rounded">View Reports</button>
                </div>
            </div>
            <h2 className="text-2xl text-white">Overview</h2>
        </div>
    );
};

export default DashboardHeader;
