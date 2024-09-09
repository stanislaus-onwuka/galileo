/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const ProtectedRoute = ({ role }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (role && user.role !== role) {
        // Redirect to appropriate dashboard if role doesn't match
        if (user.role === "admin") {
            return <Navigate to="/admin" />;
        }
        if (user.role === "customer") {
            return <Navigate to="/" />;
        }
        if (user.role === "artisan") {
            return <Navigate to="/artisan" />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
