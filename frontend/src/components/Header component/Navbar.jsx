import logo from "../../assets/applogo.png";
import { FaShoppingCart, FaShoppingBasket, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <nav className="flex items-center justify-between bg-gray-800 p-4">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-16 h-16" />
            </div>
            <div className={`flex items-center space-x-4 ${showNav ? 'hidden' : 'block'}`}>
                <Link to="/" className="text-white hover:text-blue-100 hover:border-b-2 hover:border-white">Home</Link>
                <Link to="/about" className="text-white hover:text-blue-100 hover:border-b-2 hover:border-white">About</Link>
                <Link to="/products" className="text-white hover:text-blue-100 hover:border-b-2 hover:border-white">Products</Link>
                <Link to="/contact" className="text-white hover:text-blue-100 hover:border-b-2 hover:border-white">Contact</Link>
            </div>
            <div className={`flex items-center space-x-5 ${showNav ? 'block' : 'hidden'}`}>
                <Link to="/cart" className="text-white cursor-pointer text-xl"><FaShoppingCart /></Link>
                <Link to="/shop" className="text-white cursor-pointer text-xl"><FaShoppingBasket /></Link>
                <Link to="/user" className="text-white cursor-pointer text-xl"><FaUser /></Link>
            </div>
            <div className="flex items-center">
                <button onClick={toggleNav} className="text-white cursor-pointer text-xl">
                    {showNav ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
