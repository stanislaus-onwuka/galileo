import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import menu icons from react-icons
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className={`${isOpen ? "hidden" : "flex items-center space-x-4"}`}>
          <h2 className="text-2xl font-bold">Galileo</h2>
        </div>

        {/* Menu Items - Hidden on Mobile */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex space-x-6 md:space-x-6 mt-4 md:mt-0 md:items-center`}
        >
          <li className="hover:text-gray-400 cursor-pointer">Dashboard</li>

          <NavLink to="/admin/*">
            <li className="hover:text-gray-400 cursor-pointer">Admin</li>
          </NavLink>

          <li className="hover:text-gray-400 cursor-pointer">Quotations</li>
          <li className="hover:text-gray-400 cursor-pointer">Inventory</li>
          <li className="hover:text-gray-400 cursor-pointer">Wallet</li>
        </ul>

        {/* Hamburger Icon for Mobile */}
        <div>
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Action Buttons and Profile - Hidden on Mobile */}
          <div
            className={`${
              isOpen ? "hidden" : "hidden"
            } lg:flex items-center justify-center space-x-6 mt-4 lg:mt-0`}
          >
            <button className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500">
              New Quote
            </button>
            <button className="bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600">
              View Quotes
            </button>
            <div className="flex items-center space-x-3">
              <i className="fas fa-search cursor-pointer hover:text-gray-400"></i>
              <i className="fas fa-bell cursor-pointer hover:text-gray-400"></i>
              <img
                src="https://via.placeholder.com/30"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
