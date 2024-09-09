import Navbar from "./Navbar";
import DashboardHeader from "./DashboardHeader";
import StatsCard from "./StatsCard";
import OverviewChart from "./OverviewChart";
import JobTable from "./JobTable";

function Artisan() {
  return (
    <div className="bg-background">
      <Navbar />
      <DashboardHeader />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="grid grid-cols-3 gap-4 my-6">
          <StatsCard label="Avg. Rating" value="4.7/5" growth="+0.2" />
          <StatsCard label="Completed Jobs" value="35" growth="+12" />
          <StatsCard label="Active Quotes" value="10" growth="+2" />
        </div>
        <OverviewChart />
        <JobTable />
      </div>
    </div>
  );
}

export default Artisan;
