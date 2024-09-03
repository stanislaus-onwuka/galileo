import { useState } from "react";
import {
  IoHomeOutline,
  IoSettingsOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import { FaUsersCog } from "react-icons/fa";
import {  BsPeople, BsTruck } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Outlet, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isMinimized ? "w-20" : "w-64"
        } h-screen bg-[#092328] text-white flex flex-col transition-all duration-300`}
      >
        {/* Logo and User Profile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isMinimized && (
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-2">
                <span className="text-2xl font-bold">🌙</span>
              </div>
              <h1 className="text-2xl font-bold">Galileo</h1>
            </div>
          )}
          <div className="flex items-center justify-center">
            <img
              src="https://wallpapers.com/images/featured/grant-gustin-pictures-8u6z35ug6jeqwxco.jpg" // Replace with your avatar image link
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/admin"
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
              >
                <IoHomeOutline size={24} />
                {!isMinimized && <span className="text-lg">Admin</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="artisan"
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
              >
                <FaUsersCog size={24} />
                {!isMinimized && <span className="text-lg">Artisans</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="client"
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
              >
                <BsTruck size={24} />
                {!isMinimized && <span className="text-lg">Client</span>}
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
              >
                <BsPeople size={24} />
                {!isMinimized && (
                  <span className="text-lg">Team Management</span>
                )}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-4 p-2 rounded hover:bg-gray-700"
              >
                <FiLogOut size={24} />
                {!isMinimized && <span className="text-lg">Logout</span>}
              </a>
            </li>
          </ul>
        </nav>

        {/* Footer Menu */}
        <div className="p-4 border-t border-gray-700 flex flex-col space-y-4">
          <button
            onClick={toggleSidebar}
            className="flex items-center space-x-4 p-2 text-lg rounded hover:bg-gray-700"
          >
            {isMinimized ? (
              <IoChevronForwardOutline size={24} />
            ) : (
              <IoChevronBackOutline size={24} />
            )}
            {!isMinimized && <span>Collapse</span>}
          </button>
          <a
            href="#"
            className="flex items-center space-x-4 p-2 text-lg rounded hover:bg-gray-700"
          >
            <IoSettingsOutline size={24} />
            {!isMinimized && <span>Settings</span>}
          </a>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Sidebar;
