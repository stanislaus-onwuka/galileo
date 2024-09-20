/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function ArtisanLink({ data, containerBg }) {
	const { _id, firstName, lastName, business_name, services, avg_rating, rating_count, distance } = data;

	return (
		<Link to={`/artisan/${_id}`}>
			<div className="max-w-[285px]">
				{/* <div className="mb-6">
					<img src="/assets/imgs/artisan.png" className="rounded-2xl" alt="Service image" />
                </div> */}
				<div
					className="mb-6 min-h-[175px] w-full rounded-2xl flex justify-center items-center text-white uppercase text-3xl"
					style={{
						backgroundColor: containerBg,
					}}
				>
					{ business_name ? business_name[0] : firstName[0] }
				</div>
				<div>
					<div className="flex items-center justify-between">
						<div className="flex gap-2">
							<h3 className="font-semibold capitalize text-ellipsis">
								{business_name || `${firstName} ${lastName}`}
							</h3>
							{services.length > 0 ? (
								<span className="bg-neutral-10 rounded-full py-1 px-2 text-neutral-60 border border-neutral-20 font-bold text-[13px] leading-[120%]">
									{services[0]}
								</span>
							) : null}
						</div>
						<div>
							<img src="/assets/svgs/customer/arrow-up-right.svg" alt="Redirect" />
						</div>
					</div>
					<div className="flex gap-2 mt-[9px]">
						<div className="flex gap-[6px] items-center">
							<span>
								<img src="/assets/svgs/customer/star.svg" alt="Rating" />
							</span>
							<span>{avg_rating}</span>
							<span className="text-neutral-40">{`(${rating_count})`}</span>
						</div>
						<div className="flex gap-[6px] items-center">
							<span>
								<img src="/assets/svgs/customer/location.svg" alt="Distance" />
							</span>
							<span>{`${distance}km`}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default ArtisanLink;
