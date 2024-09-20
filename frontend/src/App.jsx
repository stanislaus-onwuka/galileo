import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
// import Sidebar from "./components/admin/sidebar";
import AdminDashboard from "./pages/admin";
// import Signup from "./pages/signup";
// import Login from "./pages/login";
import Customer from "./pages/customer";
import ViewArtisan from "./pages/customer/view-artisan";
import CustomerProfile from "./pages/customer/profile";
import CustomerWallet from "./pages/customer/profile/wallet";
import { AuthProvider } from "./context/auth-context";
import ProtectedRoute from "./components/protected-route";
import { useAuth } from "./context/auth-context";
import { userRoles, userTypes } from "../utils/constants";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../utils/queryClient";
import { Toaster } from "react-hot-toast";
import AdminServiceRequests from "./pages/admin/service-requests";
import AdminArtisans from "./pages/admin/artisans";
import AdminCustomers from "./pages/admin/customers";
import AdminSuppliers from "./pages/admin/suppliers";
import ArtisanDashboard from "./pages/artisan";
import ArtisanWallet from "./pages/artisan/wallet";
import ArtisanJobs from "./pages/artisan/jobs";
import ArtisanQuotations from "./pages/artisan/quotations";
import ArtisanInventory from "./pages/artisan/inventory";
import SupplierDashboard from "./pages/supplier";
import SupplierInventory from "./pages/supplier/inventory";
import SupplierQuotations from "./pages/supplier/quotations";
import ArtisanProfile from "./pages/artisan/profile";
import SupplierProfile from "./pages/supplier/profile";
import JoinAdminTeam from "./pages/admin/auth/join";

// Sidebar

import { useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline, IoPeopleOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import { BsTruck } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { PiNotepad } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { Outlet, NavLink } from "react-router-dom";
import { multipleClasses } from "../utils/functions";


const Sidebar = () => {
    const [isMinimized, setIsMinimized] = useState(false);
    const { logout } = useAuth()

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className="flex bg-white">
            {/* Sidebar */}
            <div
                className={`
          ${
              isMinimized ? "w-20" : "w-64"
          } h-screen bg-[#092328] text-white flex flex-col transition-all duration-300 fixed`}
            >
                {/* Logo and User Profile */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    {!isMinimized && (
                        <div className="flex items-center space-x-2">
                            <img src="/assets/svgs/full-logo.svg" alt="Logo" />
                        </div>
                    )}
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-4">
                        <li>
                            <NavLink to="/admin" className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700">
                                <FiHome size={24} />
                                {!isMinimized && <span className="text-lg">Overview</span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/service-requests"
                                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
                            >
                                <PiNotepad size={24} />
                                {!isMinimized && <span className="text-lg">Service Requests</span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/artisans"
                                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
                            >
                                <VscTools size={24} />
                                {!isMinimized && <span className="text-lg">Artisans</span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/customers"
                                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
                            >
                                <IoPeopleOutline size={24} />
                                {!isMinimized && <span className="text-lg">Customers</span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/suppliers"
                                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
                            >
                                <BsTruck size={24} />
                                {!isMinimized && <span className="text-lg">Suppliers</span>}
                            </NavLink>
                        </li>
                        {/* <li>
                            <a href="#" className="items-center space-x-4 p-2 rounded hidden hover:bg-gray-700">
                                <BsPeople size={24} />
                                {!isMinimized && <span className="text-lg">Team Management</span>}
                            </a>
                        </li> */}
                        <li>
                            <button onClick={logout} className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700">
                                <TbLogout2 size={24} />
                                {!isMinimized && <span className="text-lg">Logout</span>}
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Footer Menu */}
                <div className="p-4 border-t border-gray-700 flex flex-col space-y-4">
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center space-x-4 p-2 text-lg rounded hover:bg-gray-700"
                    >
                        {isMinimized ? <IoChevronForwardOutline size={24} /> : <IoChevronBackOutline size={24} />}
                        {!isMinimized && <span>Collapse</span>}
                    </button>
                    {/* <a href="#" className="flex items-center space-x-4 p-2 text-lg rounded hover:bg-gray-700">
                        <IoSettingsOutline size={24} />
                        {!isMinimized && <span>Settings</span>}
                    </a> */}
                </div>
            </div>
            <div className={multipleClasses("w-full", isMinimized ? "ml-20" : "ml-64")}>
                <Outlet />
            </div>
        </div>
    );
};




const AppRoutes = () => {
	const { user } = useAuth();

	const currentUserRole = localStorage.getItem("role");

	return (
		<Routes>
			{/* <Route path="/signup" element={<Signup />} /> */}
			{/* <Route path="/login" element={<Login />} /> */}
			<Route path="/administrator/join" element={<JoinAdminTeam />} />
			{user && (
				<>
					<Route element={<ProtectedRoute allowedRoles={userRoles} />}>
						{currentUserRole === userTypes.CUSTOMER && (
							<>
								<Route path="/" element={<Customer />} />
								<Route path="/artisan" element={<Navigate to="/" />} />
								<Route path="/artisan/:artisanId" element={<ViewArtisan />} />
								<Route path="/profile" element={<CustomerProfile />} />
								<Route path="/wallet" element={<CustomerWallet />} />
							</>
						)}
						{currentUserRole === userTypes.ADMIN && (
							<>
								<Route path="/" element={<Navigate to="/admin" />} />
								<Route path="/admin" element={<Sidebar />}>
									<Route index element={<AdminDashboard />} />
									<Route path="service-requests" element={<AdminServiceRequests />} />
									<Route path="artisans" element={<AdminArtisans />} />
									<Route path="customers" element={<AdminCustomers />} />
									<Route path="suppliers" element={<AdminSuppliers />} />
								</Route>
							</>
						)}
						{currentUserRole === userTypes.ARTISAN && (
							<>
								<Route path="/" element={<ArtisanDashboard />} />
								<Route path="/profile" element={<ArtisanProfile />} />
								<Route path="/wallet" element={<ArtisanWallet />} />
								<Route path="/jobs" element={<ArtisanJobs />} />
								<Route path="/quotations" element={<ArtisanQuotations />} />
								<Route path="/inventory" element={<ArtisanInventory />} />
							</>
						)}
						{currentUserRole === userTypes.SUPPLIER && (
							<>
								<Route path="/" element={<SupplierDashboard />} />
								<Route path="/profile" element={<SupplierProfile />} />
								<Route path="/quotations" element={<SupplierQuotations />} />
								<Route path="/inventory" element={<SupplierInventory />} />
							</>
						)}
					</Route>
				</>
			)}

			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
};

const App = () => {
	return (
		<Router>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<Toaster />
					<AppRoutes />
				</AuthProvider>
			</QueryClientProvider>
		</Router>
	);
};

export default App;
