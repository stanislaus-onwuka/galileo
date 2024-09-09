// src/App.jsx
// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
// import Admin from "./pages/Admin";
// import Regular from "./pages/Regular";
// import Login from "./pages/Login";
// import NotFound from "./pages/NotFound";

const App = () => {
    const update = true;
    if (update) {
        return (
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<Login />} />
                        <Route element={<ProtectedRoute role="admin" />}>
                            <Route path="/admin/*" element={<Sidebar />}>
                              <Route index element={<Admin />} />
                              <Route path="artisan" element={<AdminArtisan />} />
                              <Route path="client" element={<Client />} />
                              <Route path="admin_alt" element={<AdminAlt />} />
                            </Route>
                        </Route>
                        <Route element={<ProtectedRoute role="customer" />}>
                            <Route path="/customer" element={<Customer />} />
                            <Route path="/customer/:artisanId" element={<ViewArtisan />} />
                            <Route path="/customer/profile" element={<CustomerProfile />} />
                            <Route path="/customer/wallet" element={<CustomerWallet />} />
                        </Route>
                        <Route element={<ProtectedRoute role="artisan" />}>
                            <Route path="/artisan" element={<Artisan />} />
                        </Route>
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
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
