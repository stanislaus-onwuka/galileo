/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import userApi from "../api/user";
import Loader from "../components/misc/loader";

export const AuthContext = createContext();

const getDataFromStorage = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const token = localStorage.getItem("access_token");
	const role = localStorage.getItem("role");

	return {
		token,
		user,
		role,
	};
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getDataFromStorage());
  const [loggingOut, setLoggingOut] = useState(false)

	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();

	const isAuthPage = location.pathname.includes("/signup") || location.pathname.includes("/login");

	const fetchUserProfile = useQuery({
		queryKey: ["user-profile"],
		queryFn: () => userApi.fetchUserProfile(),
		enabled: !!user?.token,
	});

	// Login
	const login = (userData) => {
		setUser((prev) => {
			const newData = {
				...prev,
				...userData,
			};

			localStorage.setItem("access_token", newData.access_token);
			localStorage.setItem("role", newData.role);

			return newData;
		});

		fetchUserProfile.refetch();
	};

	// Logout
  const logout = () => {
    setLoggingOut(true)

    setTimeout(() => {

      setUser(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      queryClient.clear();
      setLoggingOut(false)

      navigate("/login");
    }, 600);
		
	};




	// Redirect signin
	useEffect(() => {
		if (fetchUserProfile.data && fetchUserProfile.isSuccess) {
			const newUser = fetchUserProfile.data;
			localStorage.setItem("user", JSON.stringify(newUser));
			setUser({ user: newUser });

			if (isAuthPage) {
				navigate("/");
			}
		} else if (fetchUserProfile.isError) {
			logout();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchUserProfile.data, fetchUserProfile.isSuccess, fetchUserProfile.isError, navigate]);




	// Refetch with token
	useEffect(() => {
		if (user?.token) {
			fetchUserProfile.refetch();
		}
	}, [fetchUserProfile, user?.token]);




	const render = () => {
		if (fetchUserProfile.isLoading || loggingOut) {
			return (
				<div className="w-full h-screen flex items-center justify-center">
					<Loader containerClass="w-14 h-14" />
				</div>
			);
		}

		if (fetchUserProfile.isError) {
			return (
				<div className="text-center">
					<h3>An error occured</h3>
					<div>
						<button onClick={() => window.location.reload()}>Reload page</button>
						<button onClick={() => navigate("/login")}>Go to login</button>
					</div>
				</div>
			);
		}

		return children;
	};

	return <AuthContext.Provider value={{ user, login, logout }}>{render()}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
