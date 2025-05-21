import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { toast } from 'react-toastify';
import Navbar from '../../navbar/Navbar';
import { FaBookOpen, FaLock, FaEnvelope } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`http://localhost:8080/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(login(data));
      navigate("/");
      toast.success("Welcome back! Happy reading!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      
      <div className="relative flex items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Background book pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
        
        {/* Login card */}
        <div className="relative z-10 w-full max-w-md px-8 py-10 mx-4 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 mb-4 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg">
              <FaBookOpen className="text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              Book Voyage
            </h1>
            <p className="mt-2 text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200"
                  placeholder="Your email"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200"
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-orange-600 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                />
                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-400">
                  Remember me
                </label>
              </div>

              <a href="#" className="text-sm font-medium text-orange-500 hover:text-orange-400 transition">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              New to Book Haven?{' '}
              <a 
                href="/register" 
                className="font-medium text-orange-500 hover:text-orange-400 transition underline underline-offset-4"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/signup');
                }}
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;