import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // if you're using React Router
import { logout } from '../store/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken"); // Clear token
    toast.success("Logout successfully!");
    navigate("/login"); // Redirect to login page
    console.log("Logged out successfully");
  };

  return (
    <nav className=" absolute top-0 left-0 w-full h-24   text-white z-20  ">
      <div className="container mx-auto flex justify-between items-center h-full text-white">
        {/* Logo */}
        <div className="text-4xl font-bold">
          <Link to="/">
            {/* <img src="/path/to/logo.png" alt="Logo" className="h-8 inline-block mr-2" /> Logo Image */}
            <h1 className='text-4xl text-center font-serif '>Book Voyage</h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-10 text-3xl">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-yellow-300">
            Contact
          </Link>
          <Link to="/categories" className="hover:text-yellow-300">
            Categories
          </Link>
         
        </div>

        {/* Auth Links */}
        <div className="flex space-x-10 text-3xl">
      {!isLoggedIn ? (
        <>
          <Link to="/login" className="hover:text-yellow-300">
            Login
          </Link>
          <Link to="/signup" className="hover:text-yellow-300">
            Signup
          </Link>
        </>
      ) : (
        <button
        onClick={handleLogout}
          className="hover:text-yellow-300"
        >
          Logout
        </button>
      )}
    </div>
        <div className="flex gap-6">
        <Link>
        <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-9 h-12 text-white "
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.34 2.68m0 0L6.8 15.4a1 1 0 0 0 .98.8h9.44a1 1 0 0 0 .98-.8l1.5-9H5.34zM6 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm12 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
    />
  </svg>
        </Link>
        <Link>
        <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-9 h-12 text-white mr-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m12-9a4 4 0 1 0-8 0 4 4 0 0 0 8 0z"
    />
  </svg>
        </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
