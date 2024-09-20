/* eslint-disable react/prop-types */



// [
//     {
//       "_id": "string",
//       "username": "string",
//       "firstName": "string",
//       "lastName": "string",
//       "role": "admin",
//       "email": "user@example.com",
//       "address": "string",
//       "location": {
//         "latitude": 6.5158,
//         "longitude": 3.3898
//       },
//       "phone_number": "string",
//       "rating_count": 0,
//       "avg_rating": 0,
//       "distance": 0,
//       "services": [],
//       "min_service_rate": 0,
//       "max_service_rate": 0,
//       "business_name": "string",
//       "qualification_file": "https://example.com/"
//     }
//   ]

function ViewArtisanDetails({ showModal, setShowModal }) {
    return (
        <div className={showModal ? "fixed top-0 left-0 flex" : "fixed top-0 left-0 hidden"}>
            <div className="fixed z-[2] w-full h-full flex justify-center items-center">
                <div className="w-full max-w-[600px] rounded-2xl bg-white">
                    <div className="h-[100px] block w-full bg-[#FEEDCD] rounded-t-2xl"></div>
                    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <div className="flex gap-2 items-center mb-6">
                            <p className="text-gray-900 mt-2 text-xl">Adebola’s Stitches</p>
                            <p className="text-gray-500 text-base">⭐ 4.50</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    value="Femi"
                                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    value="Adebola"
                                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value="adebolastitches@email.com"
                                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="mb-6 flex gap-2 items-center">
                            <div className=" w-full">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value="adebolastitches@email.com"
                                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <select className="mt-[32px] block bg-gray-100 border border-gray-300 rounded-md p-2">
                                <option>Verified</option>
                                <option>Vetting</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                value="+233450000000"
                                className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(null)}
                                className="text-black px-4 py-2 rounded-md border border-black"
                            >
                                Cancel
                            </button>
                            <button className="bg-black text-white px-4 py-2 rounded-md">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-neutral-950 opacity-80 w-full h-full fixed top-0"></div>
        </div>
    );
}

export default ViewArtisanDetails;
