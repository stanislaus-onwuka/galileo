import { useState } from "react";
import ViewServiceRequest from "../../components/Admin/view-service-request";

const AdminServiceRequests = () => {
    const [showServiceRequestModal, setShowServiceRequestModal] = useState(false);

    const ServiceRequestsTable = () => {
        const serviceRequests = [
            {
                id: "SRV-0626-031",
                customer: "Femi",
                artisan: "Adebola's Stitches",
                service: "Tailoring",
                amount: "₦10,800.00",
                date: "2024-06-01",
                status: "Successful",
            },
            {
                id: "SRV-0846-001",
                customer: "Jess",
                artisan: "Victor Oche",
                service: "Barbering",
                amount: "₦3,500.00",
                date: "2024-08-24",
                status: "In-Progress",
            },
            {
                id: "SRV-1626-001",
                customer: "Emeka",
                artisan: "John Okpala",
                service: "Hairstyling",
                amount: "₦15,200.00",
                date: "2024-08-25",
                status: "In-Progress",
            },
            {
                id: "SRV-0226-001",
                customer: "Yemi",
                artisan: "Onifade Lekan",
                service: "Plumbering",
                amount: "₦7,800.00",
                date: "2024-06-18",
                status: "Successful",
            },
            {
                id: "SRV-6626-281",
                customer: "Janet Olatunbosun",
                artisan: "Gabriel Ayomide",
                service: "Carpentry",
                amount: "₦15,000.00",
                date: "2024-07-11",
                status: "Pending",
            },
            {
                id: "SRV-0018-921",
                customer: "Sayo",
                artisan: "Daniel Wilison",
                service: "Barbering",
                amount: "₦1,500.00",
                date: "2024-08-01",
                status: "Canceled",
            },
        ];

        const getStatusClass = (status) => {
            switch (status) {
                case "Successful":
                    return "text-green-500 bg-green-100";
                case "In-Progress":
                    return "text-purple-500 bg-purple-100";
                case "Pending":
                    return "text-yellow-500 bg-yellow-100";
                case "Canceled":
                    return "text-red-500 bg-red-100";
                default:
                    return "";
            }
        };

        return (
            <div className=" w-full p-6 bg-white rounded-lg mt-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex w-full justify-between items-center">
                        <span className="text-gray-600">
                            Services <strong className="text-neutral-400">53</strong>
                        </span>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <svg
                                className="w-5 h-5 text-gray-500 absolute left-3 top-2.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.386-1.414 1.415-5.387-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Service ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Artisan Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Service(s)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {serviceRequests.map((request) => (
                            <tr className="cursor-pointer hover:bg-neutral-30" onClick={()=>setShowServiceRequestModal(true)} key={request.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {request.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {request.customer}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.artisan}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.service}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                                            request.status
                                        )}`}
                                    >
                                        {request.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <img src="/assets/svgs/dropdown-btn.svg" alt="dropdown" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-between items-center">
                    <button className="text-gray-500 hover:text-gray-700">← Prev</button>
                    <div className="flex space-x-2">
                        <button className="text-gray-500 hover:text-gray-700">1</button>
                        <button className="text-gray-500 hover:text-gray-700">2</button>
                        <button className="text-gray-500 hover:text-gray-700">...</button>
                        <button className="text-gray-500 hover:text-gray-700">5</button>
                        <button className="text-gray-500 hover:text-gray-700">6</button>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">Next →</button>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white min-h-screen flex flex-col p-6">
            <h2 className="text-2xl font-semibold">Service Requests</h2>
            <ServiceRequestsTable />
            <ViewServiceRequest showModal={showServiceRequestModal} setShowModal={setShowServiceRequestModal} />
        </div>
    );
};

export default AdminServiceRequests;
