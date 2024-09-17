const Metrics = () => {
    const metricsData = [
        { title: "Vetted Artisans", value: 25, change: "+0.2 pts" },
        { title: "Revenue Generated", value: "₦350K", change: "+10%" },
        { title: "Service Requests", value: 47, change: "+25%" },
        { title: "New Customers", value: 35, change: "+20%" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsData.map((metric, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-[#EAECF0]">
                    <h3 className="text-lg font-medium">{metric.title}</h3>
                    <div className="flex items-end">
                        <p className="text-2xl font-semibold mt-2">{metric.value}</p>
                        <div>
                            <img
                                src="/assets/svgs/admin/stocks-up.svg"
                                alt="Stocks"
                            />
                        </div>
                        <span className="text-sm text-green-500">{metric.change}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Metrics;
