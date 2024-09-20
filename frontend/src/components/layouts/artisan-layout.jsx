/* eslint-disable react/prop-types */
import Navbar from "../artisan/navbar";
import DashboardHeader from "../artisan/dashboard-header";
import { useLocation } from "react-router-dom";
import UpdateProfileBanner from "../update-profile-banner";
import { useAuth } from "../../context/auth-context";

function ArtisanLayout({ children }) {
    const { pathname } = useLocation()
    const { user } = useAuth()

	return (
        <div className="bg-white pb-10">
            {!user.user?.address ? <UpdateProfileBanner/> : null}
			<div className="bg-background">
                <Navbar />
                { pathname === "/" ? <DashboardHeader /> : null  }
            </div>
            <>
                {children}
            </>
		</div>
	);
}

export default ArtisanLayout;
