/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import MainLayout from "../../../components/layouts/main-layout";
import ProgressTracker from "../../../components/customer/progress-tracker";
import ArtisanFeedback from "../../../components/customer/artisan-feedback";

function ViewArtisan() {
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [serviceInProgress, setServiceInProgress] = useState(false)

    const { artisanId } = useParams();
    console.log(artisanId);


    const defaultProps = {
        center: {
            lat: 6.61790800094605,
            lng: 3.50296926498413,
        },
        zoom: 11,
    };

    const AnyReactComponent = ({ text }) => (
        <div
            style={{
                color: "black",
                background: "white",
                padding: "25px 20px",
                display: "inline-flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
                transform: "translate(-50%, -50%)",
            }}
        >
            {text}
        </div>
    );

    return (
        <MainLayout>
            <main className="py-9 relative">
                <aside className="max-w-[400px] rounded-xl shadow-level-3 mx-4 relative z-[1] bg-white">
                    <div className="bg-artisan-sidebar h-[168px] rounded-t-xl px-[15px] py-[25px]">
                        <div className="flex justify-between items-center">
                            <Link to="/customer">
                                <img src="/assets/svgs/customer/back-btn.svg" alt="Back Button" />
                            </Link>
                            <div className="flex gap-[6px]">
                                <button>
                                    <img src="/assets/svgs/customer/contact.svg" alt="Contact button" />
                                </button>
                                <button>
                                    <img src="/assets/svgs/customer/favorite.svg" alt="Favorite button" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-5 bg-neutral-0 rounded-lg max-w-[360px] mx-auto -mt-[76px] shadow-level-2">
                        <div>
                            <div className="flex gap-2 items-center mb-[9px]">
                                <h3 className="font-semibold">Stitches n Seams</h3>
                                <div className="flex gap-[6px] items-center">
                                    <span>
                                        <img src="/assets/svgs/customer/star.svg" alt="Rating" />
                                    </span>
                                    <span>4.1</span>
                                    <span className="text-neutral-40">(38)</span>
                                </div>
                            </div>
                            <div className="flex gap-[6px] items-center">
                                <img src="/assets/svgs/customer/location-outline.svg" alt="Location" />
                                <h3>***, Alagomeji</h3>
                            </div>
                            <div className="flex gap-[6px] items-center">
                                <img src="/assets/svgs/customer/contact-outline.svg" alt="Phone number" />
                                <h3>+234 *** *** 0801</h3>
                            </div>
                        </div>
                        {serviceInProgress ? (
                            <div className="flex gap-3 w-full mt-6">
                                <button className="bg-default flex gap-[11px] items-center rounded-full py-[10px] px-8">
                                    <span>
                                        <img src="/assets/svgs/customer/money.svg" alt="Money" />
                                    </span>
                                    <h4 className="text-white">Pay</h4>
                                </button>
                                <button onClick={()=>setShowFeedbackModal(true)} className="border border-neutral-40 flex gap-[11px] items-center rounded-full py-[10px] px-8">
                                    <span>
                                        <img src="/assets/svgs/customer/messages.svg" alt="Messages" />
                                    </span>
                                    <h4>Review</h4>
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-3 w-full mt-6">
                                <button onClick={()=>setServiceInProgress(true)} className="bg-default flex gap-[11px] items-center rounded-full py-[10px] px-5">
                                    <span>
                                        <img src="/assets/svgs/customer/message-outline.svg" alt="Request Icon" />
                                    </span>
                                    <h4 className="text-white">Request</h4>
                                </button>
                                <button className="border border-neutral-40 flex gap-[11px] items-center rounded-full py-[10px] px-5">
                                    <span>
                                        <img src="/assets/svgs/customer/catalog.svg" alt="View Services" />
                                    </span>
                                    <h4>View Services</h4>
                                </button>
                            </div>
                        )}
                    </div>
                    {serviceInProgress ? (
                        <div className="py-14 flex justify-center">
                            <ProgressTracker />
                        </div>
                    ) : (
                        <div className="mt-8">
                            <form className="px-4">
                                <div className="flex flex-col mb-4">
                                    <label htmlFor="service_type">Service Type</label>
                                    <select
                                        name="service_type"
                                        className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
                                    >
                                        <option>Maintenance</option>
                                        <option>Repair</option>
                                        <option>New work/job</option>
                                    </select>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label htmlFor="price_offer">Price Offer</label>
                                    <input
                                        name="price_offer"
                                        type="number"
                                        placeholder="20000"
                                        className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="Describe the task (optional)"
                                        className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0] resize-none"
                                        cols={3}
                                    />
                                </div>
                                <button className="rounded py-3 text-base bg-default w-full font-bold mt-[26px] mb-7 text-white">
                                    Request Service
                                </button>
                            </form>
                        </div>
                    )}
                </aside>
                <section className="absolute h-[110vh] w-full top-0">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        <AnyReactComponent lat={6.61790800094605} lng={3.50296926498413} text="Stitches n Seams" />
                    </GoogleMapReact>
                </section>
            </main>
            <ArtisanFeedback
                showModal={showFeedbackModal}
                setShowModal={setShowFeedbackModal}
            />
        </MainLayout>
    );
}

export default ViewArtisan;
