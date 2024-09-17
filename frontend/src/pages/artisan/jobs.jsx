import ArtisanLayout from "../../components/layouts/artisan-layout";
import JobTable from "../../components/artisan/job-table";

function ArtisanJobs() {
	return (
		<ArtisanLayout>
			<div className="px-[8%]">
				<h1 className="text-[39px] leading-[120%] mb-[60px]">Jobs</h1>
				<div className="flex-1 p-6">
					<JobTable />
				</div>
			</div>
		</ArtisanLayout>
	);
}

export default ArtisanJobs;
