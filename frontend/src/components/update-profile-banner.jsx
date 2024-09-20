import { useLocation, useNavigate } from "react-router-dom";

function UpdateProfileBanner() {
	const navigate = useNavigate();
    const location = useLocation();
    

    if (location.pathname !== "/profile") {
        return (
			<div className="fixed top-[10%] w-full flex justify-center items-center">
				<div className="flex justify-between p-1 py-4 w-full max-w-[60%] items-center rounded-lg bg-yellow-400">
					<h3>Update your profile to enjoy this platform better</h3>
					<button className="underline" onClick={() => navigate("/profile")}>Go to profile page</button>
				</div>
			</div>
		);
    }
}

export default UpdateProfileBanner;
