/* eslint-disable react/prop-types */
import Navbar from "../artisan/navbar";
import DashboardHeader from "../artisan/dashboard-header";
import { useLocation } from "react-router-dom";

function ArtisanLayout({ children }) {
    const { pathname } = useLocation()

	return (
		<div className="bg-white">
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
