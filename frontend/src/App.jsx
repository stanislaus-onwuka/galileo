// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Artisan from "./components/Artisan/Artisan";
import Admin from "./components/Admin/Admin";
import ErrorPage from "./ErrorPage";
import Sidebar from "./components/Admin/Sidebar";
import AdminArtisan from "./components/Admin/AdminArtisan";
import Client from "./components/Client/Client";
// import Admin from "./pages/Admin";
// import Regular from "./pages/Regular";
// import Login from "./pages/Login";
// import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<Sidebar />}>
          <Route index element={<Admin />} />
          <Route path="artisan" element={<AdminArtisan />} />
          <Route path="client" element={<Client />} />
        </Route>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Artisan />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
