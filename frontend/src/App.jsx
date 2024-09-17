import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Sidebar from "./components/admin/sidebar";
import AdminDashboard from "./pages/admin";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Customer from "./pages/customer";
import ViewArtisan from "./pages/customer/view-artisan";
import CustomerProfile from "./pages/customer/profile";
import CustomerWallet from "./pages/customer/profile/wallet";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/protected-route";
import { useAuth } from "./context/authContext";
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
import SupplierWallet from "./pages/supplier/wallet";

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {user && (
                <>
                    <Route element={<ProtectedRoute allowedRoles={userRoles} />}>
                        {user.role === userTypes.CUSTOMER && (
                            <>
                                <Route path="/" element={<Customer />} />
                                <Route path="/:artisanId" element={<ViewArtisan />} />
                                <Route path="/profile" element={<CustomerProfile />} />
                                <Route path="/wallet" element={<CustomerWallet />} />
                            </>
                        )}
                        {user.role === userTypes.ADMIN && (
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
                        {user.role === userTypes.ARTISAN && (
                            <>
                                <Route path="/" element={<ArtisanDashboard />} />
                                <Route path="/wallet" element={<ArtisanWallet />} />
                                <Route path="/jobs" element={<ArtisanJobs />} />
                                <Route path="/quotations" element={<ArtisanQuotations />} />
                                <Route path="/inventory" element={<ArtisanInventory />} />
                            </>
                        )}
                        {user.role === userTypes.SUPPLIER && (
                            <>
                                <Route path="/" element={<SupplierDashboard />} />
                                <Route path="/wallet" element={<SupplierWallet />} />
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
