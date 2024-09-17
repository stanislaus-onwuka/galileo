import SupplierLayout from "../../components/layouts/supplier-layout";
import OverviewChart from "../../components/supplier/overview-chart";
import Quotations from "../../components/supplier/quotations";

function SupplierDashboard() {
	return (
		<>
			<SupplierLayout>
				<div className="my-6 w-[90%] mx-auto">
					<OverviewChart/>
				</div>
				<div className="flex-1 p-6">
					<Quotations />
				</div>
			</SupplierLayout>
		</>
	);
}

export default SupplierDashboard;
