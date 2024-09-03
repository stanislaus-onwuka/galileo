// src/App.jsx
// import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Artisan from "./components/Artisan/Artisan";
import Admin from "./components/Admin/Admin";
import ErrorPage from "./ErrorPage";
import Sidebar from "./components/Admin/Sidebar";
import AdminArtisan from "./components/Admin/AdminArtisan";
import Client from "./components/Client/Client";
import AdminAlt from "./components/Admin/AdminAlt";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// import Admin from "./pages/Admin";
// import Regular from "./pages/Regular";
// import Login from "./pages/Login";
// import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/*" element={<Sidebar />}>
          <Route index element={<Admin />} />
          <Route path="artisan" element={<AdminArtisan />} />
          <Route path="client" element={<Client />} />
          <Route path="admin_alt" element={<AdminAlt/>}/>
        </Route>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Artisan />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
