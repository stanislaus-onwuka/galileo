import { useState } from "react"

function UpdateProfile() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className={ showModal ? "fixed top-0 left-0 flex" : "fixed top-0 left-0 hidden"}>
            <div className="w-[500px] rounded-2xl bg-white fixed z-[2] top-[20%] left-[32%]">
                <h3 className="p-5 font-bold text-xl leading-[120%]">Update Profile</h3>
                <div>
                    <div className="flex flex-col px-5 mb-4">
                        <label htmlFor="telephone">Mobile number</label>
                        <input
                            name="telephone"
                            type="tel"
                            placeholder="+234 812 290 3300"
                            className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
                        />
                    </div>
                    <div className="flex flex-col px-5">
                        <div className="flex justify-between items-center">
                            <label htmlFor="address">Current Location <span className="text-red-500">*</span></label>
                            <button className="text-xs text-[#667085]">Use Google Maps</button>
                        </div>
                        <input
                            name="address"
                            type="text"
                            placeholder="e.g, 321 Herbert Macaulay"
                            className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
                        />
                    </div>
                </div>
                <div className="flex p-4 w-full gap-[6px]">
                    <button className="rounded py-3 text-base bg-[#F2F4F7] w-full font-bold" onClick={()=>setShowModal(false)}>Reset</button>
                    <button className="rounded py-3 text-base bg-default w-full font-bold">Update</button>
                </div>
            </div>
            <div className="bg-neutral-950 opacity-80 w-full h-full fixed top-0"></div>
        </div>
    )
}

export default UpdateProfile