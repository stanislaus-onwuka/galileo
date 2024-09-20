import StatsCard from "../../components/artisan/stats-card";
import JobTable from "../../components/artisan/job-table";
import UpdateArtisanProfile from "../../components/artisan/update-artisan-profile";
import ArtisanLayout from "../../components/layouts/artisan-layout";
import { useAuth } from "../../context/auth-context";

function ArtisanDashboard() {
	const { user } = useAuth();


	return (
		<>
			<ArtisanLayout>
				<div className="grid grid-cols-3 gap-4 my-6 -mt-20 w-[90%] mx-auto">
					<StatsCard label="Avg. Rating" value={user.user?.avg_rating} growth="+" />
					<StatsCard label="Completed Jobs" value="35" growth="+12" />
					<StatsCard label="Rating Count" value={user.user?.rating_count} growth="+" />
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
