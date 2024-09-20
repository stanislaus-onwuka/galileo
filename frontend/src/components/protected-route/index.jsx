/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const ProtectedRoute = ({ allowedRoles }) => {
	const { user } = useAuth();
	const currentUserRole = localStorage.getItem("role");

	if (!user) {
		return <Navigate to="/login" />;
	}

	// if (!allowedRoles.includes(user.role)) {
	//     return <Navigate to="/error" />;
	// }

	if (!allowedRoles.includes(currentUserRole)) {
		return <Navigate to="/error" />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
