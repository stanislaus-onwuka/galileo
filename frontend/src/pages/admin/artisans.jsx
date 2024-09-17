import { useState } from "react";
import ViewArtisanDetails from "../../components/admin/view-artisan-details";

const AdminArtisans = () => {
    const [showArtisanDetailsModal, setShowArtisanDetailsModal] = useState(false);

    const ArtisansTable = () => {
        const artisans = [
            {
                id: 1,
                firstName: "Tunde",
                lastName: "Sons",
                business_name: "Tunde n sons",
                address: "123 Old Newman Road",
                phone_number: "+234567891011",
                services: ["Barbing"],
                avg_rating: 4.5,
                rating_count: 24
            },
            {
                id: 2,
                firstName: "Tunde",
                lastName: "Sons",
                business_name: "Tunde n sons",
                address: "123 Old Newman Road",
                phone_number: "+234567891011",
                services: ["Barbing"],
                avg_rating: 4.5,
                rating_count: 24
            },
            {
                id: 3,
                firstName: "Tunde",
                lastName: "Sons",
                business_name: "Tunde n sons",
                address: "123 Old Newman Road",
                phone_number: "+234567891011",
                services: ["Barbing"],
                avg_rating: 4.5,
                rating_count: 24
            },
        ];


        return (
            <div className="w-full p-6 bg-white rounded-lg mt-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex w-full justify-between items-center">
                        <span className="text-neutral-950 font-bold">
                            Artisans <strong className="text-neutral-400">{ artisans.length }</strong>
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
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Service(s)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone Number
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Address
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Average Rating
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rating Count
                            </th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {artisans.map((artisan) => (
                            <tr className="cursor-pointer hover:bg-neutral-30" onClick={()=>setShowArtisanDetailsModal(true)} key={artisan.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {
                                        artisan.business_name ? artisan.business_name : `${artisan.firstName} ${artisan.lastName}`
                                    }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {artisan.services.join(", ")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{artisan.phone_number}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{artisan.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{artisan.avg_rating}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{artisan.rating_count}</td>
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
            <h2 className="text-2xl font-semibold">Artisans</h2>
            <ArtisansTable />
            <ViewArtisanDetails showModal={showArtisanDetailsModal} setShowModal={setShowArtisanDetailsModal} />
        </div>
    );
};

export default AdminArtisans;
