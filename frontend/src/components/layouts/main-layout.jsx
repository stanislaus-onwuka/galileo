/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import UpdateProfileBanner from "../update-profile-banner";

function MainLayout({ children }) {
	const { user, logout } = useAuth();
	const location = useLocation();
	const onProfilePage = location.pathname === "/profile";

	return (
		<div>
            {!user.user?.address ? <UpdateProfileBanner/> : null}
			<nav className="flex justify-between items-center py-[22px] px-4">
				<Link to="/">
					<img src="/assets/svgs/customer/company-logo.svg" alt="Logo" />
				</Link>
				<div>
					{onProfilePage ? (
						<button
							onClick={logout}
							className="border border-red-500 text-red-500 flex gap-[11px] items-center rounded-full py-[10px] px-8 mt-3 self-end duration-100 hover:bg-red-500 hover:text-white"
						>
							Logout
						</button>
					) : (
						<Link to="/profile" className="rounded-full border-neutral-40 p-1">
							Profile
						</Link>
					)}
				</div>
			</nav>
			{children}
			<footer className="flex justify-between px-4 py-7 mt-14">
				<div></div>
				<ul className="flex gap-6 items-center">
					<li>FAQ</li>
					<li>Terms & Conditions</li>
					<li>Privacy</li>
				</ul>
			</footer>
		</div>
	);
}

export default MainLayout;
