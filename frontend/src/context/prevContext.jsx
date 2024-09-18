/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import userApi from "../api/user";

export const AuthContext = createContext();

const getDataFromStorage = () => {
	const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  return {
    token,
    user,
    role
  }
  
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("user");
		return savedUser ? JSON.parse(savedUser) : null;
	});

	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();

	const isAuthPage = location.pathname.includes("/signup") || location.pathname.includes("/login");

	const {
		data: userProfile,
		isSuccess,
		isError,
		refetch,
	} = useQuery({
		queryKey: ["user-profile"],
		queryFn: () => userApi.fetchUserProfile(),
		enabled: false,
	});

	const login = (userData) => {
		localStorage.setItem("access_token", JSON.stringify(userData.access_token));
		localStorage.setItem("role", userData.role);

		refetch();
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("access_token");
		localStorage.removeItem("user");
		localStorage.removeItem("role");
		queryClient.clear();
		navigate("/login");
	};

	useEffect(() => {
		if (userProfile && isSuccess) {
			const newUser = { role: userProfile.role, ...userProfile };
			setUser(newUser);
			localStorage.setItem("user", JSON.stringify(newUser));

			if (isAuthPage) {
				navigate("/");
			}
		} else if (isError) {
			logout();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile, isSuccess, isError, navigate]);

	useEffect(() => {
		const accessToken = JSON.parse(localStorage.getItem("access_token"));

		if (accessToken) {
			refetch();
		}
	}, [refetch]);

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
