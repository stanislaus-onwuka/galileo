/* eslint-disable react/prop-types */
import { useAuth } from "../../context/auth-context";
import Navbar from "../supplier/navbar";
import UpdateProfileBanner from "../update-profile-banner";

function SupplierLayout({ children }) {
	const { user } = useAuth();

	return (
		<div className="bg-white">
			{!user.user?.address ? <UpdateProfileBanner /> : null}

			<div className=" bg-neutral-90">
				<Navbar />
			</div>
			<>{children}</>
		</div>
	);
}

export default SupplierLayout;
