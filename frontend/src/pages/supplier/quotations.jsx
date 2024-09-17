import Quotations from "../../components/supplier/quotations";
import SupplierLayout from "../../components/layouts/supplier-layout";

function SupplierQuotations() {
	return (
		<SupplierLayout>
			<div className="px-[8%]">
				<div className="flex justify-between mb-[60px]">
					<h1 className="text-[39px] leading-[120%]">Quotations</h1>
				</div>
				<div className="flex-1 p-6">
					<Quotations />
				</div>
			</div>
		</SupplierLayout>
	);
}

export default SupplierQuotations;
