import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import menu icons from react-icons
import { NavLink } from "react-router-dom";

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
					<div className="flex gap-4 items-center">
                        <img src="/assets/svgs/customer/company-logo.svg" />
                        <h4>Supplier</h4>
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
					<NavLink to="/quotations">
						<li className="hover:text-gray-400 cursor-pointer">Quotations</li>
					</NavLink>
					<NavLink to="/inventory">
						<li className="hover:text-gray-400 cursor-pointer">Inventory</li>
					</NavLink>
					<NavLink to="/profile">
						<li className="hover:text-gray-400 cursor-pointer">Profile</li>
					</NavLink>
				</ul>
				<div className="lg:hidden">
					<button onClick={toggleMenu} className="focus:outline-none">
						{isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
