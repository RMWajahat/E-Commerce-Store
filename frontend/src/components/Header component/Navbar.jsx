import logo from "../../assets/applogo.png";
import { FaShoppingCart, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut } from "../../Store/User Reducers/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Navbar = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();
    let User = useSelector(state => state.user.user);
    const [showNav, setShowNav] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        setTimeout(() => {
            if (currentUser) {
                setCurrentUser(localStorage.getItem('user'));
            } else if (User && User.error) {
                toast.error(User.error);
            }
        }, [navigate, currentUser, User])
    });

    const handleLogout = () => {
        if (currentUser) {
            localStorage.removeItem('user');
            User = null;
            dispatch(LogOut()).then(() => {
                setTimeout(() => {
                    if (User == null || User == undefined) {
                        toast.success("User Logged Out Successfully");
                        navigate("/login");
                    }
                }, 1500);
            });

        } else {
            toast.error("User Logged Out Already");
        }
    };

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
            <div className={`flex items-center space-x-5 gap-2 transition-all duration-700 ${showNav ? 'block' : 'hidden'}`}>
                {
                    currentUser && currentUser != undefined && <Link to="/cart" className="text-white cursor-pointer text-md flex gap-1 flex-col items-center"><FaShoppingCart title="Cart" className="text-xl" /></Link>
                }
                {
                    currentUser == null || currentUser == undefined ? <>
                        <Link to="/login" className="text-white cursor-pointer text-md flex gap-1 flex-col items-center"><LuLogIn title="Login" className="text-xl" /></Link>
                        <Link to="/register" className="text-white cursor-pointer text-md flex gap-1 flex-col items-center"><FaUserPlus title="Signup to be a user" className="text-xl" /></Link>
                    </> : <button className="text-slate-900 bg-slate-200 font-semibold hover:bg-red-300 cursor-pointer text-sm flex text-nowrap gap-2 px-3 py-2 rounded-md items-center" title="Logout" onClick={handleLogout}>Logout <LuLogOut /></button>
                }
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
