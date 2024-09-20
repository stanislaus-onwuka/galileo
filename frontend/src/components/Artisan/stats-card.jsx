/* eslint-disable react/prop-types */

const StatsCard = ({ label, value, growth }) => {
	const getIcon = (label) => {
		switch (label) {
			case "Avg. Rating":
				return "/assets/svgs/artisan/avg_rating.svg";
			case "Completed Jobs":
				return "/assets/svgs/artisan/jobs.svg";
			case "Rating Count":
				return "/assets/svgs/artisan/quotes.svg";
			default:
				return null;
		}
	};

	return (
		<div className="bg-white p-4 rounded shadow-md">
			<img src={getIcon(label)} alt={label} className="mb-[35px]" />
			<p className="text-lg font-medium">{label}</p>
			<div className="flex gap-1">
				<h2 className="text-2xl font-bold">{value}</h2>
				<p className={`text-sm ${growth > 0 ? "text-green-500" : "text-red-500"}`}>
					{growth > 0 ? `+${growth}` : growth} pts
				</p>
			</div>
		</div>
	);
};

export default StatsCard;
