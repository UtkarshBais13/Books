import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if(isLoggedIn && user?.userId){
          const resp = await axios.get(`http://localhost:8080/api/cart/${user.userId}`);
          setCount(resp.data.length);
        } else {
          setCount(0);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [isLoggedIn, user?.userId]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await axios.get(`http://localhost:8080/api/search?title=${query}`);
        setSearchResults(response.data);
        setShowResults(true);
      } catch (error) {
        console.error("Error searching books:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleResultClick = (bookId) => {
    navigate(`/book/${bookId}`);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authToken");
    toast.success("Logout successfully!");
    navigate("/login");
  };

  return (
    <nav className="absolute top-0 left-0 w-full h-24 text-white z-20">
      <div className="container mx-auto flex justify-between items-center h-full text-white">
        {/* Logo */}
        <div className="text-4xl font-bold">
          <Link to="/">
            <h1 className='text-4xl text-center font-serif'>Book Voyage</h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-10 text-2xl font-semibold font-sans">
          <Link to="/" className="hover:text-yellow-300">
            HOME
          </Link>
          <Link to="/about" className="hover:text-yellow-300">
            ABOUT
          </Link>
          <Link to="/contact" className="hover:text-yellow-300">
            CONTACT
          </Link>
          <Link to="/categories" className="hover:text-yellow-300">
            CATEGORIES
          </Link>
        </div>

        {/* Search Bar - Moved between Categories and Auth Links */}
        <div className="relative w-25">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery.length > 2 && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-3 top-2.5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          {/* Search Results Dropdown with Images */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto">
              {searchResults.map((book) => (
                <div
                  key={book.id}  // Fixed the key warning by using book.id
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 border-b border-gray-200"
                  onClick={() => handleResultClick(book.id)}
                >
                  <img 
                    src={book.photo || '/placeholder-book.jpg'} 
                    alt={book.title}
                    className="w-10 h-14 object-cover mr-3"
                  />
                  <div>
                    <div className="font-medium">{book.title}</div>
                    <div className="text-sm text-gray-600">by {book.author}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Auth Links */}
        <div className="flex space-x-10 text-2xl font-semibold font-sans">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-yellow-300">
                LOGIN
              </Link>
              <Link to="/signup" className="hover:text-yellow-300">
                SIGNUP
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 text-2xl font-semibold font-sans"
            >
              LOGOUT
            </button>
          )}
        </div>
        
        <div className="flex">
          <div className="ml-7">
            {count > 0 && (
              <span className="bg-orange-500 text-white font-bold text-md px-2 py-0.5 rounded-full shadow">
                {count}
              </span>
            )}
          </div>
          
          <Link to={`/cart/${user?.userId}`} className="mr-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-9 h-12 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.34 2.68m0 0L6.8 15.4a1 1 0 0 0 .98.8h9.44a1 1 0 0 0 .98-.8l1.5-9H5.34zM6 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm12 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
              />
            </svg>
          </Link>
          
          <Link to="/profile">
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