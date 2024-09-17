/* eslint-disable react/prop-types */
import Navbar from "../supplier/navbar";

function SupplierLayout({ children }) {
	return (
		<div className="bg-white">
			<div className=" bg-neutral-90">
				<Navbar />
			</div>
			<>{children}</>
		</div>
	);
}

export default SupplierLayout;
