import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Artisan from "./components/Artisan/Artisan";
import Admin from "./components/Admin/Admin";
import ErrorPage from "./ErrorPage";
import Sidebar from "./components/Admin/Sidebar";
import AdminArtisan from "./components/Admin/AdminArtisan";
import Client from "./components/Client/Client";
import AdminAlt from "./components/Admin/AdminAlt";
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
// import Admin from "./pages/Admin";
// import Regular from "./pages/Regular";
// import Login from "./pages/Login";
// import NotFound from "./pages/NotFound";

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
                                    <Route index element={<Admin />} />
                                    <Route path="artisan" element={<AdminArtisan />} />
                                    <Route path="client" element={<Client />} />
                                    <Route path="admin_alt" element={<AdminAlt />} />
                                </Route>
                            </>
                        )}
                        {user.role === userTypes.ARTISAN && <Route path="/" element={<Artisan />} />}
                    </Route>
                </>
            )}

            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

const App = () => {
    const update = true;

    if (update) {
        return (
            <Router>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </Router>
        );
    }
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin/*" element={<Sidebar />}>
                        <Route index element={<Admin />} />
                        <Route path="artisan" element={<AdminArtisan />} />
                        <Route path="client" element={<Client />} />
                        <Route path="admin_alt" element={<AdminAlt />} />
                    </Route>
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route path="/" element={<Artisan />} />
                    <Route path="/customer" element={<Customer />} />
                    <Route path="/customer/:artisanId" element={<ViewArtisan />} />
                    <Route path="/customer/profile" element={<CustomerProfile />} />
                    <Route path="/customer/wallet" element={<CustomerWallet />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
