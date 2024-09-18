import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink, } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="text-white p-4 mb-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className={`${isOpen ? "hidden" : "flex items-center space-x-4"}`}>
          <div>
            <img src="/assets/svgs/full-logo.svg" />
          </div>
        </div>

        {/* Menu Items - Hidden on Mobile */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex space-x-6 md:space-x-6 mt-4 md:mt-0 md:items-center`}
        >
          <NavLink to="/">
            <li className="hover:text-gray-400 cursor-pointer">Dashboard</li>
          </NavLink>
          <NavLink to="/jobs">
            <li className="hover:text-gray-400 cursor-pointer">Jobs</li>
          </NavLink>
          <NavLink to="/quotations">
            <li className="hover:text-gray-400 cursor-pointer">Quotations</li>
          </NavLink>
          <NavLink to="/inventory">
            <li className="hover:text-gray-400 cursor-pointer">Inventory</li>
          </NavLink>
          <NavLink to="/wallet">
            <li className="hover:text-gray-400 cursor-pointer">Wallet</li>
          </NavLink>
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
            <NavLink to="/profile" className="flex items-center space-x-3">
              <CgProfile size={36}/>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
