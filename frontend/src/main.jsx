import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { createBrowserRouter } from "react-router-dom";
// import ErrorPage from "./ErrorPage.jsx";
// import Admin from "./components/Admin/Admin.jsx";
// import Client from "./components/Client/Client.jsx";
// import AdminArtisan from "./components/Admin/AdminArtisan.jsx";
// import Sidebar from "./components/Admin/Sidebar.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Sidebar />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/admin",
//         element: <Admin />,
//       },
//       {
//         path: "/artisan",
//         element: <AdminArtisan />,
//       },
//       {
//         path: "/client",
//         element: <Client />,
//       },
//     ],
//   },
// ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
