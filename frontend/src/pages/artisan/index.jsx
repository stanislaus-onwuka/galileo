import StatsCard from "../../components/artisan/stats-card";
import JobTable from "../../components/artisan/job-table";
import UpdateArtisanProfile from "../../components/artisan/update-artisan-profile";
import ArtisanLayout from "../../components/layouts/artisan-layout";

function ArtisanDashboard() {
	return (
		<>
			<ArtisanLayout>
				<div className="grid grid-cols-3 gap-4 my-6 -mt-20 w-[90%] mx-auto">
					<StatsCard label="Avg. Rating" value="4.7/5" growth="+0.2" />
					<StatsCard label="Completed Jobs" value="35" growth="+12" />
					<StatsCard label="Active Quotes" value="10" growth="+2" />
				</div>
				<div className="flex-1 p-6">
					<JobTable />
				</div>
			</ArtisanLayout>
			<UpdateArtisanProfile />
		</>
	);
}

export default ArtisanDashboard;
