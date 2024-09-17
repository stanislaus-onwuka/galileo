import Header from "../../components/admin/header";
import Metrics from "../../components/admin/metrics";
import UserBreakdown from "../../components/admin/user-breakdown";
import ServicesTable from "../../components/admin/services-table";
import LiveTracking from "../../components/admin/live-tracking";

function AdminDashboard() {
    return (
        <div className="p-6 min-h-screen">
            <Header />
            <div className="mt-6 space-y-6">
                <Metrics />
                <div className="flex flex-col lg:flex-row lg:space-x-6">
                    <div className="flex-1 space-y-6">
                        <UserBreakdown />
                        <ServicesTable />
                    </div>
                    <LiveTracking />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
