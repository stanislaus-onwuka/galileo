const servicesData = [
    { id: "SRV-0626-031", customer: "Femi", artisan: "Adebola", date: "2024-06-01", status: "Successful" },
    { id: "SRV-0848-001", customer: "Jess", artisan: "Vivien", date: "2024-06-01", status: "In-Progress" },
    { id: "SRV-1626-001", customer: "Emeka", artisan: "John", date: "2024-06-01", status: "In-Progress" },
    { id: "SRV-0226-001", customer: "Yemi", artisan: "Onifade", date: "2024-06-01", status: "Successful" },
    { id: "SRV-6626-281", customer: "Oscar", artisan: "Efe", date: "2024-06-01", status: "Pending" },
    { id: "SRV-0018-921", customer: "Sayo", artisan: "Daniel", date: "2024-06-01", status: "Canceled" },
];

const ServicesTable = () => {
    return (
        <div className="bg-white p-6 rounded-lg border border-[#EAECF0]">
            <h2 className="text-xl font-semibold mb-4">Services</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service ID
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer Name
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Artisan Name
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {servicesData.map((service, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {service.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.customer}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.artisan}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.date}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${statusColor(service.status)}`}>
                                {service.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const statusColor = (status) => {
    switch (status) {
        case "Successful":
            return "text-green-500";
        case "In-Progress":
            return "text-yellow-500";
        case "Pending":
            return "text-blue-500";
        case "Canceled":
            return "text-red-500";
        default:
            return "text-gray-500";
    }
};

export default ServicesTable;
