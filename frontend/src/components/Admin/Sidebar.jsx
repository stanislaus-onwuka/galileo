import { useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline, IoPeopleOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import { BsTruck } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { PiNotepad } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { Outlet, NavLink } from "react-router-dom";
import { multipleClasses } from "../../../utils/functions";
import { useAuth } from "../../context/auth-context";

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

export default Sidebar;
